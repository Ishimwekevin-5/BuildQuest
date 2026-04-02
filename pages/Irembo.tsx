import React, { useEffect, useState } from 'react';
import { ExternalLink, Loader2, Shield, ArrowRight, Search, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface IremboService {
  name: string;
  description: string;
  link: string;
}

const Irembo: React.FC = () => {
  const [services, setServices] = useState<IremboService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await geminiService.fetchIremboLandServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch Irembo services:", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded">
                <Globe className="text-black w-5 h-5" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Official Government Integration</div>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Irembo <br /> Land Services.</h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Direct access to Rwanda's digital government services. Seamlessly manage land transfers, registrations, and titles through the official Irembo portal.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
            <div className="relative border border-white/20 p-12 bg-black/50 backdrop-blur-xl">
              <Shield className="w-24 h-24 text-white mb-6" />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Security Protocol</div>
              <div className="text-xl font-black uppercase tracking-tighter">Verified Portal</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search Land Services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-sm font-medium focus:border-white outline-none transition-all"
            />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
            Total Services: {filteredServices.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <Loader2 className="w-12 h-12 text-white/20 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Syncing with Irembo Matrix...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group border border-white/10 hover:border-white p-8 flex flex-col transition-all duration-500 bg-white/[0.02]"
                >
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8 font-medium flex-grow">
                    {service.description}
                  </p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <a 
                      href={service.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-black uppercase tracking-widest flex items-center group/btn"
                    >
                      Apply Now <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <ExternalLink className="w-4 h-4 text-white/20" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white text-black p-12 md:p-20">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">Digital <br /> Transformation.</h2>
            <p className="text-lg font-medium mb-12 opacity-80">
              Irembo is the one-stop portal for e-Government services in Rwanda. Our integration ensures you have direct, verified access to all land-related administrative tasks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-4 border-black pl-6">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Efficiency</div>
                <div className="text-lg font-black uppercase tracking-tighter">Zero Paperwork</div>
              </div>
              <div className="border-l-4 border-black pl-6">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Transparency</div>
                <div className="text-lg font-black uppercase tracking-tighter">Real-time Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irembo;
