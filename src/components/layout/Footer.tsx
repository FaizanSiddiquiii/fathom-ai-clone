import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 relative z-20 border-t border-white/10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-16 mb-16">
          <div className="sm:col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6 z-50 relative group">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M20 50 V80 A 12 12 0 0 0 44 80 V60 Z" fill="#0073a8"/>
                  <rect x="20" y="20" width="70" height="24" rx="12" transform="rotate(25 20 20)" fill="#00b4f0"/>
                  <rect x="20" y="55" width="55" height="24" rx="12" transform="rotate(25 20 55)" fill="#00b4f0"/>
                </svg>
                <span className="text-[22px] font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
                  Fathom
                </span>
              </Link>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/overview" className="text-white/60 hover:text-white text-sm transition-colors">Overview</Link></li>
                <li><Link to="/pricing" className="text-white/60 hover:text-white text-sm transition-colors">Pricing</Link></li>
                <li><Link to="/whats-new" className="text-white/60 hover:text-white text-sm transition-colors">What's New</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li><Link to="/solutions/sales" className="text-white/60 hover:text-white text-sm transition-colors">For Sales</Link></li>
                <li><Link to="/solutions/marketing" className="text-white/60 hover:text-white text-sm transition-colors">For Marketing</Link></li>
                <li><Link to="/solutions/customer-success" className="text-white/60 hover:text-white text-sm transition-colors">For Customer Success</Link></li>
                <li><Link to="/solutions/teams" className="text-white/60 hover:text-white text-sm transition-colors">For Teams</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Integrations</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">HubSpot</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Salesforce</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">ChatGPT</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Claude</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Fathom Video. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
