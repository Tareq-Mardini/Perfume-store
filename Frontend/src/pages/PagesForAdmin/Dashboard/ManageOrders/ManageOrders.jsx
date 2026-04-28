import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../../../../services/OrdersService";
import styles from "./ManageOrders.module.css";
import { FaCog } from "react-icons/fa";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

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

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      {/* 🔹 Header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>
          Orders <span>Management</span>
        </h2>

        <div className={styles.filterBox}>
          <span className={styles.filterLabel}>Filter</span>

          <select
            className={styles.filterSelect}
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
      </div>

      {orders.length === 0 ? (
        <p className={styles.emptyState}>No orders found 😢</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              {/* Header */}
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <h3 className={styles.customerName}>{order.customer_name}</h3>
                </div>

                <div className={styles.headerRight}>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[
                        `status${
                          order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        }`
                      ]
                    }`}
                  >
                    {order.status}
                  </span>

                  <div className={styles.statusWrapper}>
                    <button
                      className={styles.statusBtn}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === order.id ? null : order.id,
                        )
                      }
                    >
                      <FaCog />
                    </button>

                    {openDropdown === order.id && (
                      <div className={styles.dropdown}>
                        {[
                          "pending",
                          "approved",
                          "rejected",
                          "shipped",
                          "delivered",
                        ].map((status) => (
                          <div
                            key={status}
                            className={styles.dropdownItem}
                            onClick={() => handleStatusChange(order.id, status)}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className={styles.orderBody}>
                {/* Info */}
                <div className={styles.orderInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Phone</span>
                    <span className={styles.infoVal}>
                      {order.customer_phone}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>City</span>
                    <span className={styles.infoVal}>{order.city}</span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Area</span>
                    <span className={styles.infoVal}>{order.area}</span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Total</span>
                    <span className={styles.totalVal}>
                      ${order.total_amount}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoKey}>Date</span>
                    <span className={styles.infoVal}>
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className={styles.orderItems}>
                  <div className={styles.itemsTitle}>Items</div>

                  {order.items.map((item) => (
                    <div key={item.id} className={styles.itemRow}>
                      <span className={styles.itemName}>
                        {item.product_name}
                      </span>
                      <span className={styles.itemQty}>x{item.quantity}</span>
                      <span className={styles.itemPrice}>
                        ${item.price_at_purchase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span className={styles.pageIndicator}>page {page}</span>

              <button
                className={styles.paginationBtn}
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