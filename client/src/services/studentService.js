import API from "../utils/api";

export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/profile", data);
  return res.data;
};

// Logged-in student's real enrolled courses (from approved admissions)
export const getMyCourses = async () => {
  const res = await API.get("/profile/courses");
  return res.data;
};

// Logged-in student's own admission applications + their status
export const getMyAdmissions = async () => {
  const res = await API.get("/profile/admissions");
  return res.data;
};

export const getStudents = async () => {
  const res = await API.get("/students");
  return res.data;
};

export const getStudent = async (id) => {
  const res = await API.get(`/students/${id}`);
  return res.data;
};

export const addStudent = async (data) => {
  const res = await API.post("/students", data);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await API.put(`/students/${id}`, data);
  return res.data;
};

// Admin-only: promote a student to admin, or demote an admin back to student
export const updateStudentRole = async (id, role) => {
  const res = await API.put(`/students/${id}/role`, { role });
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(`/students/${id}`);
  return res.data;
};
