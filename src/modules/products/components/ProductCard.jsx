import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../../orders/store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push(<i key={`full-${i}`} className="fa fa-star text-warning small"></i>);
    if (hasHalfStar) stars.push(<i key="half" className="fa fa-star-half-alt text-warning small"></i>);
    return stars;
  };

  const originalPrice = product.isOnSale 
    ? (product.price / (1 - product.salePercentage / 100)).toFixed(2) 
    : null;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card h-100 border-0 bg-transparent product-card position-relative">
        
        <div className="position-relative overflow-hidden mb-4 shadow-sm" style={{ height: "380px", backgroundColor: "#ffffff" }}>
          <img
            className="img-fluid w-100 h-100 transition-transform"
            src={product.image}
            alt={product.title}
            style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.8s ease" }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
          />
          
          {product.isBestSeller && (
            <div className="position-absolute top-0 start-0 m-3 px-3 py-1 bg-white text-dark text-uppercase small fw-bold shadow-sm" style={{fontSize: "0.65rem", letterSpacing: "1px", zIndex: 2}}>
                Best Seller
            </div>
          )}
          
          {product.isOnSale && (
            <div className="position-absolute top-0 end-0 m-3 px-2 py-1 bg-danger text-white text-uppercase small fw-bold" style={{fontSize: "0.65rem", zIndex: 2}}>
                -{product.salePercentage}%
            </div>
          )}

          <div className="card-img-overlay d-flex align-items-end justify-content-between p-4 opacity-0 hover-opacity-100 transition-opacity"
                style={{background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)"}}>
            <button 
                className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                style={{width: "45px", height: "45px"}}
                onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                }}
                title="Add to Cart"
            >
                <i className="fa fa-plus"></i>
            </button>
            <Link 
                to={"/product/" + product.id}
                className="btn btn-light rounded-0 text-uppercase px-4 py-2 shadow-sm small fw-bold"
                style={{letterSpacing: "1px", fontSize: "0.75rem"}}
            >
                View Item
            </Link>
          </div>
        </div>

        <div className="card-body p-0 text-center">
            <div className="text-muted small text-uppercase mb-1" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>
                {product.category}
            </div>
            <h5 className="card-title text-truncate mb-2">
                <Link to={`/product/${product.id}`} className="text-dark text-decoration-none" style={{fontFamily: "'Playfair Display', serif", fontSize: "1.2rem"}}>
                    {product.title}
                </Link>
            </h5>
            <div className="mb-2">
                {renderStars(product.rating.rate)}
                <span className="text-muted ms-2" style={{fontSize: "0.75rem"}}>({product.rating.count})</span>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
                {product.isOnSale ? (
                    <>
                        <span className="text-muted text-decoration-line-through fw-light" style={{fontSize: "0.9rem"}}>${originalPrice}</span>
                        <span className="text-danger fw-bold" style={{fontSize: "1rem"}}>${product.price}</span>
                    </>
                ) : (
                    <span className="text-dark fw-bold" style={{fontSize: "1rem"}}>${product.price}</span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;