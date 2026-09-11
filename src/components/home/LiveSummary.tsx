import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveSummary() {
  const [step, setStep] = useState(0);

  const summarySteps = [
    "Summary",
    "Project timeline discussed",
    "Customer feedback reviewed",
    "Pricing concern identified",
    "Action item created"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % summarySteps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [summarySteps.length]);

  return (
    <section className="py-32 relative z-10 mx-auto max-w-[1400px] px-6">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Never miss what matters</h2>
        <p className="text-lg text-white/60">Fathom generates a live summary and action items while you speak, perfectly synchronized with your recording.</p>
      </div>

      <div className="relative aspect-video max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212] flex flex-col">
        {/* Fake Top Bar */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold text-white/70">REC 12:04</span>
          </div>
          <div className="text-sm font-medium text-white/80">Weekly Sync - Product Team</div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border border-[#121212]"></div>
              <div className="w-6 h-6 rounded-full bg-green-500 border border-[#121212]"></div>
              <div className="w-6 h-6 rounded-full bg-purple-500 border border-[#121212]"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Video Area */}
          <div className="flex-1 p-6 flex flex-col justify-end bg-gradient-to-t from-[#0a0a0a] to-transparent relative">
            <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/6899da9beccbdbe92be49b5d/6a906aada78e00c5b32a3be5_69de69251b2c5b7bf83e2782_carousel-2%20(1).avif')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Speaker: Sarah (Product)</h3>
              <p className="text-white/80 max-w-xl text-lg">
                "So regarding the pricing concern from last week, I think we should offer a longer trial period instead of a direct discount. It maintains our value perception while giving them time to evaluate."
              </p>
            </div>
          </div>

          {/* Right Sidebar - Live Summary & Scratchpad */}
          <div className="w-80 border-l border-white/10 bg-[#0a0a0a] flex flex-col">
            <div className="p-4 border-b border-white/10 flex gap-4">
              <button className="text-sm font-bold text-fathom-cyan border-b-2 border-fathom-cyan pb-1">Live Summary</button>
              <button className="text-sm font-bold text-white/50 hover:text-white/80 pb-1">Scratchpad</button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
              <AnimatePresence>
                {summarySteps.map((s, i) => (
                  i <= step && (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white/90 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-white/40 font-mono">12:0{i}</span>
                        {i === summarySteps.length - 1 && <span className="text-[10px] bg-fathom-purple/20 text-fathom-purple px-1.5 py-0.5 rounded uppercase font-bold">Action</span>}
                      </div>
                      {s}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              {step < summarySteps.length - 1 && (
                <div className="flex items-center gap-2 text-white/40 text-xs mt-2 italic">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-fathom-cyan"
                  />
                  Fathom is listening...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
