import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PublicNavbar.css';

export default function PublicNavbar() {
    const [navScrolled, setNavScrolled] = useState(false);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`lp-nav ${navScrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="lp-nav-logo">
                <div className="lp-nav-logo-icon">♻️</div>
                PlasticToProfit
            </Link>
            <div className="lp-nav-links">
                {isLandingPage ? (
                    <a href="#about-us">About Us</a>
                ) : (
                    <Link to="/#about-us">About Us</Link>
                )}
                <Link to="/marketplace">Marketplace</Link>
                <Link to="/epr">EPR</Link>
                <Link to="/solutions">Solutions</Link>
                <Link to="/dashboard" className="lp-nav-cta">Go to My Dashboard →</Link>
            </div>
        </nav>
    );
}
