import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UpcycleLogo } from '../Logo/UpcycleLogo';
import './PublicNavbar.css';

export default function PublicNavbar() {
    const [navScrolled, setNavScrolled] = useState(false);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const forceDark = !isLandingPage;

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoTheme = (forceDark || navScrolled) ? 'dark' : 'dark';

    return (
        <nav className={`lp-nav ${navScrolled ? 'scrolled' : ''} ${forceDark ? 'force-dark' : ''}`}>
            <Link to="/" className="lp-nav-logo" style={{ textDecoration: 'none' }}>
                <UpcycleLogo size={28} theme={logoTheme} />
            </Link>
            <div className="lp-nav-links">
                {isLandingPage ? (
                    <a href="#about-us">About Us</a>
                ) : (
                    <Link to="/#about-us">About Us</Link>
                )}
                <Link to="/marketplace">Marketplace</Link>
                <Link to="/diy">DIY</Link>
                <Link to="/epr">EPR</Link>
                <Link to="/solutions">Solutions</Link>
                <Link to="/dashboard" className="lp-nav-cta">My Dashboard</Link>
            </div>
        </nav>
    );
}
