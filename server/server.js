import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in environment variables. Check your .env file.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment variables. Check your .env file.");
  process.exit(1);
}

const app = express();

// In production, restrict this to your actual frontend origin via
// CORS_ORIGIN instead of allowing every origin.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

connectDB();

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

// 404 handler — any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler — catches anything passed to next(err),
// and thrown errors from async route handlers (Express 5 forwards
// rejected promises here automatically).
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
