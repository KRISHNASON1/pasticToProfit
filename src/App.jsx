import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Cart from './components/Cart/Cart';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Analytics/Analytics';
import Rewards from './pages/Rewards/Rewards';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Solutions from './pages/Solutions/Solutions';
import EPR from './pages/EPR/EPR';
import PublicNavbar from './components/PublicNavbar/PublicNavbar';
import './App.css';

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const finishTimer = setTimeout(() => onFinish(), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? 'splash-fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-icon">♻️</div>
        <h1 className="splash-title">PlasticToProfit</h1>
        <p className="splash-tagline">Circular Economy Platform</p>
      </div>
    </div>
  );
}

/* App shell with sidebar + cart (the internal platform) */
function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="main-inner">
          {children}
        </div>
      </main>
      <Cart />
    </div>
  );
}

/* Public wrapper with shared navbar */
function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <PublicNavbar />
      {children}
    </div>
  );
}

/* Marketplace Layout — no sidebar, with Public Navbar and Cart */
function MarketplaceLayout({ children }) {
  return (
    <div className="app-layout">
      <PublicNavbar />
      <main className="main-content" style={{ marginLeft: 0, padding: 0 }}>
        <div className="main-inner" style={{ borderRadius: 0, marginTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
          {children}
        </div>
      </main>
      <Cart />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public pages — full-width with shared Navbar */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
          <Route path="/epr" element={<PublicLayout><EPR /></PublicLayout>} />
          <Route path="/login" element={<Login />} />

          {/* Internal platform — sidebar layout */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/rewards" element={<AppLayout><Rewards /></AppLayout>} />
          <Route path="/support" element={<AppLayout><Support /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />

          {/* Hybrid layout — Marketplace has no sidebar but has Cart and Public Navbar */}
          <Route path="/marketplace" element={<MarketplaceLayout><Marketplace /></MarketplaceLayout>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}