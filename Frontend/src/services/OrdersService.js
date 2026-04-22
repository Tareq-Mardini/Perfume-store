import axiosInstanceAdmin from "../api/axiosInstanceAdmin";

export const getOrders = async (page , status = "") => {
  let url = `/api/orders/list/?page=${page}`;

  if (status) {
    url += `&status=${status}`;
  }

  const res = await axiosInstanceAdmin.get(url);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axiosInstanceAdmin.patch(
    `/api/orders/${id}/status/`,
    { status }
  );
  return res.data;
};