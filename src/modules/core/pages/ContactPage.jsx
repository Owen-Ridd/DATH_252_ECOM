import React from "react";
import { Footer, Navbar } from "../../../components";

const ContactPage = () => {
  const pageStyle = {
    backgroundColor: "#FFFCFC", 
    minHeight: "100vh",
    marginTop: "80px"
  };

  const inputStyle = {
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #ccc",
    borderRadius: "0",
    padding: "15px 0",
    fontSize: "0.9rem",
    boxShadow: "none"
  };

  return (
    <>
      <div style={pageStyle}>
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
                <span className="text-uppercase text-muted fw-bold" style={{letterSpacing: "3px", fontSize: "0.75rem"}}>Get In Touch</span>
                <h1 className="display-4 my-3" style={{fontFamily: "'Playfair Display', serif"}}>We're Here to Help</h1>
                <div className="bg-dark mx-auto my-4" style={{width: "60px", height: "1px"}}></div>
                <p className="lead text-muted fw-light" style={{maxWidth: "600px", margin: "0 auto"}}>
                    Have a question about our collections or need interior design advice? Visit our showroom or send us a message below.
                </p>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
                <div className="mb-5">
                    <h4 className="mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Our Showroom</h4>
                    <div className="d-flex mb-3">
                        <i className="fa fa-map-marker-alt mt-1 me-3 text-secondary"></i>
                        <div>
                            <h6 className="fw-bold text-uppercase small mb-1" style={{letterSpacing: "1px"}}>Address</h6>
                            <p className="text-muted fw-light mb-0">123 Luxury Blvd, District 1, Ho Chi Minh City</p>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <i className="fa fa-envelope mt-1 me-3 text-secondary"></i>
                        <div>
                            <h6 className="fw-bold text-uppercase small mb-1" style={{letterSpacing: "1px"}}>Email</h6>
                            <p className="text-muted fw-light mb-0">concierge@luxuria.com</p>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <i className="fa fa-phone-alt mt-1 me-3 text-secondary"></i>
                        <div>
                            <h6 className="fw-bold text-uppercase small mb-1" style={{letterSpacing: "1px"}}>Phone</h6>
                            <p className="text-muted fw-light mb-0">+84 90 123 4567</p>
                        </div>
                    </div>
                </div>
                <div className="w-100 bg-light" style={{height: "300px", filter: "grayscale(100%) invert(0%) contrast(0.9)"}}>
                    <iframe 
                        title="Showroom Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424578333333!2d106.6983!3d10.7761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3855555555%3A0x123456789!2sSaigon!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
                <form>
                  <div className="row g-3">
                      <div className="col-md-6">
                          <div className="form-group mb-4">
                            <input type="text" className="form-control" id="Name" placeholder="Name" style={inputStyle} required />
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group mb-4">
                            <input type="email" className="form-control" id="Email" placeholder="Email" style={inputStyle} required />
                          </div>
                      </div>
                  </div>
                  <div className="form-group mb-4">
                    <input type="text" className="form-control" id="Subject" placeholder="Subject" style={inputStyle} />
                  </div>
                  <div className="form-group mb-5">
                    <textarea rows={4} className="form-control" id="Message" placeholder="Message" style={{...inputStyle, resize: "none"}} required />
                  </div>
                  <div className="text-start">
                    <button
                      className="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold"
                      type="submit"
                      style={{letterSpacing: "2px", fontSize: "0.8rem", transition: "all 0.3s ease"}}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .form-control:focus {
            border-bottom: 1px solid #000 !important;
            box-shadow: none !important;
        }
        ::placeholder {
            color: #999 !important;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
      `}</style>
    </>
  );
};

export default ContactPage;