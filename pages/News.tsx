import React from 'react';
import { Newspaper, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { LAND_NEWS } from '../constants';

const News: React.FC = () => {
  // Mock news with more details
  const detailedNews = LAND_NEWS.map((title, i) => ({
    id: i,
    title,
    date: 'Feb 26, 2026',
    category: 'Market Update',
    summary: 'Construction logistics and land acquisition markets are seeing unprecedented shifts this quarter. BuildQuest is at the forefront of these changes, providing verified data and AI-driven insights.',
    image: `https://picsum.photos/seed/news${i}/800/400`
  }));

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Intelligence Feed</div>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">Land <br /> News.</h1>
          <p className="text-white/60 font-medium">Real-time updates on zoning, market trends, and strategic construction logistics across the global matrix.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {detailedNews.map((item) => (
            <div key={item.id} className="group border border-white/10 hover:border-white transition-all duration-500 flex flex-col">
              <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-2 py-0.5 border border-white/20 text-[8px] font-black uppercase tracking-widest text-white/40">
                    {item.category}
                  </div>
                  <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-white/40">
                    <Calendar className="w-3 h-3 mr-2" /> {item.date}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-8 font-medium">
                  {item.summary}
                </p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <button className="text-[10px] font-black uppercase tracking-widest flex items-center group/btn">
                    Read Full Report <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <ExternalLink className="w-4 h-4 text-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
