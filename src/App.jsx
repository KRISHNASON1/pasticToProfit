import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Cart from './components/Cart/Cart';
import Dashboard from './pages/Dashboard/Dashboard';
import Marketplace from './pages/Marketplace/Marketplace';
import Rewards from './pages/Rewards/Rewards';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const isMarketplace = location.pathname === '/marketplace';

  // Marketplace gets its own full-screen layout without sidebar
  if (isMarketplace) {
    return (
      <div className="app-layout app-fullscreen">
        <Marketplace />
        <Cart />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="main-inner">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
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
          <Route path="/marketplace" element={
            <div className="app-layout app-fullscreen">
              <Marketplace />
              <Cart />
            </div>
          } />
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
