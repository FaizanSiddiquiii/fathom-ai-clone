import { motion } from 'framer-motion';

export default function ChatGPTClaudeSection() {
  return (
    <section className="py-32 relative z-10 mx-auto max-w-7xl px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
            Bring your meetings to<br/>
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-bold">ChatGPT</span> & <span className="bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent font-bold">Claude</span>
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl">
            Fathom injects your meeting knowledge directly into ChatGPT and Claude. Ask questions, generate emails, and draft proposals using the exact context of your conversations without copying and pasting transcripts.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-teal-400" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">ChatGPT Integration</h4>
                <p className="text-sm text-white/60">Seamlessly use the Fathom GPT to query your meeting library directly inside the ChatGPT interface.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-orange-400" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Claude MCP Integration</h4>
                <p className="text-sm text-white/60">Connect Fathom as an MCP server to let Claude dynamically retrieve context from any past meeting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Data Flow */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
          
          <div className="absolute inset-0 bg-gradient-to-br from-fathom-cyan/10 to-fathom-purple/10 rounded-[40px] blur-3xl opacity-50"></div>
          
          <div className="relative z-10 w-full max-w-md">
            {/* Fathom Box */}
            <div className="bg-[#121212] border border-fathom-cyan/30 rounded-2xl p-4 mb-12 relative shadow-lg shadow-fathom-cyan/10 z-20 mx-auto w-3/4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded bg-fathom-cyan flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 100 100" fill="none"><path d="M20 50 V80 A 12 12 0 0 0 44 80 V60 Z" fill="black"/><rect x="20" y="20" width="70" height="24" rx="12" transform="rotate(25 20 20)" fill="black"/><rect x="20" y="55" width="55" height="24" rx="12" transform="rotate(25 20 55)" fill="black"/></svg>
                </div>
                <span className="font-bold text-sm text-white">Fathom Meeting Context</span>
              </div>
              <div className="text-xs text-white/50 bg-black/40 p-2 rounded">"Client approved the Q3 budget..."</div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 h-20 w-px bg-white/10 z-10">
              <motion.div 
                className="w-1.5 h-6 bg-gradient-to-b from-transparent via-white to-transparent mx-auto relative -left-[2.5px] rounded-full"
                animate={{ y: [0, 80] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
            
            <div className="absolute top-[130px] left-[25%] right-[25%] h-px bg-white/10 z-10">
               <motion.div 
                className="h-1.5 w-6 bg-gradient-to-r from-transparent via-white to-transparent relative -top-[2.5px] rounded-full"
                animate={{ x: [0, 150] }} // Just arbitrary width for animation
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>

            <div className="flex justify-between gap-4 mt-16 relative z-20">
              {/* ChatGPT Box */}
              <div className="flex-1 bg-[#121212] border border-teal-500/30 rounded-2xl p-4 shadow-lg shadow-teal-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <span className="font-bold text-xs text-white">ChatGPT</span>
                </div>
                <div className="text-[10px] text-white/70 bg-black/40 p-2 rounded border border-teal-500/20">Drafting email based on Q3 budget approval...</div>
              </div>

              {/* Claude Box */}
              <div className="flex-1 bg-[#121212] border border-orange-500/30 rounded-2xl p-4 shadow-lg shadow-orange-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                  </div>
                  <span className="font-bold text-xs text-white">Claude</span>
                </div>
                <div className="text-[10px] text-white/70 bg-black/40 p-2 rounded border border-orange-500/20">Updating project proposal using Fathom MCP...</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
