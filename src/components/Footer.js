import React from 'react';
import './Home.css';
import { FaGithub, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} 2025 ACE, SASTRA . All rights reserved.</p>
                <p className="footer-license">Licensed to Association Of Computing Engineers, SASTRA</p>
                <div className="social-links">
                    <a href="https://github.com/Sai-Ishaan" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="https://www.instagram.com/ace_soc_sastra/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/company/ace-sastra-soc/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="https://ace-sastra.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGlobe />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
