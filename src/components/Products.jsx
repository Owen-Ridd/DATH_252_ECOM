import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import productData from "../data/product.json";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      setTimeout(() => {
        const sortedProducts = [...productData].sort((a, b) => {
            let scoreA = 0;
            if (a.isBestSeller) scoreA += 2;
            if (a.isOnSale) scoreA += 1;
            let scoreB = 0;
            if (b.isBestSeller) scoreB += 2;
            if (b.isOnSale) scoreB += 1;
            return scoreB - scoreA;
        });
        setData(sortedProducts);
        setFilter(sortedProducts);
        setLoading(false);
      }, 300);
    };
    getProducts();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("product-grid-top");
    if(element) element.scrollIntoView({ behavior: "smooth" });
  };

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push(<i key={`full-${i}`} className="fa fa-star text-warning small"></i>);
    if (hasHalfStar) stars.push(<i key="half" className="fa fa-star-half-alt text-warning small"></i>);
    return stars;
  };

  const filterProduct = (cat) => {
    setActiveFilter(cat);
    setCurrentPage(1);
    if (cat === "all") {
        setFilter(data);
    } else {
        const updatedList = data.filter((item) => item.category === cat);
        setFilter(updatedList);
    }
  };

  const FilterButton = ({ label, category }) => {
      const isActive = activeFilter === category;
      return (
        <button
            className="btn shadow-none mx-3 px-0 pb-2 rounded-0 text-uppercase position-relative"
            style={{
                border: "none", 
                color: isActive ? "#000" : "#999",
                letterSpacing: "2px",
                fontSize: "0.8rem",
                fontWeight: isActive ? "600" : "400",
                transition: "color 0.3s ease"
            }}
            onClick={() => filterProduct(category)}
        >
            {label}
            {isActive && (
                <motion.div 
                    layoutId="underline"
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{ height: "2px", backgroundColor: "#000" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
      )
  }

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center"><Skeleton height={20} width={200} /></div>
        {Array(6).fill().map((_, index) => (
            <div className="col-lg-4 col-md-6 mb-5" key={index}>
                <Skeleton height={380} />
                <Skeleton height={30} width="60%" className="mt-3" />
                <Skeleton height={20} width="30%" />
            </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filter.length / itemsPerPage);

    return (
      <>
        <div id="product-grid-top" className="d-flex justify-content-center flex-wrap py-5 mb-3">
            <FilterButton label="All Collection" category="all" />
            <FilterButton label="Living Room" category="Living Room" />
            <FilterButton label="Dining" category="Dining" />
            <FilterButton label="Bedroom" category="Bedroom" />
            <FilterButton label="Lighting" category="Lighting" />
            <FilterButton label="Decor" category="Decor" />
        </div>
        <motion.div layout className="row gx-4 gy-5">
            <AnimatePresence mode="popLayout">
                {currentItems.map((product) => {
                    const originalPrice = product.isOnSale 
                        ? (product.price / (1 - product.salePercentage / 100)).toFixed(2) 
                        : null;
                return (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        id={product.id} 
                        key={product.id} 
                        className="col-lg-4 col-md-6 col-sm-12"
                    >
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
                                    <div className="position-absolute top-0 start-0 m-3 px-3 py-1 bg-white text-dark text-uppercase small fw-bold shadow-sm" style={{fontSize: "0.65rem", letterSpacing: "1px", zIndex: 2}}>Best Seller</div>
                                )}
                                {product.isOnSale && (
                                    <div className="position-absolute top-0 end-0 m-3 px-2 py-1 bg-danger text-white text-uppercase small fw-bold" style={{fontSize: "0.65rem", zIndex: 2}}>-{product.salePercentage}%</div>
                                )}
                                <div className="card-img-overlay d-flex align-items-end justify-content-between p-4 opacity-0 hover-opacity-100 transition-opacity" style={{background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)"}}>
                                    <button className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{width: "45px", height: "45px"}} onClick={() => {toast.success("Added to cart"); addProduct(product);}} title="Add to Cart"><i className="fa fa-plus"></i></button>
                                    <Link to={"/product/" + product.id} className="btn btn-light rounded-0 text-uppercase px-4 py-2 shadow-sm small fw-bold" style={{letterSpacing: "1px", fontSize: "0.75rem"}}>View Item</Link>
                                </div>
                            </div>
                            <div className="card-body p-0 text-center">
                                <div className="text-muted small text-uppercase mb-1" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>{product.category}</div>
                                <h5 className="card-title text-truncate mb-2"><Link to={`/product/${product.id}`} className="text-dark text-decoration-none" style={{fontFamily: "'Playfair Display', serif", fontSize: "1.2rem"}}>{product.title}</Link></h5>
                                <div className="mb-2">{renderStars(product.rating.rate)}<span className="text-muted ms-2" style={{fontSize: "0.75rem"}}>({product.rating.count})</span></div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    {product.isOnSale ? (<><span className="text-muted text-decoration-line-through fw-light" style={{fontSize: "0.9rem"}}>${originalPrice}</span><span className="text-danger fw-bold" style={{fontSize: "1rem"}}>${product.price}</span></>) : (<span className="text-dark fw-bold" style={{fontSize: "1rem"}}>${product.price}</span>)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
                })}
            </AnimatePresence>
        </motion.div>
        {totalPages > 1 && (
            <div className="row mt-5">
                <div className="col-12 d-flex justify-content-center align-items-center gap-2">
                    <button onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="btn btn-outline-dark rounded-0 border-0" style={{opacity: currentPage === 1 ? 0.3 : 1}}><i className="fa fa-chevron-left small"></i></button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)} className={`btn rounded-0 d-flex align-items-center justify-content-center`} style={{width: "40px", height: "40px", backgroundColor: currentPage === i + 1 ? "#000" : "transparent", color: currentPage === i + 1 ? "#fff" : "#000", border: "1px solid #ddd", transition: "all 0.3s ease"}}>{i + 1}</button>
                    ))}
                    <button onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="btn btn-outline-dark rounded-0 border-0" style={{opacity: currentPage === totalPages ? 0.3 : 1}}><i className="fa fa-chevron-right small"></i></button>
                </div>
            </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="container-fluid px-5 py-5" style={{backgroundColor: "#FFFCFC", minHeight: "100vh"}}>
        <div className="row mb-5">
          <div className="col-lg-8 offset-lg-2 text-center">
             <span className="text-uppercase text-muted fw-bold" style={{letterSpacing: "4px", fontSize: "0.75rem"}}>Interior Design</span>
             <h2 className="display-4 mt-3 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Curated Furniture</h2>
             <p className="text-muted lead fs-6 fw-light mb-4 mx-auto" style={{maxWidth: "600px", lineHeight: "1.8"}}>
                Discover pieces that blend timeless elegance with modern comfort. Each item in our collection is hand-picked for its superior craftsmanship, sustainable materials, and ability to transform your house into a home.
             </p>
             <div className="d-flex justify-content-center align-items-center gap-4 text-uppercase small text-muted" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>
                <span><i className="fa fa-check-circle me-1"></i> Artisan Made</span>
                <span><i className="fa fa-leaf me-1"></i> Sustainable</span>
                <span><i className="fa fa-shield-alt me-1"></i> 5-Year Warranty</span>
             </div>
             <div className="mx-auto mt-5" style={{width: "1px", height: "60px", backgroundColor: "#000", opacity: 0.2}}></div>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
      <style jsx>{`
        .hover-opacity-100:hover { opacity: 1 !important; }
        .transition-opacity { transition: all 0.4s ease-in-out; }
      `}</style>
    </>
  );
};

export default Products;