import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cartItems = useSelector(state => state.cart);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarClasses = `navbar navbar-expand-lg fixed-top py-3 transition-all ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`;

    const textColor = scrolled ? 'text-dark' : 'text-dark';

    const styles = {
        brand: { fontFamily: "'Playfair Display', serif", letterSpacing: "2px" },
        link: { fontFamily: "'Lato', sans-serif", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" },
        iconBtn: { border: "none", background: "transparent", fontSize: "1.2rem", cursor: "pointer" },
        transition: { transition: "all 0.3s ease-in-out" }
    };

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Products", path: "/product" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
    ];

    return (
        <nav className={navbarClasses} style={styles.transition}>
            <div className="container">
                <NavLink className={`navbar-brand fw-bold fs-2 ${textColor}`} to="/" style={styles.brand}>
                    LUXURIA.
                </NavLink>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        {navLinks.map((link) => (
                            <li className="nav-item mx-2" key={link.title}>
                                <NavLink
                                    className={`nav-link ${textColor}`}
                                    to={link.path}
                                    style={styles.link}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="buttons text-center d-flex justify-content-center align-items-center gap-3">
                        
                        <NavLink to="/product" className={textColor} style={styles.iconBtn} title="Search Products">
                            <i className="fa fa-search"></i>
                        </NavLink>

                        <div className="nav-item dropdown d-inline-block">
                            <a 
                                className={`nav-link dropdown-toggle ${textColor}`} 
                                href="#" 
                                id="userDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                style={styles.iconBtn}
                            >
                                <i className="fa fa-user"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-0" aria-labelledby="userDropdown" style={{minWidth: "220px"}}>
                                <li>
                                    <NavLink className="dropdown-item py-3 px-4 border-bottom" to="/profile">
                                        <i className="fa fa-user-circle me-2 text-muted"></i> My Account
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item py-3 px-4 border-bottom" to="/wishlist">
                                        <i className="fa fa-heart me-2 text-muted"></i> My Wishlist
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item py-3 px-4 text-danger" to="/login">
                                        <i className="fa fa-sign-in-alt me-2"></i> Login / Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <NavLink to="/cart" className={`${textColor} position-relative`} style={styles.iconBtn} title="Shopping Cart">
                            <i className="fa fa-shopping-bag"></i>
                            {cartItems && cartItems.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark" style={{ fontSize: '0.6rem' }}>
                                    {cartItems.length}
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;