import React from "react";
import './styles-header.css';

function Header() {
    return (
        <section className="header">
                <div className="header-social-icons">
                    <a href="https://www.instagram.com" className="icon-link-header"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com" className="icon-link-header"><i className="fab fa-facebook-square"></i></a>
                </div>
                <img src="./img/logo.jpg" alt="logo" className="logo-img"></img>
                <h1 className="h1">CASA MALEWO</h1>
        </section>
    );
}

export default Header