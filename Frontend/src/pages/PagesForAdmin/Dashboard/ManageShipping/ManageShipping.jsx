import { useEffect, useState, useRef } from "react";
import { getOrders } from "../../../../services/OrdersService";
import styles from "./ManageShipping.module.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function ManageOrders() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setSentSuccess(false);
  };

  const isSelected = (id) => selectedIds.includes(id);
  const clearSelection = () => {
    setSelectedIds([]);
    setSentSuccess(false);
  };

  const handleSend = async () => {
    setShowConfirm(false);
    if (selectedIds.length === 0) return;
    try {
      setSending(true);
      // await axiosInstance.post("/api/ship/", { order_ids: selectedIds });
      await new Promise((r) => setTimeout(r, 900));
      setSentSuccess(true);
      setSelectedIds([]);
      setTimeout(() => setSentSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const selectedOrders = orders.filter((o) => selectedIds.includes(o.id));

  if (loading)
    return <p className={styles.loading}>{t("productPage.loading")}</p>;

  return (
    <>
      <Helmet>
        <title>Munaryss | Orders</title>
      </Helmet>

      {/* ══ SELECTION BAR — TOP FIXED ══ */}
      <div
        className={`${styles.selectionBar} ${selectedIds.length > 0 ? styles.selectionBarVisible : ""}`}
      >
        <div className={styles.selBarInner}>
          {/* Count */}
          <div className={styles.selCount}>
            <div className={styles.selCountBadge}>{selectedIds.length}</div>
            <span className={styles.selCountLabel}>
              {t("adminOrders.selectedOrders") || "Selected"}
            </span>
          </div>

          <div className={styles.selDivider} />

          {/* Chips — horizontal scroll */}
          <div className={styles.selNames}>
            {selectedOrders.map((o) => (
              <div key={o.id} className={styles.selChip}>
                <span>{o.customer_name}</span>
                <button
                  className={styles.selChipRemove}
                  onClick={() => toggleSelect(o.id)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.selDivider} />

          {/* Actions */}
          <div className={styles.selActions}>
            <button className={styles.selClearBtn} onClick={clearSelection}>
              {t("adminOrders.clearSelection") || "Clear"}
            </button>

            {sentSuccess ? (
              <div className={styles.selSuccess}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t("adminOrders.sent") || "Sent!"}
              </div>
            ) : (
              <button
                className={styles.selSendBtn}
                onClick={() => setShowConfirm(true)}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <div className={styles.spin} />
                    {t("adminOrders.sending") || "Sending..."}
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {t("adminOrders.sendToShipping") || "Send to Shipping"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══ CONFIRM MODAL ══ */}
      {showConfirm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowConfirm(false)}
        >
          <div
            className={styles.modalSheet}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning icon */}
            <div className={styles.modalIconWrap}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h3 className={styles.modalTitle}>
              {t("adminOrders.confirmTitle") || "Confirm Shipping"}
            </h3>
            <p className={styles.modalDesc}>
              {t("adminOrders.confirmDesc") || "You are about to send"}{" "}
              <strong>{selectedIds.length}</strong>{" "}
              {t("adminOrders.confirmOrders") || "order(s) to shipping."}{" "}
              {t("adminOrders.confirmWarning") ||
                "This action cannot be undone."}
            </p>

            {/* Selected summary */}
            <div className={styles.modalSummary}>
              {selectedOrders.map((o) => (
                <div key={o.id} className={styles.modalSummaryRow}>
                  <span className={styles.modalSummaryName}>
                    {o.customer_name}
                  </span>
                  <span className={styles.modalSummaryId}>#{o.id}</span>
                </div>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                {t("adminOrders.cancel") || "Cancel"}
              </button>
              <button className={styles.modalConfirmBtn} onClick={handleSend}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                {t("adminOrders.confirmSend") || "Yes, Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ PAGE ══ */}
      <div
        style={{
          paddingTop: selectedIds.length > 0 ? "80px" : "0px",
          transition: "padding-top 0.4s ease",
        }}
        className={styles.page}
      >
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>
            {t("adminOrders.title")} <span>{t("adminOrders.highlight")}</span>
          </h2>
          <div className={styles.filterBox}>
            <span className={styles.filterLabel}>
              {t("adminOrders.filter")}
            </span>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">{t("filters.all")}</option>
              <option value="approved">{t("adminOrders.approved")}</option>
              <option value="shipped">{t("adminOrders.shipped")}</option>
              <option value="delivered">{t("adminOrders.delivered")}</option>
            </select>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className={styles.emptyState}>{t("adminOrders.empty")}</p>
        ) : (
          <>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${styles.orderCard} ${isSelected(order.id) ? styles.orderCardSelected : ""}`}
              >
                <div className={styles.orderHeader}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="checkbox"
                      className={styles.orderCheckbox}
                      checked={isSelected(order.id)}
                      onChange={() => toggleSelect(order.id)}
                    />
                    <div className={styles.orderMeta}>
                      <h3 className={styles.customerName}>
                        {order.customer_name}
                      </h3>
                      <span className={styles.orderId}>#{order.id}</span>
                    </div>
                  </div>
                  <div className={styles.headerRight}>
                    <span
                      className={`${styles.statusBadge} ${styles[`status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}
                    >
                      {t(`adminOrders.${order.status}`)}
                    </span>
                  </div>
                </div>

                <div className={styles.orderBody}>
                  <div className={styles.orderInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoKey}>
                        {t("adminOrders.phone")}
                      </span>
                      <span className={styles.infoVal}>
                        {order.customer_phone}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoKey}>
                        {t("adminOrders.city")}
                      </span>
                      <span className={styles.infoVal}>{order.city}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoKey}>
                        {t("adminOrders.area")}
                      </span>
                      <span className={styles.infoVal}>{order.area}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoKey}>
                        {t("adminOrders.total")}
                      </span>
                      <span className={styles.totalVal}>
                        ${order.total_amount}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoKey}>
                        {t("adminOrders.date")}
                      </span>
                      <span className={styles.infoVal}>
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={styles.orderItems}>
                    <div className={styles.itemsTitle}>
                      {t("adminOrders.items")}
                    </div>
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

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.paginationBtn}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  {t("products.prev")}
                </button>
                <span className={styles.pageIndicator}>
                  {t("products.page")} {page}
                </span>
                <button
                  className={styles.paginationBtn}
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  {t("products.next")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
