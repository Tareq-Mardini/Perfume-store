// DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

import Sidebar from "../components/ForAdmin/Sidebar/Sidebar";
import Header from "../components/ForAdmin/Header/Header";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Overlay – يظهر فقط بالموبايل لما السايدبار مفتوح */}
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={styles.main}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
