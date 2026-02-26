import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Cart from './components/Cart/Cart';
import Dashboard from './pages/Dashboard/Dashboard';
import Marketplace from './pages/Marketplace/Marketplace';
import Rewards from './pages/Rewards/Rewards';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import Solutions from './pages/Solutions/Solutions';
import './App.css';

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
                <Route path="/solutions" element={<Solutions />} />
              </Routes>
            </div>
          </main>
          <Cart />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
