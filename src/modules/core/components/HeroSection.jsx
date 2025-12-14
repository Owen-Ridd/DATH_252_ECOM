import React from "react";

const Main = () => {
  const collections = [
    {
      id: 1,
      year: "New Arrival 2025",
      title: "The Emerald Edition",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
      position: "center bottom"
    },
    {
      id: 2,
      year: "Autumn Stories",
      title: "Minimalist Living",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
      position: "center center"
    },
    {
      id: 3,
      year: "Signature Series",
      title: "Royal Comfort",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2074&auto=format&fit=crop",
      position: "center center"
    }
  ];

  const handleScrollDown = () => {
    const element = document.getElementById("products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hero-container position-relative" style={{ height: "100vh", width: "100%" }}>
        <div id="heroCarousel" className="carousel slide carousel-fade h-100" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators mb-5">
            {collections.map((item, index) => (
               <button 
                 key={index}
                 type="button" 
                 data-bs-target="#heroCarousel" 
                 data-bs-slide-to={index} 
                 className={index === 0 ? "active" : ""} 
                 aria-current={index === 0 ? "true" : "false"} 
                 aria-label={`Slide ${index + 1}`}
               ></button>
            ))}
          </div>
          <div className="carousel-inner h-100">
            {collections.map((item, index) => (
              <div key={item.id} className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}>
                <div 
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: item.position,
                    backgroundRepeat: "no-repeat"
                  }}
                >
                    <div className="container h-100 position-relative">
                         <div className="position-absolute start-50 translate-middle-x text-center w-100" style={{top: "15%"}}>
                            <h6 className="text-uppercase text-muted mb-2 tracking-wide animate-fade-down">
                                {item.year}
                            </h6>
                            <h1 className="display-2 text-dark animate-fade-up" 
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {item.title}
                            </h1>
                            <div className="bg-dark mx-auto mt-4" style={{width: "60px", height: "1px"}}></div>
                         </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev opacity-50" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next opacity-50" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-center z-3">
            <p className="mb-2 fw-bold text-uppercase small text-secondary tracking-wide">
               Discover Collection
            </p>
            <div onClick={handleScrollDown} style={{ cursor: "pointer" }} className="animate-bounce">
               <i className="fa fa-chevron-down fs-4 text-dark opacity-75"></i>
            </div>
        </div>
      </div>
      <style jsx>{`
        .tracking-wide { letter-spacing: 5px; font-size: 0.8rem; font-family: 'Lato', sans-serif; }
        .carousel-item.active .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .carousel-item.active .animate-fade-down { animation: fadeDown 1s ease-out forwards; }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
        }
        .animate-bounce { animation: bounce 2s infinite; }
      `}</style>
    </>
  );
};

export default Main;