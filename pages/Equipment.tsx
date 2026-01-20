import React, { useState, useMemo } from 'react';
import { Tractor, ShieldCheck, Search, ArrowLeft, Maximize2, Share2, Phone, User, Check, Download, ExternalLink, Settings2, Info } from 'lucide-react';
import { EQUIPMENT } from '../constants';
import { Equipment as EquipmentType } from '../types';

const Equipment: React.FC = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  const types = ['All', 'Earthmoving', 'Lifting', 'Compact', 'Trucks'];
  
  const filteredEquipment = useMemo(() => {
    return selectedType === 'All' 
      ? EQUIPMENT 
      : EQUIPMENT.filter(e => e.type === selectedType);
  }, [selectedType]);

  const selectedItem = useMemo(() => 
    EQUIPMENT.find(e => e.id === selectedEquipmentId),
  [selectedEquipmentId]);

  const renderDetailView = (item: EquipmentType) => (
    <div className="animate-in fade-in slide-in-from-right duration-700">
      {/* Detail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-white/10">
        <button 
          onClick={() => setSelectedEquipmentId(null)}
          className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to fleet inventory
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                {item.name}
              </h1>
              <div className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border ${
                item.availability ? 'bg-white text-black border-white' : 'bg-white/10 text-white/40 border-white/10'
              }`}>
                {item.availability ? 'Ready for Deployment' : 'In Field'}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/60">
              <div className="flex items-center"><Settings2 className="w-3.5 h-3.5 mr-2 opacity-40" /> {item.type}</div>
              <div className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-2 opacity-40" /> Fully Insured</div>
              <div className="flex items-center"><Info className="w-3.5 h-3.5 mr-2 opacity-40" /> ID: {item.id.toUpperCase()}</div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
             <div className="flex items-center gap-4">
               <button className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all"><Share2 className="w-4 h-4" /></button>
               <div className="text-5xl font-black tracking-tighter">${item.dailyRate}<span className="text-sm font-normal opacity-40">/day</span></div>
             </div>
             <div className="px-3 py-1.5 border border-white/20 bg-white/5 text-white/60 flex items-center text-[10px] font-black uppercase tracking-widest">
               Next Available: Immediate
             </div>
          </div>
        </div>
      </div>

      {/* Media & Content Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* Main Content (Image & Text) */}
          <div className="xl:col-span-9 space-y-16">
            <div className="flex flex-col md:flex-row gap-4 h-[500px]">
              <div className="flex-1 bg-white/5 border border-white/10 overflow-hidden relative group">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" />
                <button className="absolute bottom-6 right-6 p-3 bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full md:w-48 flex md:flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 border border-white/10 bg-white/5 grayscale hover:grayscale-0 cursor-pointer transition-all">
                    <img src={item.image} alt="Thumbnail" className="w-full h-full object-cover opacity-40 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
              <div className="md:col-span-4 space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Operator Manuals</h4>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white transition-all group">
                       <div className="text-left">
                         <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Spec Sheet</div>
                         <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">PDF • 1.2MB</div>
                       </div>
                       <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white transition-all group">
                       <div className="text-left">
                         <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Safety Protocol</div>
                         <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">PDF • 450KB</div>
                       </div>
                       <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Fleet Owner</h4>
                  {item.owner && (
                    <div className="flex items-center gap-4">
                      <img src={item.owner.image} alt={item.owner.name} className="w-12 h-12 rounded-full grayscale border border-white/10" />
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest">{item.owner.name}</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">{item.owner.company}</div>
                        <div className="text-[10px] font-bold text-white/60 mt-1 flex items-center">
                          <Phone className="w-3 h-3 mr-1" /> {item.owner.phone}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-8 space-y-12">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Asset Description</h3>
                  <div className="text-sm font-medium text-white/60 leading-relaxed space-y-6">
                    <p>{item.description}</p>
                    <p>BuildQuest verified machinery includes full GPS tracking, remote diagnostics, and 24/7 technical on-site support if required for critical infrastructure projects.</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-4">Technical Specs</h4>
                  <div className="grid grid-cols-2 gap-y-4">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                        <Check className="w-3 h-3 mr-3 text-white/40" /> {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex gap-4">
                  <button 
                    disabled={!item.availability}
                    className="flex-1 bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all disabled:opacity-20"
                  >
                    {item.availability ? 'Request Deployment' : 'Current In Use'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 space-y-8">
             <div className="bg-white/5 border border-white/10 p-8 space-y-6">
               <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">Logistics Info</h5>
               <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Transport</span>
                   <span className="text-xs font-black uppercase">Lowboy Trailer</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Fuel System</span>
                   <span className="text-xs font-black uppercase">Diesel/DEF</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Tracking</span>
                   <span className="text-xs font-black uppercase">Satellite</span>
                 </div>
               </div>
               <div className="pt-4">
                 <div className="p-4 bg-black border border-white/20 text-center">
                    <div className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Standard Daily Rate</div>
                    <div className="text-2xl font-black">${item.dailyRate}</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {selectedEquipmentId ? (
        selectedItem ? renderDetailView(selectedItem) : null
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Inventory & Logistics</div>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Heavy <br /> Fleet.</h1>
              <p className="text-white/60 font-medium">Industrial-grade machinery with mission-critical insurance and technical support.</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap gap-px bg-white/10 border border-white/20 mb-16">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedType === type ? 'bg-white text-black' : 'bg-black text-white hover:bg-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/20">
              {filteredEquipment.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedEquipmentId(item.id)}
                  className="bg-black border-r border-b border-white/20 group p-8 hover:bg-white hover:text-black cursor-pointer transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative aspect-video mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 group-hover:border-black/20 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" />
                    <div className={`absolute top-4 left-4 px-2 py-1 border border-white/20 bg-black text-white text-[10px] font-black uppercase tracking-widest ${
                      !item.availability && 'opacity-50 line-through'
                    }`}>
                      {item.availability ? 'Ready' : 'In Field'}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-black/40 mb-2 block">{item.type}</span>
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{item.name}</h3>
                    </div>

                    <ul className="space-y-3 mb-12">
                      {item.specs.slice(0, 3).map((spec, i) => (
                        <li key={i} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-black/80">
                          <div className="w-1.5 h-1.5 bg-white group-hover:bg-black rounded-full mr-3 shrink-0" /> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/10 group-hover:border-black/10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <span className="text-3xl font-black tracking-tighter text-white group-hover:text-black">${item.dailyRate}</span>
                        <span className="text-[10px] opacity-40 uppercase ml-1 group-hover:text-black">Daily</span>
                      </div>
                      <ShieldCheck className="w-5 h-5 opacity-20 group-hover:opacity-100" />
                    </div>
                    <button 
                      className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/20 group-hover:border-black bg-white text-black group-hover:bg-black group-hover:text-white"
                    >
                      View Asset Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Equipment;