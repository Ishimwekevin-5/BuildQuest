
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Tractor, Mountain, MessageSquareCode, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Engineers', path: '/engineers', icon: HardHat },
    { name: 'Equipment', path: '/equipment', icon: Tractor },
    { name: 'Land Plots', path: '/landplots', icon: Mountain },
    { name: 'AI Advisor', path: '/advisor', icon: MessageSquareCode },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black bg-black text-white">
      <nav className="bg-black border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded">
                <HardHat className="text-black w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight uppercase">BuildQuest</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 text-sm font-medium transition-all hover:opacity-100 ${
                      isActive ? 'text-white opacity-100 font-bold border-b border-white' : 'text-white/60 opacity-80 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:block bg-white text-black px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors">
                Contact Sales
              </button>
              <button className="md:hidden p-2 text-white">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black border-t border-white/10 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-white p-1.5 rounded">
                  <HardHat className="text-black w-5 h-5" />
                </div>
                <span className="text-xl font-black text-white uppercase tracking-tighter">BuildQuest</span>
              </div>
              <p className="max-w-sm text-sm text-white/60 leading-relaxed font-medium">
                The global infrastructure for professional construction logistics. High performance talent, machinery, and strategic land acquisition.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Marketplace</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/engineers" className="text-white/60 hover:text-white transition-colors">Engineers</Link></li>
                <li><Link to="/equipment" className="text-white/60 hover:text-white transition-colors">Equipment</Link></li>
                <li><Link to="/landplots" className="text-white/60 hover:text-white transition-colors">Land Acquisition</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Information</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Project Advisor</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Safety Protocols</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 text-center text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
            © BuildQuest Logistics — Established 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
