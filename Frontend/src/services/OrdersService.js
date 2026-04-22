import axiosInstanceAdmin from "../api/axiosInstanceAdmin";

export const getOrders = async (page = 1) => {
  const res = await axiosInstanceAdmin.get(
    `/api/orders/list/?page=${page}`
  );
  return res.data;
};