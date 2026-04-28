import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Products.module.css";
import {
  getProducts,
  deleteProduct,
} from "../../../../../services/productsService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
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
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* ===== HEADER ===== */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          All <span>Products</span>
        </h2>
        <Link to="/admin/products/create-product">
          <button className={styles.btnCreate}>+ Create New Product</button>
        </Link>
      </div>

      {/* ===== ERROR ===== */}
      {error && <p className={styles.error}>{error}</p>}

      {/* ===== TABLE ===== */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id}>
                  {/* ID — incremental */}
                  <td data-label="#">
                    <span className={styles.idBadge}>{index + 1}</span>
                  </td>

                  {/* Name */}
                  <td data-label="Name">
                    <span className={styles.productName}>
                      {product.translations[1]?.name}
                    </span>
                  </td>

                  {/* Image */}
                  <td data-label="Image">
                    <img
                      src={product.images[0]?.image}
                      alt={product.translations[1]?.name}
                      className={styles.productImg}
                    />
                  </td>

                  {/* Actions */}
                  <td data-label="Actions">
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.btnView}`}
                        onClick={() =>
                          navigate(
                            `/admin/products/product-Detail/${product.id}`,
                          )
                        }
                      >
                        View
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnEdit}`}
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnDelete}`}
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}