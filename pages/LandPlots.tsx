
import React, { useState } from 'react';
import { Tag, LayoutGrid, Map as MapIcon, Search, MapPin, Building2, ShieldCheck, ShieldAlert, Phone, User, Landmark, HelpCircle } from 'lucide-react';
import { LAND_PLOTS } from '../constants';
import MapView from '../components/MapView';

const LandPlots: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlots = LAND_PLOTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mapItems = filteredPlots.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.location,
    coordinates: p.coordinates,
    image: p.image,
    price: `$${p.price.toLocaleString()}`
  }));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Verified': return 'bg-white text-black border-black';
      case 'Pending': return 'bg-white/10 text-white/60 border-white/20';
      case 'Disputed': return 'bg-red-600 text-white border-red-700';
      default: return 'bg-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Verified': return <ShieldCheck className="w-3 h-3 mr-1" />;
      case 'Pending': return <HelpCircle className="w-3 h-3 mr-1" />;
      case 'Disputed': return <ShieldAlert className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Strategic Acquisition</div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Land <br /> Assets.</h1>
            <p className="text-white/60 font-medium">Verified industrial, residential, and commercial plots with full document transparency and designated human management.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <div className="bg-black p-1 border border-white flex w-full sm:w-auto">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'grid' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Inventory</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'map' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                }`}
              >
                <MapIcon className="w-3 h-3" />
                <span>Geospatial</span>
              </button>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input 
                type="text"
                placeholder="SEARCH LOCATIONS..."
                className="w-full pl-12 pr-4 py-3 bg-black border border-white text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-white outline-none transition-all text-white placeholder:text-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {viewMode === 'grid' ? (
          <div className="space-y-12">
            {filteredPlots.map((plot) => (
              <div key={plot.id} className="bg-black border border-white/20 group hover:border-white transition-all duration-500 overflow-hidden flex flex-col xl:flex-row">
                {/* Media Section */}
                <div className="xl:w-[450px] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={plot.image} alt={plot.title} className="w-full h-full object-cover aspect-[4/3] xl:aspect-auto" />
                  <div className={`absolute top-6 left-6 px-3 py-1.5 border flex items-center text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md ${getStatusColor(plot.documentStatus)}`}>
                    {getStatusIcon(plot.documentStatus)} {plot.documentStatus}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 p-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Zoning Code</div>
                        <div className="text-xl font-black uppercase tracking-tighter flex items-center">
                            <Building2 className="w-5 h-5 mr-3 text-white/60" /> {plot.zoning}
                        </div>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-8 xl:p-12 flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                            <MapPin className="w-3 h-3 mr-2" /> {plot.location}
                        </div>
                        <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">{plot.title}</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-white/60 mt-4">{plot.exactLocation}</p>
                    </div>
                    <div className="bg-white text-black p-6 shrink-0 text-center min-w-[180px]">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Valuation</div>
                        <div className="text-3xl font-black tracking-tighter">${plot.price.toLocaleString()}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">{plot.area} Total</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Landmarks */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center">
                        <Landmark className="w-3 h-3 mr-2" /> Key Landmarks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {plot.landmarks.map((landmark, i) => (
                          <span key={i} className="px-3 py-1 border border-white/10 text-[10px] font-bold uppercase tracking-widest bg-white/5">
                            {landmark}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Agent / Accountability */}
                    <div className="border-l border-white/10 pl-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center">
                        <User className="w-3 h-3 mr-2" /> Asset Manager
                      </h4>
                      <div className="flex items-center gap-4">
                        <img src={plot.agent.image} alt={plot.agent.name} className="w-14 h-14 rounded-full grayscale border border-white/20" />
                        <div>
                          <div className="text-sm font-black uppercase tracking-widest">{plot.agent.name}</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{plot.agent.role}</div>
                          <div className="text-[10px] font-bold text-white/60 mt-1 flex items-center">
                            <Phone className="w-3 h-3 mr-1" /> {plot.agent.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-4">
                    <button className="flex-1 bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white/90">
                      Inquire Acquisition
                    </button>
                    <button className="px-8 border border-white/20 hover:bg-white/10 transition-all">
                      <Tag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/20">
            <MapView items={mapItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandPlots;
