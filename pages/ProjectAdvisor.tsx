import React, { useState } from 'react';
import { Sparkles, Loader2, HardHat, Tractor, Mountain, Calendar, ArrowRight, ExternalLink, Shield, Cpu } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { AdvisorSuggestion } from '../types';

const MIN_DETAIL_LENGTH = 50;

const ProjectAdvisor: React.FC = () => {
  const [description, setSearchDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AdvisorSuggestion | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const result = await geminiService.getProjectAdvice(description);
      setSuggestion(result);
    } catch (err) {
      alert("Consultation failed. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const isSufficient = description.length >= MIN_DETAIL_LENGTH;

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Irembo Integration Alert - Tech Glow Style */}
        <div className="mb-20 tech-card-glow bg-white/5 border border-white/20 p-8 relative">
          {/* Corner Tech Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="bg-white p-3 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <Cpu className="text-black w-6 h-6 animate-pulse" />
              </div>
              <div className="tech-flicker-text">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">System Protocol: Irembo v0.1</h4>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed text-white/90">
                  Land Services Neural Integration In Progress. <br className="hidden md:block" />
                  AI Agents will soon facilitate direct operational tasks with government registries.
                </p>
              </div>
            </div>
            
            <a 
              href="https://support.irembo.gov.rw/en/support/solutions/47000523309" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.2em] bg-white text-black px-6 py-3 hover:bg-black hover:text-white hover:border-white border border-transparent transition-all group shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Access Registry <ExternalLink className="ml-2 w-3 h-3 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
            <Shield className="w-32 h-32 text-white" />
          </div>
        </div>

        <div className="text-center mb-24">
          <div className="inline-block p-4 border border-white mb-8">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">AI <br /> Advisor.</h1>
          <p className="text-white/40 font-medium text-lg uppercase tracking-widest text-[12px]">Generative Logistics Planning — Gemini Flash 3.0</p>
        </div>

        <div className="border border-white/20 p-12 mb-24 bg-white/5">
          <form onSubmit={handleConsult}>
            <div className="flex justify-between items-end mb-6">
              <label className="block text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-60">Project Description Input</label>
              <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isSufficient ? 'text-white' : 'text-white/30'}`}>
                Characters: {description.length} <span className="opacity-40">/ {MIN_DETAIL_LENGTH} min</span>
              </div>
            </div>
            <div className="relative">
              <textarea 
                className={`w-full h-56 p-8 bg-black border text-sm font-medium focus:ring-1 focus:ring-white outline-none transition-all resize-none text-white placeholder:text-white/10 ${
                  isSufficient ? 'border-white/60' : 'border-white/20'
                }`}
                placeholder="E.G. PLANNING SUSTAINABLE HIGH-RISE DEVELOPMENT IN URBAN DENSITY AREA..."
                value={description}
                onChange={(e) => setSearchDescription(e.target.value)}
              />
              {!isSufficient && description.length > 0 && (
                <div className="absolute bottom-4 left-8 text-[9px] font-black uppercase tracking-widest text-white/30 animate-pulse">
                  Provide more detail for better accuracy
                </div>
              )}
            </div>
            <div className="mt-8">
              <button 
                type="submit"
                disabled={loading || !description}
                className="w-full bg-white text-black py-6 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center hover:opacity-90 disabled:opacity-20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-3 w-5 h-5" /> Analyzing Matrix...
                  </>
                ) : (
                  <>
                    Initialize Strategy Planning <ArrowRight className="ml-3 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {suggestion && (
          <div className="space-y-20 animate-in fade-in duration-1000">
            <div className="flex items-center space-x-4 border-b border-white/20 pb-8">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white">Strategy Output</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/20">
              <div className="bg-black p-10">
                <div className="flex items-center text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-60">
                  <HardHat className="mr-3 w-4 h-4" /> Recommended Personnel
                </div>
                <ul className="space-y-4">
                  {suggestion.neededEngineers.map((role, i) => (
                    <li key={i} className="text-xs font-bold uppercase tracking-widest flex items-center text-white/80">
                      <div className="w-1 h-1 bg-white mr-4"></div>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black p-10">
                <div className="flex items-center text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-60">
                  <Tractor className="mr-3 w-4 h-4" /> Machinery Allocation
                </div>
                <ul className="space-y-4">
                  {suggestion.suggestedEquipment.map((eq, i) => (
                    <li key={i} className="text-xs font-bold uppercase tracking-widest flex items-center text-white/80">
                      <div className="w-1 h-1 bg-white mr-4"></div>
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black p-10 md:col-span-2 border-t border-white/10">
                <div className="flex items-center text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-60">
                  <Mountain className="mr-3 w-4 h-4" /> Geolocation Advisory
                </div>
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed text-white/70">
                  {suggestion.landAdvice}
                </p>
              </div>

              <div className="bg-white p-10 md:col-span-2 text-black">
                <div className="flex items-center text-black font-black uppercase tracking-widest text-[10px] mb-8 opacity-60">
                  <Calendar className="mr-3 w-4 h-4" /> Estimated Roadmap
                </div>
                <p className="text-lg font-black tracking-tight leading-tight uppercase">
                  {suggestion.estimatedTimeline}
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-12">
              <button 
                onClick={() => setSuggestion(null)}
                className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
              >
                Reset Planning Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAdvisor;