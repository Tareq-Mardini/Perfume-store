import axiosInstanceAdmin from "../api/axiosInstanceAdmin";

export const getProducts = async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/products/");
  return res.data;
};

export const getDetailProduct = async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/products/");
  return res.data;
};