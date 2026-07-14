import Admission from "../models/Admission.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// Get All Admissions (admin)
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate("courseId", "name duration")
      .sort({ createdAt: -1 });

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply for Admission (public)
export const createAdmission = async (req, res) => {
  try {
    const { name, email, phone, courseId } = req.body;

    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({
        message: "Name, email, phone and course are required.",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "Selected course was not found." });
    }

    // If this applicant already has a student account (same email), link
    // the two records so that approving this admission can automatically
    // enroll them in the course on their dashboard.
    const matchingStudent = await User.findOne({
      email: email.toLowerCase(),
      role: "student",
    });

    const admission = await Admission.create({
      name,
      email,
      phone,
      courseId,
      studentId: matchingStudent ? matchingStudent._id : null,
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Admission Status (admin)
export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("courseId", "name duration");

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    // If this application was just approved and it's linked to a student
    // account, enroll that student in the course (idempotent — $addToSet
    // won't add the course twice if they're approved more than once).
    if (admission.status === "Approved" && admission.studentId) {
      await User.findByIdAndUpdate(admission.studentId, {
        $addToSet: { enrolledCourses: admission.courseId._id || admission.courseId },
      });
    }

    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Admission (admin)
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json({
      message: "Admission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
