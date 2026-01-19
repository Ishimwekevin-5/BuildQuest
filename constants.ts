
import { Engineer, Equipment, LandPlot } from './types';

export const ENGINEERS: Engineer[] = [
  {
    id: 'e1',
    name: 'Sarah Chen',
    specialty: 'Structural Engineer',
    experience: 0,
    rating: 0.0,
    hourlyRate: 0,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    location: 'San Francisco, CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    availability: 'Available'
  },
  {
    id: 'e2',
    name: 'Marcus Thorne',
    specialty: 'Civil Engineer',
    experience: 0,
    rating: 0.0,
    hourlyRate: 0,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    availability: 'On Project'
  },
  {
    id: 'e3',
    name: 'Elena Rodriguez',
    specialty: 'Architectural Engineer',
    experience: 0,
    rating: 0.0,
    hourlyRate: 0,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    location: 'Miami, FL',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    availability: 'Available'
  }
];

export const EQUIPMENT: Equipment[] = [
  {
    id: 'eq1',
    name: 'Caterpillar 320 Excavator',
    type: 'Earthmoving',
    dailyRate: 0,
    availability: true,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b08d?auto=format&fit=crop&q=80&w=600',
    specs: ['20 Ton Operating Weight', '1.2m3 Bucket Capacity', 'Diesel Engine']
  },
  {
    id: 'eq2',
    name: 'Liebherr LTM 1100 Crane',
    type: 'Lifting',
    dailyRate: 0,
    availability: false,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    specs: ['100 Ton Lifting Capacity', '60m Max Hook Height', 'All-terrain']
  },
  {
    id: 'eq3',
    name: 'Bobcat T76 Compact Loader',
    type: 'Compact',
    dailyRate: 0,
    availability: true,
    image: 'https://images.unsplash.com/photo-1590234797703-81206899f11a?auto=format&fit=crop&q=80&w=600',
    specs: ['Vertical Lift Path', '74 HP Engine', 'Rubber Tracks']
  }
];

export const LAND_PLOTS: LandPlot[] = [
  {
    id: 'l1',
    title: 'Sunnyvale Heights Lot',
    area: '0.5 Acres',
    price: 0,
    location: 'Sunnyvale, CA',
    zoning: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 37.3688, lng: -122.0363 }
  },
  {
    id: 'l2',
    title: 'Industrial Gateway Plot',
    area: '5.2 Acres',
    price: 0,
    location: 'Houston, TX',
    zoning: 'Industrial',
    image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 29.7604, lng: -95.3698 }
  },
  {
    id: 'l3',
    title: 'Retail Corner Lot',
    area: '1.1 Acres',
    price: 0,
    location: 'Denver, CO',
    zoning: 'Commercial',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 39.7392, lng: -104.9903 }
  }
];
