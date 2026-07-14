import express from "express";

import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public — course catalog is shown on the public website and in the
// admission application form, so these must NOT require a login token.
router.get("/", getCourses);
router.get("/:id", getCourse);

// Admin only — managing the course catalog
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addCourse
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourse
);

export default router;
