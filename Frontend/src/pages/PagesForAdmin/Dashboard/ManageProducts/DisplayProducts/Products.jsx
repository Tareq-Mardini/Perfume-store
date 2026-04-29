import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Products.module.css";
import {
  getProducts,
  deleteProduct,
} from "../../../../../services/productsService";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setError(t("adminProducts.errorLoad"));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(t("adminProducts.confirmDelete"));
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
      alert(t("adminProducts.errorDelete"));
    }
  };

  return (
    <div style={{ paddingTop: "0px" }} className={styles.wrapper}>
      {/* ===== HEADER ===== */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          {t("adminProducts.title")} <span>{t("adminProducts.highlight")}</span>
        </h2>

        <Link to="/admin/products/create-product">
          <button className={styles.btnCreate}>
            {t("adminProducts.createBtn")}
          </button>
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
              <th>{t("adminProducts.name")}</th>
              <th>{t("adminProducts.image")}</th>
              <th>{t("adminProducts.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  {t("adminProducts.empty")}
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id}>
                  {/* ID */}
                  <td data-label="#">
                    <span className={styles.idBadge}>{index + 1}</span>
                  </td>

                  {/* Name */}
                  <td data-label={t("adminProducts.name")}>
                    <span className={styles.productName}>
                      {product.translations[1]?.name}
                    </span>
                  </td>

                  {/* Image */}
                  <td data-label={t("adminProducts.image")}>
                    <img
                      src={product.images[0]?.image}
                      alt={product.translations[1]?.name}
                      className={styles.productImg}
                    />
                  </td>

                  {/* Actions */}
                  <td data-label={t("adminProducts.actions")}>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.btnView}`}
                        onClick={() =>
                          navigate(
                            `/admin/products/product-Detail/${product.id}`,
                          )
                        }
                      >
                        {t("adminProducts.view")}
                      </button>

                      <button
                        className={`${styles.btn} ${styles.btnEdit}`}
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`)
                        }
                      >
                        {t("adminProducts.edit")}
                      </button>

                      <button
                        className={`${styles.btn} ${styles.btnDelete}`}
                        onClick={() => handleDelete(product.id)}
                      >
                        {t("adminProducts.delete")}
                      </button>

                      <button
                        className={`${styles.btn} ${styles.btnView}`}
                        onClick={() =>
                          navigate(`/admin/products/edit-images/${product.id}`)
                        }
                      >
                        tatat
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