import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AppDashboard from './pages/AppDashboard';
import AskFathom from './pages/AskFathom';
import Pricing from './pages/Pricing';
import Auth from './pages/Auth';
import Integrations from './pages/Integrations';
import Solutions from './pages/Solutions';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAppPage = location.pathname.startsWith('/app');

  const hideNavAndFooter = isAuthPage || isAppPage;

  return (
    <div className="flex flex-col min-h-screen bg-fathom-bg text-fathom-text-primary">
      {!hideNavAndFooter && <Navbar />}
      <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/solutions/teams" element={<Solutions />} />
            <Route path="/solutions/sales" element={<Solutions />} />
            <Route path="/solutions/customer-success" element={<Solutions />} />
            <Route path="/solutions/marketing" element={<Solutions />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/app" element={<AppDashboard />} />
            <Route path="/app/ask-fathom" element={<AskFathom />} />
          </Routes>
        </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
