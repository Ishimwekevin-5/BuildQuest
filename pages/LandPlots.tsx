
import React, { useState } from 'react';
import { Tag, LayoutGrid, Map as MapIcon, Search } from 'lucide-react';
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

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Strategic Acquisition</div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Land <br /> Assets.</h1>
            <p className="text-white/60 font-medium">Vetted industrial and residential plots with verified surveys and title clearings.</p>
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
                <span>List</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'map' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                }`}
              >
                <MapIcon className="w-3 h-3" />
                <span>Map</span>
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
          <div className="space-y-px bg-white/10 border border-white/20">
            {filteredPlots.map((plot) => (
              <div key={plot.id} className="bg-black group flex flex-col lg:flex-row hover:bg-white hover:text-black transition-all duration-700 border-b border-white/10 last:border-b-0">
                <div className="lg:w-1/3 aspect-video lg:aspect-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border-r border-white/10 group-hover:border-black/10">
                  <img src={plot.image} alt={plot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="p-12 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-black/60 mb-2">{plot.location}</div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight text-white group-hover:text-black">{plot.title}</h3>
                      </div>
                      <div className="px-3 py-1 border border-white/20 group-hover:border-black/20 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-black">
                        {plot.zoning}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-white/10 group-hover:bg-black/10 border border-white/20 group-hover:border-black/20 mb-12">
                      <div className="p-8 bg-black group-hover:bg-white">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-black/40 mb-1">Dimensions</div>
                        <div className="text-xl font-black tracking-tight text-white group-hover:text-black">{plot.area}</div>
                      </div>
                      <div className="p-8 bg-black group-hover:bg-white">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-black/40 mb-1">Valuation</div>
                        <div className="text-xl font-black tracking-tight text-white group-hover:text-black">${plot.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-white text-black group-hover:bg-black group-hover:text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10">
                      Inquire Acquisition
                    </button>
                    <button className="px-6 border border-white/20 group-hover:border-black text-white group-hover:text-black transition-all">
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
