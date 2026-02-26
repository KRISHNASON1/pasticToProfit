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
import './App.css';

/* App shell with sidebar + cart (the internal platform) */
function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="main-inner">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
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
          {/* Public landing page — full-width, no sidebar */}
          <Route path="/" element={<LandingPage />} />

          {/* Internal platform — sidebar layout */}
          <Route path="/app/*" element={<AppLayout />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
