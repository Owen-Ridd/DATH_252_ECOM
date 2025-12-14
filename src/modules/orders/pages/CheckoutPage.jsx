import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import toast from "react-hot-toast";
import { clearCart } from "../store/cartSlice";

const LOGO_VISA = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
const LOGO_MC = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
const LOGO_AMEX = "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg";
const LOGO_PAYPAL = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const user = JSON.parse(localStorage.getItem("user"));

  const cartItems = useSelector((state) => state.cart);

  const { checkoutItems, total: passedTotal, subtotal: passedSubtotal, discountPercent = 0 } = location.state || {};
  
  const finalItems = checkoutItems && checkoutItems.length > 0 ? checkoutItems : cartItems;
  const safeItems = Array.isArray(finalItems) ? finalItems : [];

  const rawSubtotal = passedSubtotal || safeItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalTotal = passedTotal || (rawSubtotal - discountAmount);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ').slice(1).join(' ') || "",
    address: user?.addresses?.[0]?.street || "", 
    city: user?.addresses?.[0]?.city || "Ho Chi Minh", 
    state: "VN", 
    zip: "70000", 
    phone: user?.addresses?.[0]?.phone || ""
  });

  const [paymentOption, setPaymentOption] = useState("full"); // full | deposit
  const [paymentType, setPaymentType] = useState("credit_card"); 
  const [loading, setLoading] = useState(false);

  const inputStyle = { 
      height: "55px", 
      borderRadius: "4px", 
      border: "1px solid #E5E5E5", 
      fontSize: "0.95rem", 
      backgroundColor: "#fff", 
      boxShadow: "none",
      color: "#000",
      paddingLeft: "20px"
  };

  const labelStyle = { 
      fontSize: "0.7rem", 
      fontWeight: "700", 
      marginBottom: "10px", 
      display: "block", 
      color: "#666", 
      textTransform: "uppercase", 
      letterSpacing: "1.5px", 
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  };

  const sectionTitle = { 
      fontSize: "1.4rem", 
      fontWeight: "500", 
      letterSpacing: "1px", 
      marginBottom: "30px", 
      fontFamily: "'Playfair Display', serif", 
      color: "#000"
  };

  const handleOrder = async () => {
      if(!formData.address || !formData.phone) return toast.error("Please fill in shipping details");
      
      setLoading(true);
      try {
          await axiosClient.post("/orders", {
              customer: { 
                  ...formData, 
                  name: `${formData.firstName} ${formData.lastName}`.trim() 
              },
              items: safeItems, 
              totalAmount: finalTotal,
              paymentMethod: paymentType,
              paymentOption: paymentOption, 
              status: "Pending"
          });
          
          dispatch(clearCart());
          
          const orderCode = `ORD-${Date.now().toString().slice(-6)}`;
          navigate(`/order-success/${orderCode}`); 
      } catch (err) { 
          toast.error("Order Failed. Please try again."); 
          console.error(err);
      } 
      finally { setLoading(false); }
  };

  if (safeItems.length === 0) return (
      <div className="text-center py-5 mt-5">
          <h3>Your checkout bag is empty.</h3>
          <Link to="/cart" className="btn btn-dark mt-3">Return to Cart</Link>
      </div>
  );

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#1a1a1a" }}>
      
      <div className="border-bottom py-4 text-center bg-white sticky-top" style={{zIndex: 100}}>
          <Link to="/" className="text-decoration-none text-dark">
              <span className="fs-3 fw-bold" style={{letterSpacing: "4px", fontFamily: "'Playfair Display', serif"}}>LUXURIA.</span>
          </Link>
      </div>

      <div className="container-fluid">
        <div className="row">
            
            <div className="col-lg-7 px-lg-5 py-5 bg-white border-end">
                <div className="mx-auto" style={{maxWidth: "680px"}}>
                    <div className="mb-5 text-muted small text-uppercase" style={{letterSpacing: "1px", fontSize: "0.7rem"}}>
                        <Link to="/cart" className="text-decoration-none text-muted">Cart</Link> <span className="mx-2">/</span> <span className="fw-bold text-dark">Checkout</span>
                    </div>

                    {/* 1. CONTACT INFO */}
                    <div className="mb-5">
                        <h3 style={sectionTitle}>Contact Information</h3>
                        <div className="mb-4">
                            <label style={labelStyle}>Email Address</label>
                            <input type="email" className="form-control focus-black" style={inputStyle} value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="form-check mb-5">
                            <input className="form-check-input rounded bg-dark border-dark cursor-pointer" type="checkbox" id="news" defaultChecked />
                            <label className="form-check-label small text-muted ms-2 mt-1" htmlFor="news" style={{fontSize: "0.85rem"}}>Keep me updated on news and exclusive offers.</label>
                        </div>

                        <h3 style={sectionTitle}>Shipping Address</h3>
                        <div className="row g-4 mb-4">
                            <div className="col-6">
                                <label style={labelStyle}>First Name *</label>
                                <input type="text" className="form-control focus-black" style={inputStyle} value={formData.firstName} onChange={e=>setFormData({...formData, firstName: e.target.value})} />
                            </div>
                            <div className="col-6">
                                <label style={labelStyle}>Last Name *</label>
                                <input type="text" className="form-control focus-black" style={inputStyle} value={formData.lastName} onChange={e=>setFormData({...formData, lastName: e.target.value})} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label style={labelStyle}>Street Address *</label>
                            <input type="text" className="form-control focus-black" style={inputStyle} value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} />
                        </div>
                        <div className="row g-4 mb-4">
                            <div className="col-4">
                                <label style={labelStyle}>City *</label>
                                <input type="text" className="form-control focus-black" style={inputStyle} value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} />
                            </div>
                            <div className="col-4">
                                <label style={labelStyle}>State *</label>
                                <input type="text" className="form-control focus-black" style={inputStyle} value={formData.state} onChange={e=>setFormData({...formData, state: e.target.value})} />
                            </div>
                            <div className="col-4">
                                <label style={labelStyle}>Zip Code *</label>
                                <input type="text" className="form-control focus-black" style={inputStyle} value={formData.zip} onChange={e=>setFormData({...formData, zip: e.target.value})} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label style={labelStyle}>Phone Number *</label>
                            <input type="text" className="form-control focus-black" style={inputStyle} value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
                        </div>
                    </div>

                    {/* 2. PAYMENT SCHEDULE  */}
                    <div className="mb-5 pt-4 border-top">
                        <h3 style={sectionTitle}>Payment Schedule</h3>
                        
                        <div className="mb-5 d-flex flex-column gap-3">
                            <label className={`d-flex align-items-center cursor-pointer p-4 border rounded transition-all ${paymentOption==="full" ? "border-dark bg-light shadow-sm" : "border-light"}`}>
                                <input className="form-check-input border-dark me-3" type="radio" name="payOption" checked={paymentOption==="full"} onChange={()=>setPaymentOption("full")} style={{transform: "scale(1.3)"}} />
                                <div>
                                    <span className="d-block fw-bold text-uppercase small" style={{letterSpacing: "1px"}}>Pay Full Amount</span>
                                    <span className="text-muted small">Total payment will be processed immediately.</span>
                                </div>
                            </label>
                            
                            <label className={`d-flex align-items-center cursor-pointer p-4 border rounded transition-all ${paymentOption==="deposit" ? "border-dark bg-light shadow-sm" : "border-light"}`}>
                                <input className="form-check-input border-dark me-3" type="radio" name="payOption" checked={paymentOption==="deposit"} onChange={()=>setPaymentOption("deposit")} style={{transform: "scale(1.3)"}} />
                                <div>
                                    <span className="d-block fw-bold text-uppercase small" style={{letterSpacing: "1px"}}>Pay 25% Deposit</span>
                                    <span className="text-muted small">Balance due prior to delivery.</span>
                                </div>
                            </label>
                        </div>

                        {/* 3. PAYMENT METHOD */}
                        <h3 style={sectionTitle}>Payment Method</h3>
                        
                        <div className="d-flex flex-column gap-3">
                            {/* Option 1: Credit Card */}
                            <label className={`p-4 border rounded d-flex align-items-center cursor-pointer transition-all ${paymentType==="credit_card" ? "border-dark bg-white shadow-sm" : "border-light bg-light"}`}>
                                <input type="radio" name="pType" checked={paymentType==="credit_card"} onChange={()=>setPaymentType("credit_card")} className="me-3 form-check-input border-dark" style={{transform: "scale(1.3)"}} />
                                <span className="fw-bold small flex-grow-1 text-uppercase" style={{letterSpacing: "1px"}}>Credit Card</span>
                                <div className="d-flex gap-2 align-items-center opacity-75">
                                    <img src={LOGO_MC} height="24" alt="Mastercard" />
                                    <img src={LOGO_VISA} height="16" alt="Visa" />
                                    <img src={LOGO_AMEX} height="24" alt="Amex" />
                                </div>
                            </label>

                            {/* Option 2: PayPal */}
                            <label className={`p-4 border rounded d-flex align-items-center cursor-pointer transition-all ${paymentType==="paypal" ? "border-dark bg-white shadow-sm" : "border-light bg-light"}`}>
                                <input type="radio" name="pType" checked={paymentType==="paypal"} onChange={()=>setPaymentType("paypal")} className="me-3 form-check-input border-dark" style={{transform: "scale(1.3)"}} />
                                <span className="fw-bold small flex-grow-1 text-uppercase" style={{letterSpacing: "1px"}}>PayPal</span>
                                <img src={LOGO_PAYPAL} height="20" alt="PayPal" />
                            </label>

                            {/* Option 3: COD */}
                            <label className={`p-4 border rounded d-flex align-items-center cursor-pointer transition-all ${paymentType==="cod" ? "border-dark bg-white shadow-sm" : "border-light bg-light"}`}>
                                <input type="radio" name="pType" checked={paymentType==="cod"} onChange={()=>setPaymentType("cod")} className="me-3 form-check-input border-dark" style={{transform: "scale(1.3)"}} />
                                <span className="fw-bold small flex-grow-1 text-uppercase" style={{letterSpacing: "1px"}}>Cash Payment (COD)</span>
                                <div className="text-success fw-bold">
                                    <i className="fa fa-money-bill-wave fs-4"></i>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button 
                        onClick={handleOrder}
                        className="btn btn-black w-100 text-uppercase fw-bold text-white mb-3 shadow-hover" 
                        style={{backgroundColor: "#000", letterSpacing: "2px", height: "60px", borderRadius: "4px", fontSize: "0.9rem"}}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : `Place Order • $${finalTotal.toLocaleString()}`}
                    </button>
                    
                    <div className="d-flex align-items-center justify-content-center gap-2 mt-4 text-muted small">
                        <i className="fa fa-lock"></i>
                        <span>Guaranteed safe & secure checkout powered by Stripe</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-5 px-lg-5 py-5 d-none d-lg-block" style={{backgroundColor: "#F9F7F2", minHeight: "100vh"}}>
                <div className="mx-auto sticky-top" style={{maxWidth: "500px", top: "100px"}}>
                    <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-dark border-opacity-10">
                        <h5 className="text-uppercase m-0 fw-bold" style={{letterSpacing: "2px", fontFamily: "'Playfair Display', serif"}}>Order Summary</h5>
                        <Link to="/cart" className="text-dark fw-bold text-decoration-underline small text-uppercase" style={{fontSize: "0.7rem"}}>Edit Cart</Link>
                    </div>

                    {/* Product List */}
                    <div className="mb-5" style={{maxHeight: "400px", overflowY: "auto", scrollbarWidth: "thin"}}>
                        {safeItems.map((item) => (
                            <div key={item._id} className="d-flex mb-4 align-items-start">
                                <div className="bg-white p-2 border rounded shadow-sm position-relative">
                                    <img src={item.image} alt="" style={{width: "70px", height: "70px", objectFit: "contain"}} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-light text-white" style={{fontSize: "0.7rem"}}>
                                        {item.qty}
                                    </span>
                                </div>
                                <div className="flex-grow-1 ms-3 pt-1">
                                    <h6 className="text-uppercase fw-bold mb-1 small text-dark" style={{letterSpacing: "0.5px"}}>{item.title}</h6>
                                    <p className="text-muted small mb-1">{item.selectedFabric || "Standard"}</p>
                                </div>
                                <div className="pt-1 text-end">
                                    <span className="fw-bold small d-block">${(item.price * item.qty).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Promo Code */}
                    <div className="d-flex mb-5 border border-dark bg-white rounded overflow-hidden">
                        <input type="text" className="form-control rounded-0 border-0 px-3 bg-transparent focus-none" placeholder="Enter promo code" style={{height: "50px", fontSize: "0.9rem"}} />
                        <button className="btn btn-black text-white rounded-0 px-4 fw-bold text-uppercase" style={{backgroundColor: "#000", fontSize: "0.75rem", letterSpacing: "1px"}}>Redeem</button>
                    </div>

                    {/* Totals */}
                    <div className="border-top border-dark border-opacity-25 pt-4">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small text-muted text-uppercase" style={{letterSpacing: "1px"}}>Subtotal</span>
                            <span className="fw-bold small">${rawSubtotal.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small text-muted text-uppercase" style={{letterSpacing: "1px"}}>Discount</span>
                            <span className="fw-bold small text-danger">-${discountAmount.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-muted">
                            <span className="small text-uppercase" style={{letterSpacing: "1px"}}>Shipping</span>
                            <span className="fst-italic small">Calculated at next step</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mt-4 pt-4 border-top border-dark align-items-center">
                            <span className="fw-bold fs-5 text-uppercase" style={{fontFamily: "'Playfair Display', serif", letterSpacing: "1px"}}>Total</span>
                            <div>
                                <span className="text-muted small me-2 text-uppercase" style={{fontSize: "0.7rem"}}>USD</span>
                                <span className="fw-bold fs-3">${finalTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
      
      {/* CSS CUSTOM */}
      <style jsx>{`
        .focus-black:focus { border-color: #000 !important; box-shadow: 0 0 0 1px #000 !important; outline: none; }
        .focus-none:focus { box-shadow: none !important; outline: none !important; }
        .cursor-pointer { cursor: pointer; }
        .transition-all { transition: all 0.2s ease; }
        .shadow-hover:hover { box-shadow: 0 5px 15px rgba(0,0,0,0.3); transform: translateY(-1px); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default CheckoutPage;