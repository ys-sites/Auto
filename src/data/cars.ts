export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  // Sale pricing: originalPrice is the struck-through anchor; price is what the buyer pays.
  // When set and > price, cards + VDP show "was X, now Y" with a -% pill to drive urgency.
  originalPrice?: number;
  mileage: number;
  type: 'SUV' | 'Sedan' | 'Coupe' | 'Convertible';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  image: string;
  description: string;
  descriptionFr?: string;
  features: string[];
  // Availability: sold cars stay listed with a SOLD overlay (SEO + social proof)
  status: 'available' | 'sold';
  badge?: string;      // e.g. "Just flipped"
  badgeFr?: string;
  // "What we fixed" — the flip story. Displayed as a checklist on the VDP.
  reconditioning: string[];
  reconditioningFr?: string[];
}

export const cars: Car[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'Civic LX',
    year: 2019,
    price: 16900,
    originalPrice: 17900,
    mileage: 85200,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/honda-civic-2019.webp',
    description: 'One-owner Civic with full service history. Fresh brakes, new tires, and detailed inside-out — ready to drive today.',
    descriptionFr: 'Civic à propriétaire unique avec historique d’entretien complet. Freins neufs, pneus neufs et nettoyage complet — prête à partir dès aujourd’hui.',
    features: ['Backup Camera', 'Heated Seats', 'Apple CarPlay', 'Adaptive Cruise Control', 'New Tires', 'Fresh Brakes'],
    status: 'available',
    badge: 'Just flipped',
    badgeFr: 'Fraîchement arrivée',
    reconditioning: [
      'New front brake pads & rotors',
      '4 new all-season tires',
      'Full synthetic oil change',
      'New cabin air filter',
      'Complete interior + exterior detail',
      'New 12V battery'
    ],
    reconditioningFr: [
      'Plaquettes et disques de frein avant neufs',
      '4 pneus toutes saisons neufs',
      'Vidange d’huile synthétique complète',
      'Filtre d’habitacle neuf',
      'Nettoyage intérieur + extérieur complet',
      'Batterie 12V neuve'
    ]
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla LE',
    year: 2018,
    price: 14500,
    originalPrice: 15400,
    mileage: 98400,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/toyota-corolla-2018.webp',
    description: 'The reliable daily driver everyone wants. Toyota Safety Sense, spotless interior, and a clean Carfax — flipped and ready.',
    descriptionFr: 'La voiture fiable que tout le monde veut. Toyota Safety Sense, intérieur impeccable et Carfax propre — remise à neuf et prête.',
    features: ['Toyota Safety Sense', 'Backup Camera', 'Bluetooth', 'Heated Mirrors', 'Keyless Entry', 'New Battery'],
    status: 'available',
    reconditioning: [
      'New brake pads all around',
      'Transmission fluid service',
      'New wiper blades',
      'Full detail + paint decontamination',
      'New 12V battery',
      'Cabin air filter replaced'
    ],
    reconditioningFr: [
      'Plaquettes de frein neuves aux 4 roues',
      'Vidange du liquide de transmission',
      'Balais d’essuie-glace neufs',
      'Nettoyage complet + décontamination de la peinture',
      'Batterie 12V neuve',
      'Filtre d’habitacle remplacé'
    ]
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'Mazda3 GX',
    year: 2017,
    price: 11900,
    originalPrice: 12700,
    mileage: 112600,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/mazda3-2017.webp',
    description: 'Fun to drive and easy on gas. Fully inspected, new front pads and rotors, and winter tires included in the deal.',
    descriptionFr: 'Agréable à conduire et économe en essence. Entièrement inspectée, plaquettes et disques avant neufs, pneus d’hiver inclus.',
    features: ['Backup Camera', 'Bluetooth', 'Heated Seats', 'Winter Tires Included', 'New Front Brakes', 'Cruise Control'],
    status: 'available',
    badge: 'Great value',
    badgeFr: 'Super prix',
    reconditioning: [
      'New front pads & rotors',
      'Winter tire set included',
      'Coolant flush',
      'New spark plugs',
      'Full interior shampoo',
      'Wheel alignment done'
    ],
    reconditioningFr: [
      'Plaquettes et disques avant neufs',
      'Ensemble de pneus d’hiver inclus',
      'Vidange du liquide de refroidissement',
      'Bougies neuves',
      'Shampooing intérieur complet',
      'Alignement des roues effectué'
    ]
  },
  {
    id: '4',
    make: 'Hyundai',
    model: 'Elantra Preferred',
    year: 2020,
    price: 15900,
    originalPrice: 16900,
    mileage: 76300,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/hyundai-elantra-2020.webp',
    description: 'Low mileage for the year with remaining factory warranty. Heated steering wheel, sunroof, and freshly serviced.',
    descriptionFr: 'Faible kilométrage pour l’année avec garantie d’usine restante. Volant chauffant, toit ouvrant et entretien fraîchement fait.',
    features: ['Sunroof', 'Heated Steering Wheel', 'Heated Seats', 'Backup Camera', 'Blind Spot Detection', 'Apple CarPlay'],
    status: 'available',
    badge: 'Low KM',
    badgeFr: 'Bas KM',
    reconditioning: [
      'Full synthetic oil change',
      'New rear brake pads',
      'Brake fluid flush',
      'New engine air filter',
      'Complete interior + exterior detail',
      'Tire rotation & balance'
    ],
    reconditioningFr: [
      'Vidange d’huile synthétique complète',
      'Plaquettes de frein arrière neuves',
      'Vidange du liquide de frein',
      'Filtre à air moteur neuf',
      'Nettoyage intérieur + extérieur complet',
      'Permutation et équilibrage des pneus'
    ]
  },
  {
    id: '5',
    make: 'Nissan',
    model: 'Rogue SV',
    year: 2016,
    price: 12900,
    originalPrice: 13700,
    mileage: 128900,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/nissan-rogue-2016.webp',
    description: 'Spacious AWD SUV, perfect for Quebec winters. New CVT service done, all-wheel drive, and a 360° camera system.',
    descriptionFr: 'VUS spacieux à traction intégrale, parfait pour les hivers québécois. Entretien de la CVT fait, caméra 360° et traction intégrale.',
    features: ['All-Wheel Drive', '360° Camera', 'Heated Seats', 'Power Liftgate', 'Blind Spot Warning', 'New CVT Service'],
    status: 'available',
    reconditioning: [
      'CVT fluid service',
      'New front brake pads',
      '4 new all-season tires',
      'AWD system inspected',
      'Complete interior + exterior detail',
      'New 12V battery'
    ],
    reconditioningFr: [
      'Vidange du liquide CVT',
      'Plaquettes de frein avant neuves',
      '4 pneus toutes saisons neufs',
      'Système AWD inspecté',
      'Nettoyage intérieur + extérieur complet',
      'Batterie 12V neuve'
    ]
  },
  // ── PLACEHOLDER SOLD CARS ──────────────────────────────────────────────
  // The entries below are PLACEHOLDERS for the "Recently sold" strip.
  // The client must replace them with real recently-sold cars (real photos,
  // real prices, real "days listed"). They stay visible with a SOLD overlay
  // for social proof + SEO instead of disappearing.
  {
    id: 's1',
    make: 'Volkswagen',
    model: 'Jetta Comfortline',
    year: 2018,
    price: 13200,
    mileage: 94000,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/toyota-corolla-2018.webp',
    description: 'Sold in 6 days. Ask us to find you the next one.',
    descriptionFr: 'Vendue en 6 jours. Demandez-nous de vous trouver la prochaine.',
    features: ['Backup Camera', 'Heated Seats', 'Bluetooth'],
    status: 'sold',
    badge: 'SOLD',
    badgeFr: 'VENDUE',
    reconditioning: ['Full inspection', 'New brakes', 'Complete detail'],
    reconditioningFr: ['Inspection complète', 'Freins neufs', 'Nettoyage complet']
  },
  {
    id: 's2',
    make: 'Ford',
    model: 'Escape SE',
    year: 2017,
    price: 11800,
    mileage: 105000,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/cars/nissan-rogue-2016.webp',
    description: 'Sold in 11 days. Ask us to find you the next one.',
    descriptionFr: 'Vendue en 11 jours. Demandez-nous de vous trouver la prochaine.',
    features: ['All-Wheel Drive', 'Backup Camera', 'Heated Seats'],
    status: 'sold',
    badge: 'SOLD',
    badgeFr: 'VENDUE',
    reconditioning: ['Full inspection', 'New tires', 'Complete detail'],
    reconditioningFr: ['Inspection complète', 'Pneus neufs', 'Nettoyage complet']
  }
];
