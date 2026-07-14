// Creates (or promotes) an admin account. Run this once from the backend folder:
//
//   node seed/createAdmin.js "Admin Name" admin@example.com "SomeStrongPassword"
//
// This is the ONLY way to get an admin account onto the platform — the public
// /register endpoint deliberately always creates "student" accounts, so that
// nobody can grant themselves admin access through the website itself.
//
// If a user with that email already exists, this script just promotes them
// to admin instead of creating a duplicate.

import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

async function run() {
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error("Usage: node seed/createAdmin.js \"Admin Name\" admin@example.com \"StrongPassword\"");
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI. Copy backend/.env.example to backend/.env and fill it in first.");
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: email.toLowerCase() });

  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`Existing user "${existing.email}" promoted to admin.`);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });
    console.log(`Admin account created: ${admin.email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Failed to create admin:", err.message);
  process.exit(1);
});
