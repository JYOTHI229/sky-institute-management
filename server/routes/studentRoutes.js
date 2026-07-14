import express from "express";

import {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  updateStudentRole,
  deleteStudent,
} from "../controllers/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getStudents
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getStudent
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addStudent
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateStudent
);

router.put(
  "/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateStudentRole
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteStudent
);

export default router;