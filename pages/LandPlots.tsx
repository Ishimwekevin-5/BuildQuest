import React, { useState, useMemo } from 'react';
import { 
  Tag, LayoutGrid, Map as MapIcon, Search, MapPin, 
  Building2, ShieldCheck, ShieldAlert, Phone, User, 
  Landmark, HelpCircle, Shield, ArrowLeft, Download, 
  Maximize2, Share2, Check, ExternalLink, Ruler, Map as MapIconSmall
} from 'lucide-react';
import { LAND_PLOTS } from '../constants';
import MapView from '../components/MapView';
import { LandPlot } from '../types';

const LandPlots: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);

  const filteredPlots = useMemo(() => 
    LAND_PLOTS.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const selectedPlot = useMemo(() => 
    LAND_PLOTS.find(p => p.id === selectedPlotId),
  [selectedPlotId]);

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

  const renderDetailView = (plot: LandPlot) => (
    <div className="animate-in fade-in slide-in-from-right duration-700">
      {/* Detail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-white/10">
        <button 
          onClick={() => setSelectedPlotId(null)}
          className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to all assets
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                Lot #{plot.id.replace(/\D/g, '') || '120'}
              </h1>
              <div className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border ${getStatusColor(plot.documentStatus)}`}>
                {plot.documentStatus}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/60">
              <div className="flex items-center"><Ruler className="w-3.5 h-3.5 mr-2 opacity-40" /> {plot.area}</div>
              <div className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-2 opacity-40" /> {plot.zoning}</div>
              <div className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 opacity-40" /> {plot.location}</div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
             <div className="flex items-center gap-4">
               <button className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all"><Share2 className="w-4 h-4" /></button>
               <div className="text-5xl font-black tracking-tighter">${(plot.price/1000).toFixed(0)}K</div>
             </div>
             {plot.documentStatus === 'Verified' && (
                <div className="px-3 py-1.5 border-2 border-amber-400 bg-amber-500 text-black flex items-center text-[10px] font-black uppercase tracking-widest upi-badge-glow">
                  <Shield className="w-3.5 h-3.5 mr-1.5 fill-black/20" /> Verified With UPI
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Media & Content Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* Main Content (Image & Text) */}
          <div className="xl:col-span-9 space-y-16">
            {/* Gallery Mockup */}
            <div className="flex flex-col md:flex-row gap-4 h-[500px]">
              <div className="flex-1 bg-white/5 border border-white/10 overflow-hidden relative group">
                <img src={plot.image} alt={plot.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" />
                <button className="absolute bottom-6 right-6 p-3 bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full md:w-48 flex md:flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 border border-white/10 bg-white/5 grayscale hover:grayscale-0 cursor-pointer transition-all">
                    <img src={plot.image} alt="Thumbnail" className="w-full h-full object-cover opacity-40 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
              <div className="md:col-span-4 space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Documents</h4>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white transition-all group">
                       <div className="text-left">
                         <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Download Info Pack</div>
                         <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">PDF • 652KB</div>
                       </div>
                       <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white transition-all group">
                       <div className="text-left">
                         <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Master Plan Plot</div>
                         <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">PDF • 3.2MB</div>
                       </div>
                       <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
                    </button>
                    <button className="flex items-center text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white mt-4">
                      All Documents <ExternalLink className="w-2.5 h-2.5 ml-2" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Asset Management</h4>
                  <div className="flex items-center gap-4">
                    <img src={plot.agent.image} alt={plot.agent.name} className="w-12 h-12 rounded-full grayscale border border-white/10" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest">{plot.agent.name}</div>
                      <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">{plot.agent.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-12">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Details</h3>
                  <div className="text-sm font-medium text-white/60 leading-relaxed space-y-6">
                    <p>A charming {plot.area} strategic plot set on a generous location, perfect for development seeking both professional logistics and environmental comfort.</p>
                    <p>This property combines proximity to major hubs with high-end vetting finishes. Situated in the {plot.location} district, the site is within walking distance to critical infrastructure, logistics parks, and transport links.</p>
                    <p>Enquire now to secure a prime spot in this highly anticipated matrix release.</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Key Features</h4>
                  <div className="grid grid-cols-2 gap-y-4">
                    {[
                      `Zoning: ${plot.zoning}`,
                      `Area: ${plot.area}`,
                      `Status: ${plot.documentStatus}`,
                      ...plot.landmarks.slice(0, 3)
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                        <Check className="w-3 h-3 mr-3 text-white/40" /> {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex gap-4">
                  <button className="flex-1 bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all">
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info (Right Side Sticky-like) */}
          <div className="xl:col-span-3 space-y-8">
             <div className="bg-white/5 border border-white/10 p-8 space-y-6">
               <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">Zoning Matrix</h5>
               <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Primary</span>
                   <span className="text-xs font-black uppercase">{plot.zoning}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Verification</span>
                   <span className="text-xs font-black uppercase">{plot.documentStatus}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">ID Tag</span>
                   <span className="text-xs font-black uppercase">BQ-{plot.id.toUpperCase()}</span>
                 </div>
               </div>
               <MapView 
                  items={[{...plot, subtitle: plot.location}]} 
                  center={[plot.coordinates.lat, plot.coordinates.lng]} 
                  zoom={14} 
               />
             </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {selectedPlotId ? (
        selectedPlot ? renderDetailView(selectedPlot) : null
      ) : (
        <>
          {/* List/Map Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-2xl">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Strategic Acquisition</div>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">House & <br /> Land.</h1>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredPlots.map((plot) => (
                  <div 
                    key={plot.id} 
                    onClick={() => setSelectedPlotId(plot.id)}
                    className="group cursor-pointer flex flex-col h-full bg-black border border-white/5 hover:border-white transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={plot.image} alt={plot.title} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest border border-black shadow-xl ${getStatusColor(plot.documentStatus)}`}>
                          {plot.documentStatus}
                        </div>
                        {plot.documentStatus === 'Verified' && (
                          <div className="px-2 py-1 bg-amber-500 border border-amber-400 text-black text-[8px] font-black uppercase tracking-widest upi-badge-glow">
                            UPI
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Lot #{plot.id.replace(/\D/g, '') || '120'}</div>
                          <h3 className="text-xl font-black uppercase tracking-tighter truncate">{plot.title}</h3>
                        </div>
                        <div className="text-xl font-black tracking-tighter">${(plot.price/1000).toFixed(0)}K</div>
                      </div>

                      <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-white/40 mb-6">
                        <MapPin className="w-3 h-3 mr-1.5" /> {plot.location}
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                        <div className="flex items-center text-[10px] font-black uppercase text-white/60">
                          <Ruler className="w-3 h-3 mr-2 opacity-40" /> {plot.area.split(' ')[0]}
                        </div>
                        <div className="flex items-center text-[10px] font-black uppercase text-white/60">
                          <Building2 className="w-3 h-3 mr-2 opacity-40" /> {plot.zoning[0]}
                        </div>
                        <div className="flex items-center justify-end text-[10px] font-black uppercase text-white/60">
                          <MapIconSmall className="w-3 h-3 opacity-40" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-white/20">
                <MapView items={mapItems} onActionClick={(id) => setSelectedPlotId(id)} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LandPlots;