
import React, { useState, useMemo } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { Coordinates } from '../types';
import { MapPin, X, ArrowRight, Layers } from 'lucide-react';

interface MapItem {
  id: string;
  title: string;
  subtitle: string;
  coordinates: Coordinates;
  image?: string;
  price?: string;
}

interface MapViewProps {
  items: MapItem[];
  center?: [number, number];
  zoom?: number;
  onActionClick?: (id: string) => void;
  actionLabel?: string;
}

interface Cluster {
  id: string;
  items: MapItem[];
  center: [number, number];
  isCluster: boolean;
}

const MapView: React.FC<MapViewProps> = ({ 
  items, 
  center: initialCenter = [37.0902, -95.7129], 
  zoom: initialZoom = 4,
  onActionClick,
  actionLabel = "View Details"
}) => {
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(initialCenter);

  const clusters = useMemo(() => {
    if (zoom >= 12) {
      return items.map(item => ({
        id: item.id,
        items: [item],
        center: [item.coordinates.lat, item.coordinates.lng] as [number, number],
        isCluster: false
      }));
    }

    const result: Cluster[] = [];
    const processed = new Set<string>();
    const radius = 5 / Math.pow(1.8, zoom - 2);

    for (const item of items) {
      if (processed.has(item.id)) continue;

      const clusterItems = [item];
      processed.add(item.id);

      for (const other of items) {
        if (processed.has(other.id)) continue;

        const distance = Math.sqrt(
          Math.pow(item.coordinates.lat - other.coordinates.lat, 2) +
          Math.pow(item.coordinates.lng - other.coordinates.lng, 2)
        );

        if (distance < radius) {
          clusterItems.push(other);
          processed.add(other.id);
        }
      }

      const latSum = clusterItems.reduce((sum, i) => sum + i.coordinates.lat, 0);
      const lngSum = clusterItems.reduce((sum, i) => sum + i.coordinates.lng, 0);

      result.push({
        id: `cluster-${item.id}`,
        items: clusterItems,
        center: [latSum / clusterItems.length, lngSum / clusterItems.length],
        isCluster: clusterItems.length > 1
      });
    }

    return result;
  }, [items, zoom]);

  const handleMarkerClick = (cluster: Cluster) => {
    if (cluster.isCluster) {
      setCenter(cluster.center);
      setZoom(Math.min(zoom + 2, 18));
      setSelectedItem(null);
    } else {
      const item = cluster.items[0];
      setSelectedItem(item);
      setCenter([item.coordinates.lat, item.coordinates.lng]);
    }
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden bg-black selection:bg-white selection:text-black">
      <Map 
        height={650} 
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        metaWheelZoom={true}
      >
        <ZoomControl />
        {clusters.map((cluster) => (
          <Marker 
            key={cluster.id} 
            anchor={cluster.center} 
            onClick={() => handleMarkerClick(cluster)}
          >
            {cluster.isCluster ? (
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-all"></div>
                <div className="w-10 h-10 bg-white rounded-full border border-black shadow-xl flex items-center justify-center text-black text-[10px] font-black transition-transform group-hover:scale-110">
                  {cluster.items.length}
                </div>
              </div>
            ) : (
              <div className={`w-8 h-8 rounded-full border border-black shadow-lg flex items-center justify-center transition-all ${
                selectedItem?.id === cluster.items[0].id ? 'bg-white scale-125' : 'bg-white/80 hover:bg-white'
              }`}>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
            )}
          </Marker>
        ))}
      </Map>

      {selectedItem && (
        <div className="absolute bottom-8 left-8 right-8 md:left-auto md:w-80 bg-black border border-white/40 shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-2 duration-500 z-10 text-white">
          <button 
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 p-1 hover:bg-white hover:text-black transition-all border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex gap-4 mb-8">
            {selectedItem.image && (
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-20 h-20 grayscale border border-white/20 object-cover shrink-0" 
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black uppercase tracking-tighter truncate">{selectedItem.title}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 truncate flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" /> {selectedItem.subtitle}
              </p>
              {selectedItem.price && (
                <div className="text-white font-black text-lg tracking-tighter mt-2">
                  {selectedItem.price}
                </div>
              )}
            </div>
          </div>

          {onActionClick && (
            <button 
              onClick={() => onActionClick(selectedItem.id)}
              className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:opacity-90 transition-all"
            >
              {actionLabel} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      )}

      <div className="absolute top-8 left-8 bg-black border border-white/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl flex items-center gap-3 pointer-events-none text-white">
        <Layers className="w-3 h-3" /> Matrix Mode
      </div>

      <div className="absolute top-8 right-8 bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl pointer-events-none">
        {items.length} Assets Found
      </div>
    </div>
  );
};

export default MapView;
