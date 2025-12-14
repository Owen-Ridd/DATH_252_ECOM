import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../orders/store/cartSlice";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState('45"');

  const finishes = [
    { name: "Almond", color: "#C4A484" },
    { name: "Dark Walnut", color: "#5D4037" },
    { name: "Charcoal", color: "#3E2723" },
    { name: "Natural", color: "#E0C097" },
  ];
  const widths = ['37"', '42"', '45"'];

  const addProduct = () => {
    dispatch(addCart({ ...product, qty: quantity }));
  };

  const originalPrice = (product.price * 1.2).toFixed(2);

  return (
    <div className="col-lg-5 col-md-12 ps-lg-5">
      <h1 className="display-5 fw-normal mb-2" style={{fontFamily: "'Playfair Display', serif"}}>{product.title}</h1>
      <div className="mb-3 small">
          <i className="fa fa-star text-secondary"></i>
          <i className="fa fa-star text-secondary"></i>
          <i className="fa fa-star text-secondary"></i>
          <i className="fa fa-star text-secondary"></i>
          <i className="fa fa-star-half-alt text-secondary"></i>
          <span className="ms-2 text-muted text-decoration-underline">15 reviews</span>
      </div>
      <div className="d-flex align-items-center mb-4">
           <span className="fs-4 fw-bold me-3">${product.price}</span>
           <span className="text-muted text-decoration-line-through me-3">${originalPrice}</span>
           <span className="text-danger small fw-bold">20% Off</span>
      </div>
      <hr className="my-4 text-muted opacity-25"/>
      
      {/* Finish Selection */}
      <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold small">Finish Color: <span className="fw-normal">{finishes[selectedFinish].name}</span></span>
          </div>
          <div className="d-flex gap-2">
              {finishes.map((finish, index) => (
                  <div key={index} onClick={() => setSelectedFinish(index)} style={{width: "50px", height: "50px", backgroundColor: finish.color, cursor: "pointer", border: selectedFinish === index ? "2px solid #000" : "1px solid #ddd", padding: "2px"}}>
                      <div className="w-100 h-100" style={{backgroundColor: finish.color}}></div>
                  </div>
              ))}
          </div>
      </div>

      {/* Width Selection */}
      <div className="mb-4">
          <div className="d-flex justify-content-between mb-2"><span className="fw-bold small">Width</span></div>
          <div className="d-flex gap-2">
              {widths.map((w) => (
                  <button key={w} onClick={() => setSelectedWidth(w)} className={`btn rounded-0 px-4 py-2 ${selectedWidth === w ? 'btn-dark' : 'btn-outline-dark'}`} style={{fontSize: "0.85rem"}}>{w}</button>
              ))}
          </div>
      </div>

      {/* Add to Cart */}
      <div className="row g-2 mb-4">
          <div className="col-3">
              <div className="input-group">
                  <button className="btn btn-outline-dark rounded-0 px-2" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</button>
                  <input type="text" className="form-control text-center border-dark rounded-0 px-0" value={quantity} readOnly />
                  <button className="btn btn-outline-dark rounded-0 px-2" onClick={() => setQuantity(q => q+1)}>+</button>
              </div>
          </div>
          <div className="col-9">
              <button className="btn btn-dark w-100 rounded-0 py-2 text-uppercase fw-bold" onClick={addProduct} style={{letterSpacing: "2px"}}>Add to Cart</button>
          </div>
      </div>
      <p className="text-muted small mb-4" style={{lineHeight: "1.7"}}>{product.description}</p>
    </div>
  );
};

export default ProductInfo;