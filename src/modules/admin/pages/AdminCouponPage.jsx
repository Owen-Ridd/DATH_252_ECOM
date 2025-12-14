import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { Navbar, Footer } from "../../../components";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({ name: "", discount: "", expiry: "" });

  const fetchCoupons = async () => {
    try {
      const { data } = await axiosClient.get("/coupons");
      setCoupons(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.discount || !formData.expiry) return toast.error("Vui lòng điền đủ thông tin");
    
    try {
      await axiosClient.post("/coupons", formData);
      toast.success("Tạo mã thành công!");
      setFormData({ name: "", discount: "", expiry: "" });
      fetchCoupons(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi tạo mã");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa mã này?")) {
      try {
        await axiosClient.delete(`/coupons/${id}`);
        toast.success("Đã xóa mã");
        fetchCoupons();
      } catch (error) {
        toast.error("Lỗi xóa mã");
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", paddingBottom: "100px" }}>
        <div className="bg-white py-5 shadow-sm" style={{ marginTop: "80px" }}>
            <div className="container">
                <h1 className="display-6 fw-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Coupon Manager</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 small text-uppercase">
                        <li className="breadcrumb-item"><Link to="/admin" className="text-decoration-none text-muted">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Coupons</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="container mt-5">
            <div className="row g-5">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
                        <h5 className="mb-4 fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Create New Coupon</h5>
                        <form onSubmit={handleCreate}>
                            <div className="mb-3">
                                <label className="small text-muted fw-bold">CODE NAME</label>
                                <input className="form-control text-uppercase" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. SUMMER20" />
                            </div>
                            <div className="mb-3">
                                <label className="small text-muted fw-bold">DISCOUNT (%)</label>
                                <input type="number" className="form-control" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="20" min="1" max="100" />
                            </div>
                            <div className="mb-3">
                                <label className="small text-muted fw-bold">EXPIRY DATE</label>
                                <input type="date" className="form-control" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
                            </div>
                            <button className="btn btn-dark w-100 rounded-0 py-2 text-uppercase fw-bold">Create Coupon</button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm overflow-hidden">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4 py-3">Code</th>
                                    <th>Discount</th>
                                    <th>Expiry</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(coupon => {
                                    const isExpired = new Date() > new Date(coupon.expiry);
                                    return (
                                        <tr key={coupon._id}>
                                            <td className="ps-4 fw-bold text-success">{coupon.name}</td>
                                            <td>{coupon.discount}%</td>
                                            <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                                            <td>
                                                {isExpired 
                                                    ? <span className="badge bg-danger">Expired</span> 
                                                    : <span className="badge bg-success">Active</span>}
                                            </td>
                                            <td className="text-end pe-4">
                                                <button className="btn btn-sm btn-light text-danger rounded-circle" onClick={() => handleDelete(coupon._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {coupons.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No coupons created yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AdminCouponPage;