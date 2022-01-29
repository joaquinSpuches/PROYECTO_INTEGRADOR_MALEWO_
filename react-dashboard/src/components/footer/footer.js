import React from "react";
import './styles-footer.css';

function Footer() {
    return (
        <div className='footer'>
            <section>
                <div className="style-bar2"></div>
            </section>
            <section className="footer-icons">
                <div>
                    <a href="https://www.instagram.com" className="icon-link-footer"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com" className="icon-link-footer"><i className="fab fa-facebook-square"></i></a>
                </div>
            </section>
            <section className="footer-info">
                <div className="casa-malewo">
                    <h4>CASA MALEWO</h4>
                    <ul className="footer-list">
                        <li>productos</li>
                        <li>nosotros</li>
                        <li>blog</li>
                    </ul>
                </div>
                <div className="contacto">
                    <h4 className="contact-header">CONTACTO</h4>
                    <ul className="footer-list">
                        <li><i className="fas fa-phone-alt"> </i> 4855 7679</li>
                        <li><i className="fab fa-whatsapp"> </i> +54 115896 3652</li>
                        <li><i className="far fa-envelope"> </i> info@casamalewo.com</li>
                    </ul>
                </div>
            </section>
            <section>
                <p>todos los derechos reservados MALEWO® 2021</p>
            </section>
        </div>
    );
}

export default Footer