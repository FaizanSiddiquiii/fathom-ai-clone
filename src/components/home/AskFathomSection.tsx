import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, User, FileText, ChevronRight } from 'lucide-react';

export default function AskFathomSection() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Phase 0: Initial
      await new Promise(r => setTimeout(r, 1000));
      setPhase(1); // Searching
      await new Promise(r => setTimeout(r, 2000));
      setPhase(2); // Generating
      await new Promise(r => setTimeout(r, 1500));
      setPhase(3); // Result + Sources
      
      // Loop back after a long pause
      await new Promise(r => setTimeout(r, 6000));
      setPhase(0);
    };
    
    sequence();
  }, [phase]);

  return (
    <section className="py-32 relative z-10 mx-auto max-w-[1200px] px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">Turn every meeting<br/>into answers</h2>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">Ask Fathom anything across your entire meeting history. It synthesizes insights from hundreds of conversations in seconds.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#121212] rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(110,86,207,0.15)] overflow-hidden">
        <div className="p-8 flex flex-col gap-8 min-h-[400px]">
          
          {/* User Input */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-white/70" />
            </div>
            <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl rounded-tl-sm px-6 py-4">
              <p className="text-lg text-white font-medium">What were the biggest objections from enterprise customers this month?</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.div 
                key="searching"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-white/30 animate-pulse" />
                </div>
                <div className="pt-2">
                  <p className="text-sm text-white/40 italic flex items-center gap-2">
                    Searching meeting knowledge...
                  </p>
                </div>
              </motion.div>
            )}

            {(phase === 2 || phase === 3) && (
              <motion.div 
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fathom-purple to-fathom-cyan flex items-center justify-center shrink-0 shadow-lg shadow-fathom-cyan/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="text-white/90 leading-relaxed text-lg">
                    {phase === 2 ? (
                      <span className="flex items-center gap-2">
                        Synthesizing insights... <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5 }}>|</motion.span>
                      </span>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        Based on 14 enterprise meetings this month, the three main objections were:
                        <ul className="list-disc pl-5 mt-4 space-y-2">
                          <li><strong>Security and Compliance:</strong> 6 prospects requested detailed SOC2 mapping before proceeding.</li>
                          <li><strong>Integration timeline:</strong> Concerns about how long the Salesforce bidirectional sync takes to implement.</li>
                          <li><strong>Pricing tiers:</strong> Pushback on the minimum seat requirement for the Enterprise plan.</li>
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {phase === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border-t border-white/10 pt-4"
                    >
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-3">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {['Acme Corp Demo', 'Stark Ind Pricing Review', 'Wayne Ent Security Call'].map((source, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                            <FileText className="w-3.5 h-3.5 text-fathom-cyan" />
                            <span className="text-xs text-white/70 group-hover:text-white">{source}</span>
                            <ChevronRight className="w-3 h-3 text-white/30" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
