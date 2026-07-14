import User from "../models/User.js";
import Course from "../models/Course.js";
import Admission from "../models/Admission.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalCourses = await Course.countDocuments();

    const totalAdmissions = await Admission.countDocuments();

    const pendingAdmissions = await Admission.countDocuments({
      status: "Pending",
    });

    const approvedAdmissions = await Admission.countDocuments({
      status: "Approved",
    });

    const rejectedAdmissions = await Admission.countDocuments({
      status: "Rejected",
    });

    const recentAdmissions = await Admission.find()
      .populate("courseId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalStudents,
      totalAdmins,
      totalCourses,
      totalAdmissions,
      pendingAdmissions,
      approvedAdmissions,
      rejectedAdmissions,
      recentAdmissions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};