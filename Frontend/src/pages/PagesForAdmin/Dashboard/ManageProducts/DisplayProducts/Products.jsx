import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { getProducts } from "../../../../../services/productsService";
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

  return (
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
                  src={product.images[0].image}
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
                    navigate(`/admin/product-Detail/${product.id}`)
                  }
                >
                  View
                </button>
                <button className="btn-Dash btn-edit">Edit</button>
                <button className="btn-Dash btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
