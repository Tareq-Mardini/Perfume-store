import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import {
  getProducts,
  deleteProduct,
} from "../../../../../services/productsService";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getProducts();
      console.log("PRODUCTS API:", data);
      setProducts(data);
    } catch (err) {
      console.log(err);
      console.log("Failed to load products");
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // 🔥 تحديث UI بدون reload
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  return (
    <>
      <Link to="/admin/products/create-product">
        <button className="btn-create-product">Create New Product</button>
      </Link>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Image</th>
              <th className="th">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="td" data-label="Name">
                  {product.translations[1].name}
                </td>
                <td className="td" data-label="Image">
                  <img
                    src={product.images[0]?.image}
                    alt={product.name}
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "8px",
                      width: "130px",
                      height: "100px",
                      margin: "auto",
                    }}
                  />
                </td>

                <td className="td" data-label="Actions">
                  <button
                    className="btn-Dash btn-view"
                    onClick={() =>
                      navigate(`/admin/products/product-Detail/${product.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="btn-Dash btn-edit"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn-Dash btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
