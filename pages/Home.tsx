
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HardHat, Tractor, Mountain, MoveRight, Newspaper, Globe } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-black overflow-hidden border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 border border-white px-3 py-1 rounded-full mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest">v2.4.0 Live</span>
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10 uppercase">
              Land <br /> Intelligence.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mb-12 leading-tight">
              A professional-grade portal for land transactions, mapping, and real-time intelligence from the Rwanda National Land Authority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/irembo" className="bg-white text-black px-10 py-5 rounded-none font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white/90 transition-all">
                Irembo Land Services <MoveRight className="ml-3 w-5 h-5" />
              </Link>
              <Link to="/news" className="bg-black text-white border-2 border-white px-10 py-5 rounded-none font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white hover:text-black transition-all">
                Latest NLA News
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract background element */}
        <div className="absolute right-[-10%] bottom-[-10%] opacity-10 pointer-events-none">
          <HardHat className="w-[800px] h-[800px] text-white" strokeWidth={1} />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/20">
            <div className="group border-r border-b border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500">
              <div className="mb-10">
                <HardHat className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Engineers</h3>
              <p className="text-sm font-medium opacity-60 group-hover:opacity-80 mb-10 leading-relaxed">
                Connect with licensed structural, civil, and architectural experts worldwide. Vetted for complex projects.
              </p>
              <Link to="/engineers" className="inline-flex items-center text-xs font-black uppercase tracking-widest">
                Explore Talent <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="group border-r border-b border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500">
              <div className="mb-10">
                <Tractor className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Equipment</h3>
              <p className="text-sm font-medium opacity-60 group-hover:opacity-80 mb-10 leading-relaxed">
                Access a professional fleet of heavy-duty machinery. Flexible rental terms for short and long-term deployment.
              </p>
              <Link to="/equipment" className="inline-flex items-center text-xs font-black uppercase tracking-widest">
                Browse Fleet <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="group border-r border-b border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500">
              <div className="mb-10">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Irembo Services</h3>
              <p className="text-sm font-medium opacity-60 group-hover:opacity-80 mb-10 leading-relaxed">
                Direct integration with Rwanda's official government portal for land transfers, registrations, and more.
              </p>
              <Link to="/irembo" className="inline-flex items-center text-xs font-black uppercase tracking-widest">
                Access Portal <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-6xl font-black mb-2 tracking-tighter">0</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Land Records</div>
          </div>
          <div>
            <div className="text-6xl font-black mb-2 tracking-tighter">0</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Active Users</div>
          </div>
          <div>
            <div className="text-6xl font-black mb-2 tracking-tighter">0</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Mappings</div>
          </div>
          <div>
            <div className="text-6xl font-black mb-2 tracking-tighter">0</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Transactions</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
