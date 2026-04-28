import axiosInstanceAdmin from "../api/axiosInstanceAdmin";

export const getProducts = async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/products/");
  return res.data;
};

export const getDetailProductAdmin = async (id) => {
  const res = await axiosInstanceAdmin.get(`/api/admin/products/${id}/`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstanceAdmin.delete(`/api/admin/products/${id}/`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstanceAdmin.post("/api/admin/products/", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstanceAdmin.put(`/api/admin/products/${id}/`, data);
  return res.data;
};

// ✅ upload images
export const uploadProductImages = async (productId, images) => {
  const formData = new FormData();

  images.forEach((img) => {
    formData.append("images", img); // 🔥 نفس اسم الباك\
  });

  const res = await axiosInstanceAdmin.post(
    `/api/products/${productId}/images/bulk/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};