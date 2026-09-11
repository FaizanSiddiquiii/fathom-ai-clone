import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBanner from './AnnouncementBanner';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col",
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <AnnouncementBanner />
      <div className="mx-auto w-full max-w-7xl px-6 py-4">
        <nav className="flex items-center justify-between glass-panel rounded-full px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50 relative group">
            <span className="text-[22px] font-bold tracking-[0.15em] text-white group-hover:text-white/90 transition-colors uppercase">
              FATHOM
            </span>
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 -mt-1">
              <path d="M20 50 V80 A 12 12 0 0 0 44 80 V60 Z" fill="#0073a8"/>
              <rect x="20" y="20" width="70" height="24" rx="12" transform="rotate(25 20 20)" fill="#00b4f0"/>
              <rect x="20" y="55" width="55" height="24" rx="12" transform="rotate(25 20 55)" fill="#00b4f0"/>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Overview
            </Link>
            
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors pb-1 border-b-2 border-transparent">
                Solutions <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-xl z-50 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <Link to="/solutions/customer-success" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">For customer success</Link>
                <Link to="/solutions/marketing" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">For marketing</Link>
                <Link to="/solutions/sales" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">For sales</Link>
                <Link to="/solutions/teams" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">For teams</Link>
              </div>
            </div>
            
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors pb-1 border-b-2 border-transparent">
                Integrations <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-xl z-50 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <Link to="/integrations/asana" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Asana</Link>
                <Link to="/integrations/chatgpt" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">ChatGPT</Link>
                <Link to="/integrations/claude" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Claude</Link>
                <Link to="/integrations/hubspot" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">HubSpot</Link>
                <Link to="/integrations/salesforce" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Salesforce</Link>
                <Link to="/integrations/zapier" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Zapier</Link>
                <Link to="/integrations" className="block px-4 py-2 text-sm font-bold text-fathom-cyan hover:text-white hover:bg-white/5 rounded-lg border-t border-white/10 mt-1 pt-3">See All Integrations →</Link>
              </div>
            </div>
            
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors pb-1 border-b-2 border-transparent">
                Resources <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-xl z-50 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <Link to="/whats-new" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">What's New</Link>
                <Link to="/resource-hub" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Resource Hub</Link>
                <Link to="/partner-programs" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg">Partner with Fathom</Link>
              </div>
            </div>
            
            <Link to="/pricing" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Book a Demo
            </Link>
            <div className="flex items-center gap-5 ml-6 pl-6 border-l border-white/10">
              <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Log In</Link>
              <Button variant="outline" size="sm" href="/signup" className="text-xs font-bold border-[#00b4f0] text-[#00b4f0] hover:bg-[#00b4f0]/10 uppercase tracking-widest px-6 py-2.5">
                SIGN UP FREE
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white/90 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 z-40 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Overview</Link>
              <Link to="/solutions" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Solutions</Link>
              <Link to="/integrations" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Integrations</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Pricing</Link>
              
              <div className="h-px bg-white/10 w-full my-2"></div>
              
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Log In</Link>
              <Button variant="gradient" size="lg" href="/signup" className="w-full text-center">
                Sign Up Free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
