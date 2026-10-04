export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  type: 'SUV' | 'Sedan' | 'Coupe' | 'Convertible';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  image: string;
  description: string;
  descriptionFr?: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'Civic LX',
    year: 2019,
    price: 16900,
    mileage: 85200,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/honda-civic-2019.png',
    description: 'One-owner Civic with full service history. Fresh brakes, new tires, and detailed inside-out — ready to drive today.',
    descriptionFr: 'Civic à propriétaire unique avec historique d’entretien complet. Freins neufs, pneus neufs et nettoyage complet — prête à partir dès aujourd’hui.',
    features: ['Backup Camera', 'Heated Seats', 'Apple CarPlay', 'Adaptive Cruise Control', 'New Tires', 'Fresh Brakes']
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla LE',
    year: 2018,
    price: 14500,
    mileage: 98400,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/toyota-corolla-2018.jpg',
    description: 'The reliable daily driver everyone wants. Toyota Safety Sense, spotless interior, and a clean Carfax — flipped and ready.',
    descriptionFr: 'La voiture fiable que tout le monde veut. Toyota Safety Sense, intérieur impeccable et Carfax propre — remise à neuf et prête.',
    features: ['Toyota Safety Sense', 'Backup Camera', 'Bluetooth', 'Heated Mirrors', 'Keyless Entry', 'New Battery']
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'Mazda3 GX',
    year: 2017,
    price: 11900,
    mileage: 112600,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/mazda3-2017.jpg',
    description: 'Fun to drive and easy on gas. Fully inspected, new front pads and rotors, and winter tires included in the deal.',
    descriptionFr: 'Agréable à conduire et économe en essence. Entièrement inspectée, plaquettes et disques avant neufs, pneus d’hiver inclus.',
    features: ['Backup Camera', 'Bluetooth', 'Heated Seats', 'Winter Tires Included', 'New Front Brakes', 'Cruise Control']
  },
  {
    id: '4',
    make: 'Hyundai',
    model: 'Elantra Preferred',
    year: 2020,
    price: 15900,
    mileage: 76300,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/hyundai-elantra-2020.jpg',
    description: 'Low mileage for the year with remaining factory warranty. Heated steering wheel, sunroof, and freshly serviced.',
    descriptionFr: 'Faible kilométrage pour l’année avec garantie d’usine restante. Volant chauffant, toit ouvrant et entretien fraîchement fait.',
    features: ['Sunroof', 'Heated Steering Wheel', 'Heated Seats', 'Backup Camera', 'Blind Spot Detection', 'Apple CarPlay']
  },
  {
    id: '5',
    make: 'Nissan',
    model: 'Rogue SV',
    year: 2016,
    price: 12900,
    mileage: 128900,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/nissan-rogue-2016.jpg',
    description: 'Spacious AWD SUV, perfect for Quebec winters. New CVT service done, all-wheel drive, and a 360° camera system.',
    descriptionFr: 'VUS spacieux à traction intégrale, parfait pour les hivers québécois. Entretien de la CVT fait, caméra 360° et traction intégrale.',
    features: ['All-Wheel Drive', '360° Camera', 'Heated Seats', 'Power Liftgate', 'Blind Spot Warning', 'New CVT Service']
  }
];
