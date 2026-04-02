import React, { useEffect, useState } from 'react';
import { Newspaper, Calendar, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface NewsItem {
  title: string;
  date: string;
  summary: string;
  link: string;
  image?: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const loadNews = async (force = false) => {
    try {
      setLoading(true);
      const data = await geminiService.fetchNlaNews(force);
      
      // Get timestamp from cache to show last updated
      const cached = localStorage.getItem("nla_news_cache");
      if (cached) {
        setLastUpdated(JSON.parse(cached).timestamp);
      }

      // Add placeholder images if not provided
      const enrichedData = data.map((item: NewsItem, i: number) => ({
        ...item,
        image: `https://picsum.photos/seed/nla-news-${i}/800/400`
      }));
      setNews(enrichedData);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Unable to fetch the latest news at this moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Official Intelligence Feed</div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">National Land <br /> Authority News.</h1>
            <p className="text-white/60 font-medium">Real-time updates on land transactions, mapping, and strategic developments from Rwanda's National Land Authority.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-start md:items-end gap-4"
          >
            {lastUpdated && (
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Last Updated: {new Date(lastUpdated).toLocaleDateString()}
              </div>
            )}
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Update Cycle: Every 7 Days
            </div>
            <button 
              onClick={() => loadNews(true)}
              disabled={loading}
              className="px-6 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Newspaper className="w-3 h-3" />}
              Refresh Feed
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <Loader2 className="w-12 h-12 text-white/20 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Fetching latest reports...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p className="text-red-500 font-medium mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Retry Connection
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {news.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-white/10 hover:border-white transition-all duration-500 flex flex-col"
                >
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
                        Official Update
                      </div>
                      <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-white/40">
                        <Calendar className="w-3 h-3 mr-2" /> {item.date || 'Recent'}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-8 font-medium">
                      {item.summary}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <a 
                        href={item.link || 'https://www.lands.rw/'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase tracking-widest flex items-center group/btn"
                      >
                        Read Full Report <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                      <ExternalLink className="w-4 h-4 text-white/20" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default News;
