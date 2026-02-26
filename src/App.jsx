import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <div className="main-inner">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/support" element={<Support />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
          <Cart />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}