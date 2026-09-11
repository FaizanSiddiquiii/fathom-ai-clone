import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function CaptureModes() {
  const [activeTab, setActiveTab] = useState(0);

  const modes = [
    {
      title: "Audio + Video",
      headline: "Capture every detail",
      desc: "Record the entire meeting including screen shares, webcams, and crystal-clear audio so you never lose context.",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aae186955014cec4283_69decfaf990e574c8859da7e_hero%20(1).avif" // using available hero image as placeholder for video capture
    },
    {
      title: "Audio + Transcript",
      headline: "Crystal clear audio",
      desc: "Perfect for phone calls or when video isn't necessary. Get a perfect transcript mapped directly to the audio recording.",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aada78e00c5b32a3be5_69de69251b2c5b7bf83e2782_carousel-2%20(1).avif" // using summary image
    },
    {
      title: "Transcript Only",
      headline: "Bot-free discretion",
      desc: "Get all the benefits of AI notes without a recording or a bot joining the call. Completely invisible to other participants.",
      image: "https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aad65aea1ac0ef96998_69de69257d2e8b183dfdb058_carousel-4%20(1).avif" // using transcript image
    }
  ];

  return (
    <section className="py-32 relative z-10 mx-auto max-w-7xl px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Capture on your terms</h2>
        <p className="text-lg text-white/60">Choose exactly how much context you need for every meeting.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Tabs */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {modes.map((mode, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "text-left p-6 rounded-2xl transition-all duration-300 border",
                activeTab === idx 
                  ? "bg-white/10 border-white/20 shadow-lg shadow-fathom-cyan/10" 
                  : "bg-transparent border-transparent hover:bg-white/5"
              )}
            >
              <h3 className={cn(
                "text-xl font-bold mb-2 transition-colors",
                activeTab === idx ? "text-fathom-cyan" : "text-white/80"
              )}>
                {mode.title}
              </h3>
              <p className={cn(
                "text-sm transition-colors",
                activeTab === idx ? "text-white/90" : "text-white/50"
              )}>
                {mode.headline}
              </p>
            </button>
          ))}
        </div>

        {/* Right Side: Visual */}
        <div className="w-full lg:w-2/3">
          <div className="relative aspect-[16/10] bg-[#0f0f0f] rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col justify-center"
              >
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{modes[activeTab].headline}</h4>
                  <p className="text-white/70 max-w-lg">{modes[activeTab].desc}</p>
                </div>
                <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-white/5 relative">
                  <img src={modes[activeTab].image} alt={modes[activeTab].title} className="absolute inset-0 w-full h-full object-cover object-left-top opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
