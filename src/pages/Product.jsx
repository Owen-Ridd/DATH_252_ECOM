import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import productData from "../data/product.json";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart({...product, qty: quantity}));
  };

  useEffect(() => {
    const getProduct = () => {
      setLoading(true);
      setTimeout(() => {
        const productId = parseInt(id);
        const foundProduct = productData.find((item) => item.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
          const similar = productData.filter(
            (item) => item.category === foundProduct.category && item.id !== productId
          );
          setSimilarProducts(similar);
        } else {
            console.warn("Product not found");
        }
        setLoading(false);
      }, 300);
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const Loading = () => {
    return (
      <div className="container" style={{minHeight: "80vh", marginTop: "120px"}}>
        <div className="row">
          <div className="col-lg-7"><Skeleton height={600} /></div>
          <div className="col-lg-5 ps-lg-5">
            <Skeleton height={40} width={300} className="mb-3" />
            <Skeleton height={20} width={100} className="mb-4" />
            <Skeleton height={100} className="mb-4" />
            <Skeleton height={50} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    if (!product || !product.title) return null;
    const originalPrice = (product.price * 1.2).toFixed(2);

    return (
      <div className="container" style={{ marginTop: "140px", marginBottom: "80px" }}>
        <div className="row mb-4">
            <div className="col-12">
                 <p className="text-uppercase small text-muted" style={{fontSize: "0.75rem", letterSpacing: "1px"}}>
                    <Link to="/" className="text-decoration-none text-muted">Home</Link> / 
                    <span className="mx-2">Dining</span> / 
                    <span className="mx-2 text-dark">{product.title}</span>
                 </p>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-7 col-md-12 mb-5 mb-lg-0">
            <div className="bg-light d-flex justify-content-center align-items-center" style={{minHeight: "600px", backgroundColor: "#fdfdfd"}}>
                <img 
                    className="img-fluid" 
                    src={product.image} 
                    alt={product.title} 
                    style={{maxHeight: "600px", width: "100%", objectFit: "cover"}}
                />
            </div>
            <div className="row mt-3 g-2">
                {[1,2,3].map(i => (
                    <div className="col-3" key={i}>
                        <img src={product.image} className="img-fluid opacity-75 border" style={{aspectRatio: "1/1", objectFit: "cover", cursor: "pointer"}} />
                    </div>
                ))}
            </div>
          </div>
          <div className="col-lg-5 col-md-12 ps-lg-5">
            <h1 className="display-5 fw-normal mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                {product.title}
            </h1>
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
            <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold small">Finish Color: <span className="fw-normal">{finishes[selectedFinish].name}</span></span>
                    <a href="#" className="text-muted small text-decoration-underline">Finish Color Guide</a>
                </div>
                <div className="d-flex gap-2">
                    {finishes.map((finish, index) => (
                        <div 
                            key={index}
                            onClick={() => setSelectedFinish(index)}
                            style={{
                                width: "50px", 
                                height: "50px", 
                                backgroundColor: finish.color,
                                cursor: "pointer",
                                border: selectedFinish === index ? "2px solid #000" : "1px solid #ddd",
                                padding: "2px"
                            }}
                        >
                            <div className="w-100 h-100" style={{backgroundColor: finish.color}}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold small">Width</span>
                    <a href="#" className="text-muted small text-decoration-underline">Seating Guide</a>
                </div>
                <div className="d-flex gap-2">
                    {widths.map((w) => (
                        <button 
                            key={w}
                            onClick={() => setSelectedWidth(w)}
                            className={`btn rounded-0 px-4 py-2 ${selectedWidth === w ? 'btn-dark' : 'btn-outline-dark'}`}
                            style={{fontSize: "0.85rem"}}
                        >
                            {w}
                        </button>
                    ))}
                </div>
            </div>
            <div className="row g-2 mb-4">
                <div className="col-3">
                    <div className="input-group">
                        <button className="btn btn-outline-dark rounded-0 px-2" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</button>
                        <input type="text" className="form-control text-center border-dark rounded-0 px-0" value={quantity} readOnly />
                        <button className="btn btn-outline-dark rounded-0 px-2" onClick={() => setQuantity(q => q+1)}>+</button>
                    </div>
                </div>
                <div className="col-9">
                    <button 
                        className="btn btn-dark w-100 rounded-0 py-2 text-uppercase fw-bold" 
                        onClick={() => addProduct(product)}
                        style={{letterSpacing: "2px"}}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <p className="text-muted small mb-4" style={{lineHeight: "1.7"}}>
                {product.description} Embrace timeless sophistication with this piece, where sturdy, artfully turned legs and a bold design make a lasting impression. Crafted from solid hardwood, this heirloom-quality table is a testament to superior craftsmanship.
            </p>
            <div className="p-4 mb-4" style={{backgroundColor: "#F3F1EB"}}>
                <div className="row text-center">
                    <div className="col-4 border-end border-secondary">
                        <h6 className="small fw-bold mb-1" style={{fontFamily: "'Playfair Display', serif"}}>Solid Hardwood</h6>
                        <p className="mb-0" style={{fontSize: "0.65rem", lineHeight: "1.2"}}>Natural character in every grain</p>
                    </div>
                    <div className="col-4 border-end border-secondary">
                        <h6 className="small fw-bold mb-1" style={{fontFamily: "'Playfair Display', serif"}}>Made in USA</h6>
                        <p className="mb-0" style={{fontSize: "0.65rem", lineHeight: "1.2"}}>From the highest quality materials</p>
                    </div>
                    <div className="col-4">
                        <h6 className="small fw-bold mb-1" style={{fontFamily: "'Playfair Display', serif"}}>Built by Hand</h6>
                        <p className="mb-0" style={{fontSize: "0.65rem", lineHeight: "1.2"}}>Built with purpose, made for life</p>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center text-muted small">
                <i className="fa fa-truck me-2 fs-5"></i>
                <span>This item is made to order and ships in 6-8 weeks.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    if (!similarProducts || similarProducts.length === 0) return null;

    return (
      <div className="row g-4">
        {similarProducts.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="col-md-3 col-6">
              <div className="card h-100 border-0 bg-transparent text-center">
                <div className="position-relative overflow-hidden mb-3 bg-white" style={{aspectRatio: "1/1"}}>
                     <img 
                        className="img-fluid w-100 h-100 object-fit-cover" 
                        src={item.image} 
                        alt={item.title}
                     />
                     <Link to={"/product/" + item.id} className="stretched-link"></Link> 
                </div>
                <h6 className="card-title text-uppercase text-truncate fw-normal mb-1" style={{fontSize: "0.8rem", letterSpacing: "1px"}}>
                    {item.title}
                </h6>
                <p className="card-text text-muted small" style={{fontFamily: "'Playfair Display', serif"}}>${item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div style={{backgroundColor: "#fff", minHeight: "100vh"}}>
        {loading ? <Loading /> : <ShowProduct />}
        {similarProducts.length > 0 && (
            <div className="container py-5 mt-5 border-top">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h4 className="text-uppercase fw-light" style={{letterSpacing: "3px", fontSize: "1.2rem"}}>You May Also Like</h4>
                    </div>
                </div>
                {loading ? <Loading /> : <ShowSimilarProduct />}
            </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;