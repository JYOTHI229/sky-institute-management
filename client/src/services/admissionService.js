import API from "../utils/api";

export const getAdmissions = async () => {
  const res = await API.get("/admissions");
  return res.data;
};

export const createAdmission = async (data) => {
  const res = await API.post("/admissions", data);
  return res.data;
};

export const updateAdmission = async (id, data) => {
  const res = await API.put(`/admissions/${id}`, data);
  return res.data;
};

export const deleteAdmission = async (id) => {
  const res = await API.delete(`/admissions/${id}`);
  return res.data;
};
