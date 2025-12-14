import React from "react";
import { useDispatch } from "react-redux";
import { addCart, delCart } from "../store/cartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  return (
    <div className="row align-items-center border-bottom py-4">
      <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <div className="flex-shrink-0" style={{width: "100px", height: "100px", backgroundColor: "#f0f0f0"}}>
            <img
              src={item.image}
              alt={item.title}
              className="w-100 h-100 object-fit-cover mix-blend-multiply"
            />
        </div>
        <div className="ms-4">
            <h6 className="mb-1 text-uppercase small text-muted" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>{item.category}</h6>
            <h5 className="mb-2" style={{fontFamily: "'Playfair Display', serif"}}>{item.title}</h5>
            <p className="mb-0 text-muted small">${item.price}</p>
        </div>
      </div>
      <div className="col-md-3 col-6 d-flex justify-content-md-center align-items-center">
          <div className="d-flex border">
            <button className="btn btn-link text-dark text-decoration-none px-2" onClick={() => removeItem(item)} disabled={item.qty === 1}>
                <i className="fas fa-minus small"></i>
            </button>
            <div className="px-2 d-flex align-items-center justify-content-center" style={{minWidth: "30px", fontSize: "0.9rem"}}>
                {item.qty}
            </div>
            <button className="btn btn-link text-dark text-decoration-none px-2" onClick={() => addItem(item)}>
                <i className="fas fa-plus small"></i>
            </button>
          </div>
      </div>
      <div className="col-md-2 col-5 text-end">
          <p className="mb-0 fw-bold">${(item.qty * item.price).toFixed(2)}</p>
      </div>
      <div className="col-md-1 col-1 text-end">
           <button className="btn text-muted hover-danger p-0" onClick={() => removeItem(item)} title="Remove Item">
              <i className="fa fa-times"></i>
           </button>
      </div>
    </div>
  );
};

export default CartItem;