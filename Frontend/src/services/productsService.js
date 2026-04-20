import axiosInstanceAdmin from "../api/axiosInstanceAdmin";

export const getProducts = async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/products/");
  return res.data;
};

export const getDetailProduct = async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/products/");
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstanceAdmin.delete(`/api/admin/products/${id}/`);
  return res.data;
};