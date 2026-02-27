import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Cart from './components/Cart/Cart';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Marketplace from './pages/Marketplace/Marketplace';
import Rewards from './pages/Rewards/Rewards';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import Solutions from './pages/Solutions/Solutions';
import EPR from './pages/EPR/EPR';
import DIY from './pages/DIY/DIY';
import PublicNavbar from './components/PublicNavbar/PublicNavbar';
import PublicLayout from './components/PublicLayout';
import './App.css';

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

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public pages — full-width with shared Navbar */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/diy" element={<PublicLayout><DIY /></PublicLayout>} />
          <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
          <Route path="/epr" element={<PublicLayout><EPR /></PublicLayout>} />

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