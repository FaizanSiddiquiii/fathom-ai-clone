import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Check session storage on mount so it stays dismissed during the session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('fathom_banner_dismissed') === 'true';
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('fathom_banner_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#6E56CF] to-[#E93D82] text-black w-full py-2.5 px-4 md:px-12 flex flex-col xl:flex-row items-center justify-center gap-3 xl:gap-6 text-center relative z-50">
            <p className="text-[11px] md:text-xs font-bold tracking-widest uppercase truncate lg:whitespace-normal">
              IT'S A WHOLE NEW ORBIT. ANNOUNCING BOT-FREE CAPTURE, A NEW DESKTOP APP, CHATGPT & CLAUDE INTEGRATIONS & MORE
            </p>
            <a 
              href="/whats-new" 
              className="inline-block bg-black/20 text-black text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full hover:bg-black/30 transition-colors tracking-widest whitespace-nowrap"
            >
              SEE WHAT'S NEW
            </a>
            
            <button 
              onClick={handleDismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/20 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
