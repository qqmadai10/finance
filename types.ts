export interface Education {
  period: string;
  school: string;
  college: string;
  degree: string;
  details: string;
}

export interface Project {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Hobby {
  id: number;
  name: string;
  details: string;
  images: string[];
}

export interface Contact {
  email: string;
  github: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  birthdate: string;
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
  photoUrl: string;
  contact: Contact;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- Finance Game Types ---
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'crypto' | 'commodity';
  price: number;
  history: { day: number; price: number }[];
  volatility: number;
}

export interface PortfolioItem {
  assetId: string;
  quantity: number;
  avgPrice: number;
}

export interface GameEvent {
  title: string;
  description: string;
  impacts: { [assetId: string]: number };
}