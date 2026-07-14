import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admission from "../models/Admission.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // NOTE: role is intentionally NOT taken from req.body. Public
    // self-registration should only ever create student accounts;
    // admin accounts must be created separately (e.g. by an existing
    // admin or a seed script), otherwise anyone could POST role:"admin"
    // to this endpoint and grant themselves admin access.
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    const { password: _pw, ...userWithoutPassword } = user.toObject();

    // If this person already submitted an admission application (as a
    // guest, before creating an account), link it now and pull in any
    // course they were already approved for.
    const priorAdmissions = await Admission.find({
      email: user.email,
      studentId: null,
    });

    if (priorAdmissions.length > 0) {
      const approvedCourseIds = priorAdmissions
        .filter((a) => a.status === "Approved")
        .map((a) => a.courseId);

      await Admission.updateMany(
        { _id: { $in: priorAdmissions.map((a) => a._id) } },
        { studentId: user._id }
      );

      if (approvedCourseIds.length > 0) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { enrolledCourses: { $each: approvedCourseIds } },
        });
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      id: user._id,
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};