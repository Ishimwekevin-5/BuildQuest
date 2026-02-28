import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Tractor, Mountain, MessageSquareCode, Menu, Newspaper, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { LAND_NEWS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { name: 'Engineers', path: '/engineers', icon: HardHat },
    { name: 'Equipment', path: '/equipment', icon: Tractor },
    { name: 'Land Plots', path: '/landplots', icon: Mountain },
    { name: 'AI Advisor', path: '/advisor', icon: MessageSquareCode },
    { name: 'News', path: '/news', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black bg-black text-white">
      {/* Land News Ticker */}
      <Link to="/news" className="bg-white text-black py-1 overflow-hidden whitespace-nowrap border-b border-white/20 block hover:bg-white/90 transition-colors">
        <div className="inline-block animate-[marquee_90s_linear_infinite] hover:pause">
          {LAND_NEWS.map((news, i) => (
            <span key={i} className="mx-8 text-[10px] font-black uppercase tracking-widest inline-flex items-center">
              <Newspaper className="w-3 h-3 mr-2" /> {news}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {LAND_NEWS.map((news, i) => (
            <span key={`dup-${i}`} className="mx-8 text-[10px] font-black uppercase tracking-widest inline-flex items-center">
              <Newspaper className="w-3 h-3 mr-2" /> {news}
            </span>
          ))}
        </div>
      </Link>

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
              <button 
                onClick={() => setShowContactModal(true)}
                className="hidden md:block bg-white text-black px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Contact Sales
              </button>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-white border border-white/10 hover:bg-white/10 transition-all"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-black border-b border-white/20 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center space-x-4 px-4 py-4 text-sm font-black uppercase tracking-widest border border-white/5 hover:bg-white hover:text-black transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <button 
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowContactModal(true);
                }}
                className="w-full mt-4 bg-white text-black px-4 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-black border border-white/20 w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white hover:text-black transition-all border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-block bg-white p-3 rounded mb-4">
                <HardHat className="text-black w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Contact Sales</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Global Logistics & Acquisition</p>
            </div>

            <div className="space-y-6">
              <div className="p-4 border border-white/10 hover:border-white transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded group-hover:bg-white group-hover:text-black transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Call / WhatsApp / SMS</div>
                    <a href="tel:+250795695555" className="text-lg font-black tracking-tight hover:underline">+250 795 695 555</a>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-white/10 hover:border-white transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Inquiry</div>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:ishimwekevin199@gmail.com" className="text-xs font-black tracking-tight hover:underline truncate">ishimwekevin199@gmail.com</a>
                      <a href="mailto:ishimwekevin.founder@gmail.com" className="text-xs font-black tracking-tight hover:underline truncate">ishimwekevin.founder@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => window.open('https://wa.me/250795695555', '_blank')}
                  className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:bg-white/90 transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Open WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <li><Link to="/advisor" className="text-white/60 hover:text-white transition-colors">Project Advisor</Link></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Safety Protocols</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 text-center text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
            © BuildQuest Logistics — Established 2026
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;