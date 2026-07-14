import express from "express";

import {
  getProfile,
  updateProfile,
  getMyCourses,
  getMyAdmissions,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getProfile
);

router.put(
  "/",
  authMiddleware,
  updateProfile
);

// Logged-in student's real enrolled courses (from approved admissions)
router.get(
  "/courses",
  authMiddleware,
  getMyCourses
);

// Logged-in student's own admission applications + their status
router.get(
  "/admissions",
  authMiddleware,
  getMyAdmissions
);

export default router;