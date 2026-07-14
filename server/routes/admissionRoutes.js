import express from "express";

import {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student applies for admission
router.post("/", createAdmission);

// Admin views all admissions
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAdmissions
);

// Admin updates admission status
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateAdmission
);

// Admin deletes admission
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteAdmission
);

export default router;