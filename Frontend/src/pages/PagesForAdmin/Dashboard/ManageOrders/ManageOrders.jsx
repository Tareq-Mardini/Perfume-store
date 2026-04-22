import { useEffect, useState } from "react";
import { getOrders } from "../../../../services/OrdersService";
import "./ManageOrders.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 3;
  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders(page);

      setOrders(data.results);
      setTotalCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="orders-page">
      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          {/* 🔹 معلومات الزبون */}
          <div className="order-header">
            <h3>{order.customer_name}</h3>
            <span className={`status ${order.status}`}>{order.status}</span>
          </div>

          <div className="order-info">
            <p>
              <strong>Phone:</strong> {order.customer_phone}
            </p>
            <p>
              <strong>City:</strong> {order.city}
            </p>
            <p>
              <strong>Area:</strong> {order.area}
            </p>
            <p>
              <strong>Total:</strong> ${order.total_amount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          {/* 🔸 العناصر */}
          <div className="order-items">
            <h4>Items</h4>

            {order.items.map((item) => (
              <div key={item.id} className="item-row">
                <span>Product ID: {item.product}</span>
                <span>Qty: {item.quantity}</span>
                <span>${item.price_at_purchase}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span className="current-page">{page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
