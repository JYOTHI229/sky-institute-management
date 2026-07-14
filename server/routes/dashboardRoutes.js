import express from "express";

import { getDashboardStats } from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);

export default router;