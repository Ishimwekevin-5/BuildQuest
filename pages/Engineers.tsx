
import React, { useState, useMemo } from 'react';
import { Star, MapPin, Search, LayoutGrid, Map as MapIcon, X, Briefcase, Award, Clock, Phone, Mail, ChevronRight, CheckCircle, Timer } from 'lucide-react';
import { ENGINEERS } from '../constants';
import MapView from '../components/MapView';
import { Engineer } from '../types';

const Engineers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedEngineerId, setSelectedEngineerId] = useState<string | null>(null);

  const filteredEngineers = useMemo(() => 
    ENGINEERS.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const selectedEngineer = useMemo(() => 
    ENGINEERS.find(e => e.id === selectedEngineerId) || null,
  [selectedEngineerId]);

  const mapItems = useMemo(() => filteredEngineers.map(e => ({
    id: e.id,
    title: e.name,
    subtitle: e.specialty,
    coordinates: e.coordinates,
    image: e.image,
    price: `$${e.hourlyRate}/hr`
  })), [filteredEngineers]);

  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Professional Directory</div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Find <br /> Talent.</h1>
            <p className="text-white/60 font-medium">Licensed structural, civil, and architectural engineers for mission-critical infrastructure.</p>
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
                <span>Grid</span>
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

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input 
                type="text"
                placeholder="SEARCH DIRECTORY..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/20">
            {filteredEngineers.map((engineer) => (
              <div key={engineer.id} className="bg-black border-r border-b border-white/20 group p-8 hover:bg-white hover:text-black transition-all duration-500">
                <div className="relative aspect-square mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                  <img src={engineer.image} alt={engineer.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 text-[10px] font-black uppercase tracking-widest border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-black flex items-center">
                    ★ {engineer.rating.toFixed(1)}
                  </div>
                  <div className={`absolute bottom-4 left-4 px-3 py-1 text-[8px] font-black uppercase tracking-widest border border-white/20 shadow-lg ${
                    engineer.availability === 'Available' ? 'bg-black text-white group-hover:bg-black group-hover:text-white' : 'bg-white/20 text-white/40'
                  }`}>
                    {engineer.availability}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-black/60 mb-2">{engineer.specialty}</p>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{engineer.name}</h3>
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-black/80">
                    <MapPin className="w-3 h-3 mr-2" /> {engineer.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/10 group-hover:border-black/10">
                  <div className="text-2xl font-black tracking-tighter">${engineer.hourlyRate}<span className="text-[10px] opacity-50">/hr</span></div>
                  <button 
                    onClick={() => setSelectedEngineerId(engineer.id)}
                    className="bg-white text-black group-hover:bg-black group-hover:text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-colors border border-white/10"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/20 overflow-hidden">
            <MapView 
              items={mapItems} 
              onActionClick={(id) => setSelectedEngineerId(id)}
              actionLabel="View Full Profile"
            />
          </div>
        )}

        {filteredEngineers.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-white/10">
            <h3 className="text-xl font-black uppercase tracking-tighter">No assets matching criteria</h3>
            <p className="text-white/40 text-sm font-medium mt-2 uppercase tracking-widest">Update search parameters</p>
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-black border-l border-white/20 z-[60] transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          selectedEngineerId ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedEngineer && (
          <div className="h-full flex flex-col text-white">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Engineering Profile</span>
              <button onClick={() => setSelectedEngineerId(null)} className="p-2 hover:bg-white hover:text-black transition-all border border-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-12 space-y-12">
              <div className="grayscale border border-white/20 aspect-[16/9] overflow-hidden relative">
                <img src={selectedEngineer.image} alt={selectedEngineer.name} className="w-full h-full object-cover" />
                <div className={`absolute top-6 right-6 px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-white/20 bg-black/80 backdrop-blur-md flex items-center gap-2`}>
                   {selectedEngineer.availability === 'Available' ? <CheckCircle className="w-3 h-3" /> : <Timer className="w-3 h-3" />}
                   {selectedEngineer.availability}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{selectedEngineer.specialty}</p>
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">{selectedEngineer.name}</h2>
                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                   <div className="bg-black p-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Rating</div>
                      <div className="text-2xl font-black text-white">{selectedEngineer.rating.toFixed(1)} / 5.0</div>
                   </div>
                   <div className="bg-black p-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Experience</div>
                      <div className="text-2xl font-black text-white">{selectedEngineer.experience} Yrs</div>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest border-b border-white/20 pb-2">Biography</h4>
                <p className="text-sm font-medium text-white/70 leading-relaxed">
                  Highly technical background in heavy civil engineering and structural integrity. Specializing in high-density urban environments and seismic-resistant design. Vetted for government and large-scale private sector infrastructure. Currently onboarding into BuildQuest Matrix.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-white/80">
                  <MapPin className="w-4 h-4 mr-4 text-white/40" /> {selectedEngineer.location}
                </div>
                <div className="flex items-center text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-white/80">
                  <Briefcase className="w-4 h-4 mr-4 text-white/40" /> 0 Projects Completed
                </div>
                <div className="flex items-center text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-white/80">
                  <Mail className="w-4 h-4 mr-4 text-white/40" /> contact@buildquest.io
                </div>
                <div className="flex items-center text-sm font-bold uppercase tracking-widest text-white/80">
                  <Phone className="w-4 h-4 mr-4 text-white/40" /> +1 (555) 900 0000
                </div>
              </div>
            </div>

            <div className="p-12 border-t border-white/10 bg-black flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Standard Rate</div>
                <div className="text-4xl font-black tracking-tighter text-white">${selectedEngineer.hourlyRate}<span className="text-sm font-normal opacity-40">/hr</span></div>
              </div>
              <button className="bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all">
                Hire Personnel
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedEngineerId && (
        <div onClick={() => setSelectedEngineerId(null)} className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 transition-opacity" />
      )}
    </div>
  );
};

export default Engineers;
