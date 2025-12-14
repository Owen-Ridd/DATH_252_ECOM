import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fa-chart-pie' },
    { path: '/admin/products', label: 'Products', icon: 'fa-layer-group' },
    { path: '/admin/coupons', label: 'Coupons', icon: 'fa-ticket-alt' },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 text-white h-100 position-fixed start-0 top-0" 
         style={{ width: "280px", backgroundColor: "#111", zIndex: 1000, boxShadow: "4px 0 20px rgba(0,0,0,0.1)" }}>
      
      <div className="p-5 pb-4">
        <a href="/" className="text-white text-decoration-none">
          <span className="d-block fs-3" style={{fontFamily: "'Playfair Display', serif", letterSpacing: "2px"}}>LUXURIA.</span>
          <span className="text-muted text-uppercase small" style={{letterSpacing: "4px", fontSize: "0.6rem"}}>Control Center</span>
        </a>
      </div>

      <div className="px-4 mb-4"><div className="border-bottom border-secondary opacity-25"></div></div>

      <ul className="nav nav-pills flex-column mb-auto px-3 gap-2">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <NavLink 
              to={item.path} 
              end={item.path === '/admin'}
              className={({ isActive }) => `nav-link d-flex align-items-center py-3 px-4 rounded-0 transition-all ${
                  isActive 
                  ? 'bg-white text-black fw-bold' 
                  : 'text-white opacity-75 hover-opacity-100'
              }`}
              style={{letterSpacing: "1px", fontSize: "0.9rem", transition: "all 0.3s ease"}}
            >
              <i className={`fa ${item.icon} me-3 text-center`} style={{width: "20px"}}></i>
              <span className="text-uppercase small">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="p-4 mt-auto bg-dark border-top border-secondary border-opacity-25">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center me-3 fw-bold" style={{width: "40px", height: "40px", fontFamily: "'Playfair Display', serif"}}>
                    {user?.name?.charAt(0) || "A"}
                </div>
                <div>
                    <strong className="d-block text-white small text-uppercase" style={{letterSpacing: "1px"}}>Admin</strong>
                    <small className="text-muted" style={{fontSize: "0.75rem"}}>Online</small>
                </div>
            </div>
            <button onClick={handleLogout} className="btn btn-link text-secondary p-0 hover-text-white" title="Logout">
                <i className="fa fa-sign-out-alt"></i>
            </button>
        </div>
      </div>
      
      <style jsx>{`
        .hover-opacity-100:hover { opacity: 1 !important; background: rgba(255,255,255,0.05); }
        .hover-text-white:hover { color: #fff !important; }
      `}</style>
    </div>
  );
};

export default AdminSidebar;