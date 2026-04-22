import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../../../../services/OrdersService";
import "./ManageOrders.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // 🔥 أي أوردر مفتوح

  const pageSize = 3;
  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders(page, statusFilter);
      setOrders(data.results);
      setTotalCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 تغيير الحالة
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // 🔥 تحديث مباشر بدون reload
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );

      setOpenDropdown(null);
      alert("status update");
    } catch (err) {
      console.error(err);
      alert("Failed to update status ❌");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="orders-page">
      {/* 🔹 Filter */}
      <div className="filter-box">
        <label>Filter by Status:</label>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found 😢</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              {/* 🔹 Header */}
              <div className="order-header">
                <h3>{order.customer_name}</h3>

                <div className="status-wrapper">
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>

                  {/* 🔥 زر */}
                  <button
                    className="status-btn"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === order.id ? null : order.id,
                      )
                    }
                  >
                    ⚙️
                  </button>

                  {/* 🔥 Dropdown */}
                  {openDropdown === order.id && (
                    <div className="status-dropdown">
                      {[
                        "pending",
                        "approved",
                        "rejected",
                        "shipped",
                        "delivered",
                      ].map((status) => (
                        <div
                          key={status}
                          className="dropdown-item"
                          onClick={() => handleStatusChange(order.id, status)}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 🔹 Info */}
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

              {/* 🔸 Items */}
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

          {/* 🔥 Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>

              <span className="current-page">{page}</span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}