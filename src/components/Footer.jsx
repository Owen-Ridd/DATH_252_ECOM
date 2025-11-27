import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#212529",
    fontSize: "0.85rem",
    marginBottom: "12px",
    display: "block",
    transition: "color 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const headingStyle = {
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  return (
    <footer className="bg-white text-dark pt-5 pb-4 border-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-5">
            <h6 style={headingStyle}>Contact Us</h6>
            <div className="mb-4" style={{fontSize: "0.9rem", lineHeight: "1.8"}}>
              <p className="mb-1"><span className="fw-bold">Email</span> care@luxuriafurniture.com</p>
              <p className="mb-3"><span className="fw-bold">Call:</span> 479-633-7557</p>
              <p className="mb-0 fw-bold">Support Hours</p>
              <p className="mb-0">Monday-Friday</p>
              <p className="mb-3">10am – 6pm CST</p>
              <p className="fst-italic text-muted mt-4">Built for You, Made for Life.</p>
            </div>
            <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-dark fs-5"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="text-dark fs-5"><i className="fa-brands fa-pinterest"></i></a>
                <a href="#" className="text-dark fs-5"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="text-dark fs-5"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h6 style={headingStyle}>Directory</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" style={linkStyle}>About Us</Link></li>
              <li><Link to="/faq" style={linkStyle}>FAQs</Link></li>
              <li><Link to="/trade" style={linkStyle}>Trade Program</Link></li>
              <li><Link to="/promise" style={linkStyle}>The Luxuria Promise</Link></li>
              <li><Link to="/blog" style={linkStyle}>Blog</Link></li>
              <li><Link to="/standards" style={linkStyle}>Cosmetic Standards</Link></li>
              <li><Link to="/shipping" style={linkStyle}>Shipping and Delivery</Link></li>
              <li><Link to="/warranty" style={linkStyle}>Warranty</Link></li>
              <li><Link to="/terms" style={linkStyle}>Terms of Service</Link></li>
            </ul>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h6 style={headingStyle}>Stay Connected</h6>
            <p className="mb-4 text-muted" style={{fontSize: "0.9rem"}}>
                Get insider information about exclusive offers, events and more!
            </p>
            <form className="d-flex">
                <input type="email" className="form-control rounded-0 border-dark" placeholder="Your email address" style={{padding: "12px 15px", fontSize: "0.9rem"}} />
                <button type="submit" className="btn btn-dark rounded-0 text-uppercase fw-bold px-4" style={{letterSpacing: "2px", fontSize: "0.8rem"}}>Submit</button>
            </form>
          </div>
        </div>
        <div className="row mt-5 pt-4 align-items-center" style={{fontSize: "0.75rem"}}>
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} Luxuria & Co. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item mx-2"><a href="#" className="text-dark text-decoration-none">Contact Us</a></li>
                    <li className="list-inline-item text-muted">|</li>
                    <li className="list-inline-item mx-2"><a href="#" className="text-dark text-decoration-none">Privacy Policy</a></li>
                    <li className="list-inline-item text-muted">|</li>
                    <li className="list-inline-item mx-2"><a href="#" className="text-dark text-decoration-none">Shipping Policy</a></li>
                    <li className="list-inline-item text-muted">|</li>
                    <li className="list-inline-item mx-2"><a href="#" className="text-dark text-decoration-none">Accessibility</a></li>
                </ul>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;