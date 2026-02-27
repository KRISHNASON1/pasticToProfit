import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Cart from './components/Cart/Cart';
import Dashboard from './pages/Dashboard/Dashboard';
import Marketplace from './pages/Marketplace/Marketplace';
import Rewards from './pages/Rewards/Rewards';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Solutions from './pages/Solutions/Solutions';
import EPR from './pages/EPR/EPR';
import DIY from './pages/DIY/DIY';
import Earn from './pages/Earn/Earn';
import PublicNavbar from './components/PublicNavbar/PublicNavbar';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage/LandingPage';
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

/* Protected route wrapper — redirects to /login if not authenticated */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< branch1
      <CartProvider>
        <Routes>
          {/* Public landing page — with navbar, no sidebar */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/diy" element={<PublicLayout><DIY /></PublicLayout>} />
          <Route path="/earn" element={<PublicLayout><Earn /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
          <Route path="/epr" element={<PublicLayout><EPR /></PublicLayout>} />
=======
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public landing page — with navbar, no sidebar */}
            <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />

            {/* Public pages with navbar only */}
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
            <Route path="/epr" element={<PublicLayout><EPR /></PublicLayout>} />
>>>>>>> branch1

            {/* Marketplace — navbar + cart, no sidebar */}
            <Route path="/marketplace" element={<MarketplaceLayout><Marketplace /></MarketplaceLayout>} />

            {/* Internal app pages — sidebar + cart (protected) */}
            <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
            <Route path="/rewards" element={<ProtectedRoute><AppLayout><Rewards /></AppLayout></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><AppLayout><Support /></AppLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}