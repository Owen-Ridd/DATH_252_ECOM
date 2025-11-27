import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
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
        iconBtn: { border: "none", background: "transparent", fontSize: "1.2rem" },
        transition: { transition: "all 0.3s ease-in-out" }
    };

    return (
        <nav className={navbarClasses} style={styles.transition}>
            <div className="container">
                <NavLink className={`navbar-brand fw-bold fs-2 ${textColor}`} to="/" style={styles.brand}>
                    LUXURIA.
                </NavLink>
                <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        {['Home', 'Product', 'About', 'Contact'].map((item) => (
                            <li className="nav-item mx-2" key={item}>
                                <NavLink className={`nav-link ${textColor}`} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={styles.link}>
                                    {item}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="buttons text-center d-flex justify-content-center align-items-center gap-3">
                        <NavLink to="/login" className={textColor} style={styles.iconBtn}><i className="fa fa-search"></i></NavLink>
                        <NavLink to="/login" className={textColor} style={styles.iconBtn}><i className="fa fa-user"></i></NavLink>
                        <NavLink to="/cart" className={`${textColor} position-relative`} style={styles.iconBtn}>
                            <i className="fa fa-shopping-bag"></i>
                            {state.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark" style={{fontSize: '0.6rem'}}>
                                    {state.length}
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