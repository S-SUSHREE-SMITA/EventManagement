import express from "express";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lazy-initialize Razorpay only when real keys are present
const getRazorpay = async () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (
    !keyId || keyId.startsWith("your_") ||
    !keySecret || keySecret.startsWith("your_")
  ) {
    return null; // demo mode
  }
  const Razorpay = (await import("razorpay")).default;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

// ─── Create Razorpay Order ────────────────────────────────────────────────────
router.post("/create-order", protect, async (req, res) => {
  try {
    const razorpay = await getRazorpay();

    if (!razorpay) {
      // Demo mode: return a fake order so UI still works
      return res.json({
        orderId: "demo_order_" + Date.now(),
        amount: req.body.amount * 100,
        currency: "INR",
        demo: true,
      });
    }

    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ message: "Payment order failed", error: err.message });
  }
});

// ─── Verify Payment & Save Booking ───────────────────────────────────────────
router.post("/verify-payment", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
      demo,
    } = req.body;

    if (!demo) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expected = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
      if (expected !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
      }
    }

    const booking = await Booking.create({
      ...bookingData,
      userId: req.user._id,
      // paymentStatus: demo ? "pending" : "paid",
      paymentStatus: "paid",
      paymentId: razorpay_payment_id || "DEMO_" + Date.now(),
      razorpayOrderId: razorpay_order_id || "",
      bookingStatus: "confirmed",
    });

    res.status(201).json({ message: "Booking Confirmed", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

// ─── My Bookings ─────────────────────────────────────────────────────────────
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// ─── Admin: All Bookings ──────────────────────────────────────────────────────
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// ─── Admin: Stats ─────────────────────────────────────────────────────────────
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const [
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenueAgg,
      serviceStats,
      monthlyRevenue,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ bookingStatus: "confirmed" }),
      Booking.countDocuments({ bookingStatus: "pending" }),
      Booking.countDocuments({ bookingStatus: "cancelled" }),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Booking.aggregate([
        { $group: { _id: "$serviceType", count: { $sum: 1 }, revenue: { $sum: "$totalAmount" } } },
        { $sort: { count: -1 } },
      ]),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            revenue: { $sum: "$totalAmount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 6 },
      ]),
    ]);

    res.json({
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      serviceStats,
      monthlyRevenue,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
});

// ─── Admin: Update Status ─────────────────────────────────────────────────────
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: req.body.bookingStatus },
      { new: true }
    );
    res.json(booking);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
