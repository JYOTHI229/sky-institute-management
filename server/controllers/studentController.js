import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Student
export const getStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Student
export const addStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    const { password: _pw, ...studentWithoutPassword } = student.toObject();

    res.status(201).json(studentWithoutPassword);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    // Only allow specific fields to be updated here — never trust the
    // request body wholesale (that would let a client silently change
    // its own role, or set an unhashed password).
    const { name, email, password } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const student = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change a user's role (student <-> admin). Admin-only — guarded by
// roleMiddleware in the route. This is how an existing admin brings on
// a new admin (e.g. a co-founder or staff member), since public
// registration can never create one.
export const updateStudentRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "student"].includes(role)) {
      return res.status(400).json({ message: "Role must be 'admin' or 'student'." });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You can't change your own role." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};