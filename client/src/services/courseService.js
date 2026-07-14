import API from "../utils/api";

export const getCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};

export const getCourse = async (id) => {
  const res = await API.get(`/courses/${id}`);
  return res.data;
};

export const addCourse = async (data) => {
  const res = await API.post("/courses", data);
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await API.put(`/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await API.delete(`/courses/${id}`);
  return res.data;
};
