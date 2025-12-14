import React, { useState, useEffect, useRef } from "react";
import { Navbar, Footer } from "../../../components"; 
import axiosClient from "../../../api/axiosClient";
import ProductCard from "../components/ProductCard";
import SkeletonLoading from "../components/SkeletonLoading";
import toast from "react-hot-toast";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("default");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/products', {
        params: { category: activeFilter, keyword: keyword, sort: sortType }
      });
      setData(response.data);
    } catch (error) {
      toast.error("Unable to load collection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [activeFilter, sortType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };


  const FilterButton = ({ label, value }) => (
    <button 
        onClick={() => setActiveFilter(value)}
        className="btn border-0 rounded-0 px-0 me-4 position-relative"
        style={{
            fontSize: "0.8rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: activeFilter === value ? "bold" : "normal",
            color: activeFilter === value ? "#000" : "#888",
            transition: "all 0.3s ease",
            paddingBottom: "5px"
        }}
    >
        {label}
        {activeFilter === value && (
            <span style={{
                position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", backgroundColor: "#000"
            }}></span>
        )}
    </button>
  );

  const sortOptions = [
      { label: "Newest Arrivals", value: "default" },
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" },
      { label: "Best Sellers", value: "bestseller" },
  ];

  const currentSortLabel = sortOptions.find(o => o.value === sortType)?.label;

  return (
    <>
      <div style={{backgroundColor: "#fff", minHeight: "100vh", paddingTop: "120px", paddingBottom: "100px"}}>
        
        {/* --- HEADER --- */}
        <div className="container text-center mb-5 fade-in-up">
             <p className="text-muted text-uppercase mb-2" style={{letterSpacing: "4px", fontSize: "0.7rem"}}>Luxuria Exclusive</p>
             <h1 className="display-4 mb-3" style={{fontFamily: "'Playfair Display', serif", fontWeight: "400"}}>The Collection</h1>
        </div>

        {/* --- TOOLBAR --- */}
        <div className="container mb-5">
            <div className="row justify-content-center mb-5">
                <div className="col-md-6 text-center">
                    <form onSubmit={handleSearchSubmit} style={{position: "relative", display: "inline-block", width: "100%"}}>
                        <input 
                            type="text" 
                            className="form-control bg-transparent border-0 text-center" 
                            placeholder="Search for furniture..." 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            style={{
                                borderBottom: "1px solid #e0e0e0", 
                                borderRadius: 0,
                                boxShadow: "none", 
                                fontSize: "1.2rem",
                                fontFamily: "'Playfair Display', serif",
                                paddingBottom: "10px"
                            }}
                        />
                        {!keyword && (
                             <i className="fa fa-search text-muted position-absolute" 
                                style={{top: "20%", right: "0", opacity: 0.3, pointerEvents: "none"}}></i>
                        )}
                    </form>
                </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 pb-2 border-top border-bottom" style={{borderColor: "#f8f8f8"}}>
                
                {/* Left: Category Filters */}
                <div className="d-flex overflow-auto pb-2 pb-md-0 w-100 justify-content-center justify-content-md-start scrollbar-hide">
                    <FilterButton label="All" value="all" />
                    <FilterButton label="Living" value="Living Room" />
                    <FilterButton label="Dining" value="Dining" />
                    <FilterButton label="Bedroom" value="Bedroom" />
                    <FilterButton label="Lighting" value="Lighting" />
                    <FilterButton label="Decor" value="Decor" />
                </div>

                {/* Right: Custom Sort Dropdown */}
                <div className="mt-3 mt-md-0 position-relative" ref={sortRef}>
                    <div 
                        className="d-flex align-items-center cursor-pointer" 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        style={{cursor: "pointer"}}
                    >
                        <span className="text-muted text-uppercase me-2" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>Sort by:</span>
                        <span className="fw-bold text-uppercase" style={{fontSize: "0.75rem", letterSpacing: "1px", minWidth: "120px", textAlign: "right"}}>
                            {currentSortLabel}
                        </span>
                        <i className={`fa fa-chevron-down ms-2 transition-transform ${isSortOpen ? "rotate-180" : ""}`} style={{fontSize: "0.6rem"}}></i>
                    </div>

                    {isSortOpen && (
                        <div className="position-absolute end-0 mt-2 bg-white shadow-lg py-2 fade-in" 
                             style={{width: "200px", zIndex: 100, borderRadius: "0", border: "1px solid #f0f0f0"}}>
                            {sortOptions.map((option) => (
                                <div 
                                    key={option.value}
                                    className="px-4 py-2 hover-bg-light cursor-pointer"
                                    onClick={() => {
                                        setSortType(option.value);
                                        setIsSortOpen(false);
                                    }}
                                    style={{
                                        fontSize: "0.75rem",
                                        letterSpacing: "1px",
                                        textTransform: "uppercase",
                                        fontWeight: sortType === option.value ? "bold" : "normal",
                                        color: sortType === option.value ? "#000" : "#666"
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="container-fluid px-lg-5">
            {loading ? <SkeletonLoading /> : (
                <>
                    {data.length > 0 ? (
                        <div className="row gx-5 gy-5"> 
                            {data.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <h2 className="display-1 text-muted opacity-25" style={{fontFamily: "'Playfair Display', serif"}}>0</h2>
                            <p className="text-muted text-uppercase" style={{letterSpacing: "2px"}}>No items found</p>
                            <button 
                                className="btn btn-link text-dark text-decoration-none border-bottom border-dark rounded-0 px-0 pb-1" 
                                onClick={() => {setKeyword(""); setActiveFilter("all");}}
                            >
                                View all products
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .cursor-pointer { cursor: pointer; }
        .hover-bg-light:hover { background-color: #f9f9f9; color: #000 !important; }
        
        .transition-transform { transition: transform 0.3s ease; }
        .rotate-180 { transform: rotate(180deg); }
        
        .fade-in { animation: fadeIn 0.2s ease-out; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default ProductListPage;