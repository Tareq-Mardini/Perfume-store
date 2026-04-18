import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

import Sidebar from "../components/ForAdmin/Sidebar/Sidebar";
import Header from "../components/ForAdmin/Header/Header";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen(false)}
      />

      {/* 🔥 يظهر فقط بالموبايل */}
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="main">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
