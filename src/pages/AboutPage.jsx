import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const pageStyle = {
    backgroundColor: "#FFFCFC",
    minHeight: "100vh",
    marginTop: "80px"
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
               <div className="position-relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Our Studio" 
                    className="img-fluid w-100"
                    style={{objectFit: "cover", height: "500px", filter: "brightness(0.9)"}}
                  />
                  <div className="position-absolute bottom-0 end-0 p-4 text-white text-end">
                      <h2 style={{fontFamily: "'Playfair Display', serif", fontStyle: "italic"}}>Luxuria.</h2>
                      <p className="small text-uppercase mb-0" style={{letterSpacing: "2px"}}>Est. 2024</p>
                  </div>
               </div>
            </div>
            <div className="col-md-6 px-md-5">
              <span className="text-uppercase text-muted fw-bold" style={{letterSpacing: "3px", fontSize: "0.75rem"}}>Who We Are</span>
              <h1 className="display-4 my-3" style={{fontFamily: "'Playfair Display', serif"}}>Crafting Your <br/>Perfect Sanctuary</h1>
              <div className="bg-dark mb-4" style={{width: "60px", height: "2px"}}></div>
              <p className="lead text-muted fw-light mb-4" style={{lineHeight: "1.8"}}>
                At Luxuria, we believe that furniture is not just about filling a space—it's about creating a feeling. Born from a passion for timeless design and sustainable craftsmanship, we curate pieces that tell a story.
              </p>
              <p className="text-muted fw-light mb-5" style={{lineHeight: "1.8", fontSize: "0.95rem"}}>
                Our journey began with a simple mission: to bridge the gap between modern aesthetics and enduring quality. Every sofa, table, and lamp in our collection is hand-picked to ensure it meets our rigorous standards of beauty and durability. We don't just sell furniture; we help you build the backdrop for your life's most cherished moments.
              </p>
              <Link to="/contact" className="btn btn-outline-dark rounded-0 px-4 py-2 text-uppercase" style={{letterSpacing: "1px", fontSize: "0.8rem"}}>
                  Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="py-5" style={{backgroundColor: "#F8F9FA"}}>
            <div className="container">
                <div className="row text-center g-4">
                    <div className="col-md-4">
                        <div className="p-3">
                            <i className="fa fa-leaf fs-3 mb-3 text-secondary"></i>
                            <h5 style={{fontFamily: "'Playfair Display', serif"}}>Sustainable Sourcing</h5>
                            <p className="text-muted small fw-light px-4">We prioritize eco-friendly materials and responsible manufacturing processes to protect our planet.</p>
                        </div>
                    </div>
                    <div className="col-md-4 border-start border-end">
                        <div className="p-3">
                            <i className="fa fa-gem fs-3 mb-3 text-secondary"></i>
                            <h5 style={{fontFamily: "'Playfair Display', serif"}}>Premium Quality</h5>
                            <p className="text-muted small fw-light px-4">From solid hardwoods to italian leathers, we use only the finest materials for lasting elegance.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3">
                            <i className="fa fa-pencil-ruler fs-3 mb-3 text-secondary"></i>
                            <h5 style={{fontFamily: "'Playfair Display', serif"}}>Artisan Design</h5>
                            <p className="text-muted small fw-light px-4">Each piece is crafted with attention to detail, blending modern trends with timeless techniques.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container my-5 py-5">
          <div className="text-center mb-5">
             <span className="text-uppercase text-muted" style={{letterSpacing: "2px", fontSize: "0.8rem"}}>Explore</span>
             <h2 className="display-5" style={{fontFamily: "'Playfair Display', serif"}}>Our Collections</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="card h-100 border-0 bg-transparent text-center group-hover-parent">
                <div className="position-relative overflow-hidden mb-3" style={{height: "250px"}}>
                   <img className="img-fluid w-100 h-100 object-fit-cover transition-transform" 
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" 
                        alt="Living Room" 
                        style={{transition: "transform 0.6s ease"}}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                   />
                   <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 opacity-0 hover-opacity-100 transition-opacity">
                      <Link to="/products" className="btn btn-light rounded-0 text-uppercase small" style={{letterSpacing: "1px"}}>View All</Link>
                   </div>
                </div>
                <h5 className="card-title fw-normal" style={{fontFamily: "'Playfair Display', serif"}}>Living Room</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card h-100 border-0 bg-transparent text-center">
                <div className="position-relative overflow-hidden mb-3" style={{height: "250px"}}>
                   <img className="img-fluid w-100 h-100 object-fit-cover transition-transform" 
                        src="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop" 
                        alt="Dining" 
                        style={{transition: "transform 0.6s ease"}}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                   />
                </div>
                <h5 className="card-title fw-normal" style={{fontFamily: "'Playfair Display', serif"}}>Dining</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card h-100 border-0 bg-transparent text-center">
                <div className="position-relative overflow-hidden mb-3" style={{height: "250px"}}>
                   <img className="img-fluid w-100 h-100 object-fit-cover transition-transform" 
                        src="https://images.unsplash.com/photo-1505693416381-b7c3c41faa19?q=80&w=2069&auto=format&fit=crop" 
                        alt="Bedroom" 
                        style={{transition: "transform 0.6s ease"}}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                   />
                </div>
                <h5 className="card-title fw-normal" style={{fontFamily: "'Playfair Display', serif"}}>Bedroom</h5>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card h-100 border-0 bg-transparent text-center">
                <div className="position-relative overflow-hidden mb-3" style={{height: "250px"}}>
                   <img className="img-fluid w-100 h-100 object-fit-cover transition-transform" 
                        src="https://images.unsplash.com/photo-1513506003013-d53163215b42?q=80&w=2070&auto=format&fit=crop" 
                        alt="Decor" 
                        style={{transition: "transform 0.6s ease"}}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                   />
                </div>
                <h5 className="card-title fw-normal" style={{fontFamily: "'Playfair Display', serif"}}>Lighting & Decor</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .hover-opacity-100:hover { opacity: 1 !important; }
        .transition-opacity { transition: opacity 0.3s ease-in-out; }
      `}</style>
    </>
  )
}

export default AboutPage;