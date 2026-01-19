
import React, { useState } from 'react';
import { Tractor, ShieldCheck, Search } from 'lucide-react';
import { EQUIPMENT } from '../constants';

const Equipment: React.FC = () => {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Earthmoving', 'Lifting', 'Compact', 'Trucks'];
  const filteredEquipment = selectedType === 'All' 
    ? EQUIPMENT 
    : EQUIPMENT.filter(e => e.type === selectedType);

  return (
    <div className="bg-black min-h-screen text-white">
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
            <div key={item.id} className="bg-black border-r border-b border-white/20 group p-8 hover:bg-white hover:text-black transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-video mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 group-hover:border-black/20">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                  {item.specs.map((spec, i) => (
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
                  disabled={!item.availability}
                  className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/20 group-hover:border-black ${
                    item.availability 
                      ? 'bg-white text-black group-hover:bg-black group-hover:text-white' 
                      : 'bg-black text-white/20 cursor-not-allowed border-white/10'
                  }`}
                >
                  {item.availability ? 'Deploy Asset' : 'Waitlist Only'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
