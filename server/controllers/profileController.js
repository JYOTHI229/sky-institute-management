import User from "../models/User.js";
import Admission from "../models/Admission.js";

// Get Logged In User Profile
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Logged In User Profile
export const updateProfile = async (req, res) => {
  try {

    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get courses the logged-in student is actually enrolled in
// (i.e. an admin approved their admission application for it).
export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the logged-in student's own admission applications, so they can
// see whether each one is still Pending, Approved or Rejected.
export const getMyAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({ studentId: req.user.id })
      .populate("courseId", "name duration")
      .sort({ createdAt: -1 });

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};