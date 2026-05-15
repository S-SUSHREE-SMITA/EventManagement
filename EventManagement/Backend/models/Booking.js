import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    serviceType: { type: String, required: true },
    venueName: { type: String, required: true },
    venueLocation: { type: String, required: true },
    venueCapacity: { type: Number, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    guestCount: { type: Number, required: true },
    specialRequests: { type: String, default: "" },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentId: { type: String, default: "" },
    razorpayOrderId: { type: String, default: "" },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled", "completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
