
export enum Category {
  Engineers = 'engineers',
  Equipment = 'equipment',
  LandPlots = 'landplots'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Engineer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  hourlyRate: number;
  image: string;
  location: string;
  coordinates: Coordinates;
  availability: 'Available' | 'On Project';
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  dailyRate: number;
  availability: boolean;
  image: string;
  specs: string[];
}

export interface Agent {
  name: string;
  image: string;
  phone: string;
  role: string;
}

export interface LandPlot {
  id: string;
  title: string;
  area: string;
  price: number;
  location: string;
  exactLocation: string;
  landmarks: string[];
  zoning: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  documentStatus: 'Verified' | 'Pending' | 'Disputed';
  agent: Agent;
  image: string;
  coordinates: Coordinates;
}

export interface AdvisorSuggestion {
  neededEngineers: string[];
  suggestedEquipment: string[];
  landAdvice: string;
  estimatedTimeline: string;
}
