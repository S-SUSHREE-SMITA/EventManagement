// Run: node seed.js
// Creates initial admin user

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/db.js";

const admins = [
  {
    name: "Alisha Panda",
    email: "alishap686@gmail.in",
    password: "Alisha@123",
    role: "admin",
    phone: "+91 98765 56201",
    address: "Bhubaneswar, Odisha",
  },
  {
    name: "S Sushree Smita",
    email: "smita246@gmail.in",
    password: "Smita@123",
    role: "admin",
    phone: "+91 98765 62100",
    address: "Bhubaneswar, Odisha",
  },
  {
    name: "Satya Ranjan Pati",
    email: "satya369@gmail.in",
    password: "satya@123",
    role: "admin",
    phone: "+91 98765 67231",
    address: "Bhubaneswar, Odisha",
  },
];

const seedAdmins = async () => {
  await connectDB();

  for (const adminData of admins) {
    const existing = await User.findOne({ email: adminData.email });

    if (existing) {
      console.log(`Admin already exists: ${adminData.email}`);
      continue;
    }

    const hashed = await bcrypt.hash(adminData.password, 10);
    await User.create({ ...adminData, password: hashed });

    console.log(`Admin created: ${adminData.email} / ${adminData.password}`);
  }

  console.log("\nChange all passwords after first login!");
  process.exit(0);
};

seedAdmins().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});