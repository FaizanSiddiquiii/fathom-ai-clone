import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// --- New Sections ---
import CaptureModes from '../components/home/CaptureModes';
import LiveSummary from '../components/home/LiveSummary';
import AskFathomSection from '../components/home/AskFathomSection';
import ChatGPTClaudeSection from '../components/home/ChatGPTClaudeSection';
import IntegrationsEcosystem from '../components/home/IntegrationsEcosystem';
import FAQSection from '../components/home/FAQSection';

// --- Background Starfield ---
const Starfield = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fathom-blue/10 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 opacity-40 starfield-bg"></div>
    </div>
  );
};

// --- Fathom Feature Slider (Carousel) ---
const FeatureSlider = () => {
  const [idx, setIdx] = useState(0);
  
  const slides = [
    {
      text: "Capture notes your way – bot or no bot – so you can stay focused on the meeting",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aaede7376e9ec5c6b3d_69de69257342cfaefbbaa833_carousel-1%20(1).avif"
    },
    {
      text: "AI summaries instantly available after your call",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aada78e00c5b32a3be5_69de69251b2c5b7bf83e2782_carousel-2%20(1).avif"
    },
    {
      text: "Your meeting data, now inside ChatGPT, Claude, and more",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aad2bc1acfbab6c28e3_69de69250339682ae143b06f_2fea00bf2345f814c9c9ae7e9c945e9a_carousel-3%20(1).avif"
    },
    {
      text: "Automatically monitor key topics so you never miss critical moments",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aad65aea1ac0ef96998_69de69257d2e8b183dfdb058_carousel-4%20(1).avif"
    }
  ];

  return (
    <div className="py-20 relative z-10 mx-auto max-w-7xl px-6">
      <div className="max-w-4xl mx-auto text-center mb-10 min-h-[80px] flex items-center justify-center">
         <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-4xl font-medium leading-tight text-white/90"
            >
              {slides[idx].text}
            </motion.p>
         </AnimatePresence>
      </div>

      <div className="relative aspect-[16/10] md:aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-10 bg-[#0f0f0f]">
        <AnimatePresence mode="wait">
           <motion.img
              key={idx}
              src={slides[idx].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-contain"
           />
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6">
        <button onClick={() => setIdx(prev => (prev === 0 ? slides.length - 1 : prev - 1))} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={cn("w-2.5 h-2.5 rounded-full transition-colors", idx === i ? "bg-fathom-yellow" : "bg-white/20")} />
          ))}
        </div>
        <button onClick={() => setIdx(prev => (prev === slides.length - 1 ? 0 : prev + 1))} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// --- Testimonial Carousel ---
const TestimonialCarousel = () => {
  const [idx, setIdx] = useState(0);
  const testimonials = [
    { quote: "Fathom has completely transformed our sales process. We don't worry about notes anymore, we just sell.", name: "Sarah Jenkins", role: "VP of Sales", company: "HubSpot" },
    { quote: "The AI summaries are frighteningly accurate. It saves each of our PMs about 5 hours a week in documentation.", name: "Marcus Lowe", role: "Product Lead", company: "Reddit" },
    { quote: "We evaluated every AI note taker on the market. Fathom's integrations and accuracy made it the clear winner.", name: "Elena Rodriguez", role: "RevOps Manager", company: "Gusto" }
  ];

  return (
    <div className="py-32 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Quote className="w-12 h-12 text-white/10 mx-auto mb-8" />
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-3xl md:text-4xl font-medium leading-tight mb-8 text-white/90">"{testimonials[idx].quote}"</p>
            <div>
              <p className="font-bold text-white text-lg">{testimonials[idx].name}</p>
              <p className="text-white/50">{testimonials[idx].role}, {testimonials[idx].company}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center items-center gap-4">
          <button onClick={() => setIdx(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={cn("w-2 h-2 rounded-full transition-colors", idx === i ? "bg-white" : "bg-white/20")} />
            ))}
          </div>
          <button onClick={() => setIdx(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="pt-24 relative flex-1 flex flex-col">
      <Starfield />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-10 lg:pb-20 z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="mx-auto max-w-[1400px] w-full px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
            
            {/* Left Content */}
            <div className="flex-1 text-left lg:max-w-[45%] z-20">
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] font-medium tracking-tight text-white mb-6">
                AI notetaking that is<br />out of this world
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed font-light">
                Fathom summarizes your meetings so you can focus on the conversation.
                <strong className="text-white font-medium ml-1">Now available bot-free.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Button href="/signup" className="bg-[#00b4f0] hover:bg-[#00b4f0]/90 text-black text-[13px] font-bold px-8 py-5 rounded-full uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,180,240,0.3)]">
                  Get started - free forever
                </Button>
              </div>

              {/* Compliance */}
              <div className="mt-8 flex items-center gap-3 text-[11px] text-white/50 font-medium uppercase tracking-widest">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <div className="flex flex-wrap gap-2 items-center">
                  <span>SOC 2 Type II</span>
                  <span className="text-white/20">|</span>
                  <span>GDPR</span>
                  <span className="text-white/20">|</span>
                  <span>HIPAA Compliant</span>
                  <span className="text-white/20">|</span>
                  <span>SSO / SCIM</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="flex-1 w-full relative flex justify-center lg:justify-end mt-12 lg:mt-0 z-10">
              <img 
                src="https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aae186955014cec4283_69decfaf990e574c8859da7e_hero%20(1).avif" 
                alt="Fathom Product UI" 
                className="w-[120%] max-w-none lg:w-[130%] h-auto relative object-contain right-0 lg:-right-20 pointer-events-none"
              />
            </div>

          </div>

          {/* Social Proof (bottom bar) */}
          <div className="mt-20 lg:mt-24 pt-8 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 relative z-20">
            <div className="flex items-center gap-6 shrink-0">
                <div className="flex flex-col items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 85a35 35 0 1 1 0-70 35 35 0 0 1 0 70zm9-23H41v-7h18v7zm16-16H25v-7h50v7zm-8-16H33v-7h34v7z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-[#f5c518] text-lg mb-1">
                      ★★★★★ <span className="text-white font-bold ml-2">5.0<span className="text-white/50 font-normal">/5.0</span></span>
                  </div>
                  <p className="text-xs text-white/60 font-medium">#1 rated - 6,500+ reviews</p>
                </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end gap-6 w-full flex-wrap lg:flex-nowrap">
                <p className="text-xs font-bold text-white/50 text-right leading-tight hidden md:block shrink-0">Used at<br/>300K+<br/>companies</p>
                <div className="flex items-center gap-3 md:gap-4 shrink-0 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto justify-center lg:justify-start" style={{ scrollbarWidth: 'none' }}>
                  <div className="h-16 flex items-center justify-center px-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-bold text-sm">HubSpot</span>
                  </div>
                  <div className="h-16 flex items-center justify-center px-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-bold text-sm">Adobe</span>
                  </div>
                  <div className="h-16 flex items-center justify-center px-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-bold text-sm">_zapier</span>
                  </div>
                  <div className="h-16 flex items-center justify-center px-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-bold text-sm">GRUBHUB</span>
                  </div>
                  <div className="h-16 flex items-center justify-center px-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-bold text-sm text-center">EA</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Slider */}
      <FeatureSlider />

      {/* Never miss what matters */}
      <LiveSummary />

      {/* Capture on your terms */}
      <CaptureModes />

      {/* Turn every meeting into answers */}
      <AskFathomSection />

      {/* ChatGPT & Claude */}
      <ChatGPTClaudeSection />

      {/* Ecosystem */}
      <IntegrationsEcosystem />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* FAQ */}
      <FAQSection />

      {/* Footer CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="mx-auto max-w-3xl px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Ready to upgrade your meetings?</h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 font-light">Join 300K+ companies who have stopped taking notes.</p>
            <Button variant="gradient" size="lg" href="/signup" className="text-xl font-bold px-14 py-6 rounded-2xl shadow-[0_0_40px_rgba(110,86,207,0.3)] hover:scale-105 transition-transform">
              Get Started for Free
            </Button>
         </div>
      </section>
    </div>
  );
}
