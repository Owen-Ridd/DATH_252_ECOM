import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../modules/admin/components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ backgroundColor: "#F4F4F4", minHeight: "100vh" }}>
      <AdminSidebar />

      <div className="flex-grow-1" style={{ marginLeft: "280px", transition: "margin 0.3s ease" }}>
        
        <div className="w-100 py-4 px-5 d-flex justify-content-end align-items-center">
             <span className="text-muted small text-uppercase fw-bold me-2" style={{letterSpacing: "1px"}}>{new Date().toDateString()}</span>
        </div>

        <div className="px-5 pb-5 fade-in-up">
            <Outlet />
        </div>
      </div>

      <style jsx>{`
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminLayout;