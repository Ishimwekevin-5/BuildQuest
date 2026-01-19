
import React, { useState } from 'react';
import { Sparkles, Loader2, HardHat, Tractor, Mountain, Calendar, ArrowRight, ExternalLink, Shield } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { AdvisorSuggestion } from '../types';

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

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Irembo Integration Alert */}
        <div className="mb-16 border border-white/40 p-8 bg-white/5 animate-pulse-slow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 shrink-0">
                <Shield className="text-black w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">Upcoming Integration</h4>
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-white/80">
                  Irembo Land Services Are Being Integrated Soon. <br className="hidden md:block" />
                  Our AI Land Development Engineer Will Be Able to operate The Tasks on Your Behalf.
                </p>
              </div>
            </div>
            <a 
              href="https://support.irembo.gov.rw/en/support/solutions/47000523309" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[10px] font-black uppercase tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-black transition-all group shrink-0"
            >
              Read Land Services <ExternalLink className="ml-2 w-3 h-3 group-hover:scale-110 transition-transform" />
            </a>
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
            <label className="block text-[10px] font-black text-white mb-6 uppercase tracking-[0.3em] opacity-60">Project Description Input</label>
            <textarea 
              className="w-full h-56 p-8 bg-black border border-white/20 text-sm font-medium focus:ring-1 focus:ring-white outline-none transition-all resize-none text-white placeholder:text-white/10"
              placeholder="E.G. PLANNING SUSTAINABLE HIGH-RISE DEVELOPMENT IN URBAN DENSITY AREA..."
              value={description}
              onChange={(e) => setSearchDescription(e.target.value)}
            />
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
