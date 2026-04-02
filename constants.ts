import { Engineer, Equipment, LandPlot } from './types';

export const ENGINEERS: Engineer[] = [
  {
    id: 'e1',
    name: 'Sarah Chen',
    specialty: 'Structural Engineer',
    experience: 12,
    rating: 4.9,
    hourlyRate: 150,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    location: 'San Francisco, CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    availability: 'Available'
  },
  {
    id: 'e2',
    name: 'Marcus Thorne',
    specialty: 'Civil Engineer',
    experience: 15,
    rating: 4.8,
    hourlyRate: 185,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    availability: 'On Project'
  },
  {
    id: 'e3',
    name: 'Elena Rodriguez',
    specialty: 'Architectural Engineer',
    experience: 8,
    rating: 5.0,
    hourlyRate: 165,
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
    dailyRate: 1200,
    availability: true,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b08d?auto=format&fit=crop&q=80&w=600',
    specs: ['20 Ton Operating Weight', '1.2m3 Bucket Capacity', 'Diesel Engine', 'Tier 4 Final Engine'],
    description: 'The Cat 320 brings premium performance with simple-to-use technologies like Cat GRADE with 2D, Grade Assist, and Payload — all standard equipment from the factory to boost your operator efficiency up to 45%.',
    owner: {
      name: 'John Miller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      phone: '+1 415 555 0198',
      company: 'Miller Heavy Rentals'
    }
  },
  {
    id: 'eq2',
    name: 'Liebherr LTM 1100 Crane',
    type: 'Lifting',
    dailyRate: 4500,
    availability: false,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    specs: ['100 Ton Lifting Capacity', '60m Max Hook Height', 'All-terrain', 'VarioBallast Technology'],
    description: 'The LTM 1100-5.2 mobile crane is the most compact 5-axle crane in the world. Its long telescopic boom can be extended with additional lattice jibs and a double folding jib.',
    owner: {
      name: 'Angela Rossi',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      phone: '+1 512 555 0122',
      company: 'Apex Lifting Solutions'
    }
  },
  {
    id: 'eq3',
    name: 'Bobcat T76 Compact Loader',
    type: 'Compact',
    dailyRate: 650,
    availability: true,
    image: 'https://images.unsplash.com/photo-1590234797703-81206899f11a?auto=format&fit=crop&q=80&w=600',
    specs: ['Vertical Lift Path', '74 HP Engine', 'Rubber Tracks', 'Premium Cab with AC'],
    description: 'The Bobcat® T76 compact track loader is engineered to deliver more usable horsepower and better overall performance so you can complete bigger jobs in less time.',
    owner: {
      name: 'Tom Hudson',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
      phone: '+1 305 555 0187',
      company: 'Hudson Compact Fleet'
    }
  }
];

export const LAND_PLOTS: LandPlot[] = [
  {
    id: 'l1',
    title: 'Sunnyvale Heights Lot',
    area: '0.5 Acres',
    price: 450000,
    location: 'Sunnyvale, CA',
    exactLocation: '1242 Wolters Rd, Near El Camino Real',
    landmarks: ['Sunnyvale Health Center', 'Apple Park (2mi)', 'Lawrence Expressway'],
    zoning: 'Residential',
    documentStatus: 'Verified',
    agent: {
      name: 'David Vane',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      phone: '+1 408 555 0122',
      role: 'Senior Portfolio Manager'
    },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 37.3688, lng: -122.0363 }
  },
  {
    id: 'l2',
    title: 'Industrial Gateway Plot',
    area: '5.2 Acres',
    price: 1250000,
    location: 'Houston, TX',
    exactLocation: 'Port Terminal District, Block 42',
    landmarks: ['Port of Houston', 'Beltway 8 Interchange', 'Memorial Hermann Hospital'],
    zoning: 'Industrial',
    documentStatus: 'Verified',
    agent: {
      name: 'Sarah Jenkins',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      phone: '+1 713 555 0199',
      role: 'Industrial Specialist'
    },
    image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 29.7604, lng: -95.3698 }
  },
  {
    id: 'l3',
    title: 'Retail Corner Lot',
    area: '1.1 Acres',
    price: 890000,
    location: 'Denver, CO',
    exactLocation: 'S Broadway & W Mississippi Ave',
    landmarks: ['South Broadway Market', 'Platte River Trail', 'Denver Health'],
    zoning: 'Commercial',
    documentStatus: 'Pending',
    agent: {
      name: 'Robert Stark',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      phone: '+1 303 555 0145',
      role: 'Commercial Land Agent'
    },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 39.7392, lng: -104.9903 }
  }
];

export const LAND_NEWS = [
  "Ababitsi b'Inyandikompamo z'Ubutaka bashya barahiriye kuzatunganya akazi.",
  "The Ghana Institution of Surveyors visited the NLA.",
  "Inyandikompeshabubasha zabaye zihagaritswe by’agateganyo muri serivisi z’ubutaka.",
  "Rwanda National Land Authority announces new digital land transaction protocols.",
  "Global surveyors delegation visits Kigali for strategic mapping partnership."
];
