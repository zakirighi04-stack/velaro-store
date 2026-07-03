export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  categoryName: string;
  mainImage: string;
  images: string[];
  description: string;
  details: string[];
  colors: Color[];
  sizes: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stock: number;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'jackets', name: 'Coats & Blazers' },
  { id: 'shirts', name: 'Bespoke Shirts' },
  { id: 'trousers', name: 'Tailored Trousers' },
  { id: 'shoes', name: 'Luxury Footwear' },
  { id: 'accessories', name: 'Exclusive Accessories' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Italian Cashmere Wool Overcoat',
    price: 495,
    rating: 4.9,
    reviewsCount: 42,
    category: 'jackets',
    categoryName: 'Coats & Blazers',
    mainImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Camel Gold', hex: '#C19A6B' },
      { name: 'Charcoal Black', hex: '#1C1C1C' },
      { name: 'Midnight Blue', hex: '#1A293F' }
    ],
    sizes: ['48 / S', '50 / M', '52 / L', '54 / XL'],
    description: 'A masterpiece of Italian craftsmanship, meticulously tailored from a luxurious cashmere-wool blend. Offering superior warmth, exquisite drape, and an elegant, structured silhouette for the modern gentleman.',
    details: [
      'Fabric: 90% Italian Virgin Wool, 10% Pure Cashmere',
      'Lining: 100% premium silk-viscose blend with jacquard pattern',
      'Genuine horn buttons sourced from sustainable origins',
      'Hand-stitched lapels and elegant double-vented back profile',
      'Made in Milan, Italy'
    ],
    stock: 12,
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Giza Egyptian Cotton Oxford Shirt',
    price: 130,
    rating: 4.8,
    reviewsCount: 114,
    category: 'shirts',
    categoryName: 'Bespoke Shirts',
    mainImage: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Alabaster White', hex: '#F9F9FB' },
      { name: 'Powder Blue', hex: '#D0E1FD' },
      { name: 'Sterling Gray', hex: '#D2D2D4' }
    ],
    sizes: ['38 / S', '40 / M', '42 / L', '44 / XL'],
    description: 'Crafted from rare Giza Egyptian cotton, this Oxford shirt represents the pinnacle of formal and casual refinement. Highly breathable, exceptionally soft, and tailored to retain its flawless structure through day-long wear.',
    details: [
      'Fabric: 100% Extra-Long Staple Egyptian Giza Cotton',
      'High-density 120/2 double-ply weave for maximum durability and softness',
      'Genuine mother-of-pearl buttons with custom reinforcement',
      'Semi-spread collar with removable brass collar stays',
      'Sleek tailored fit with an elegant curved hemline'
    ],
    stock: 25,
    isNewArrival: true
  },
  {
    id: 'p3',
    name: 'Luxury Slim Fit Chino Trousers',
    price: 155,
    rating: 4.7,
    reviewsCount: 88,
    category: 'trousers',
    categoryName: 'Tailored Trousers',
    mainImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Classic Sand', hex: '#E1D3BE' },
      { name: 'Charcoal Slate', hex: '#4A4A4A' },
      { name: 'Forest Green', hex: '#2A3C30' }
    ],
    sizes: ['30 / S', '32 / M', '34 / L', '36 / XL'],
    description: 'Sophisticated slim-fit chinos designed for versatility and everyday comfort. Combining double-twisted combed cotton with a touch of elastane to ensure dynamic movement while maintaining a sharp, tailored profile.',
    details: [
      'Fabric: 97% combed cotton, 3% premium Italian elastane',
      'Extended three-point closure with authentic YKK brass zipper',
      'Custom internal shirt-grip waistband to keep shirts tucked elegantly',
      'Double-piped back pockets with natural horn button accents',
      'Available in Classic Sand and Charcoal Gray'
    ],
    stock: 18
  },
  {
    id: 'p4',
    name: 'Italian Suede Chelsea Boots',
    price: 335,
    rating: 4.9,
    reviewsCount: 65,
    category: 'shoes',
    categoryName: 'Luxury Footwear',
    mainImage: 'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#3E2A1F' },
      { name: 'Taupe Gray', hex: '#8B807A' },
      { name: 'Onyx Black', hex: '#0F0F0F' }
    ],
    sizes: ['40 / US 7', '41 / US 8', '42 / US 9', '43 / US 10', '44 / US 11'],
    description: 'An elegant take on the classic Chelsea boot, hand-crafted in Tuscany from the finest water-resistant suede. Featuring a Blake-stitched leather sole for supreme comfort and lasting durability.',
    details: [
      'Upper: 100% premium Italian calf suede with water-repellent coating',
      'Lining: Ultra-soft, breathable glove leather interior',
      'Sole: Durable Blake-stitched leather with rubber grip inserts',
      'Double-stitched elastic side panels for easy wear',
      'Sleek, almond-toe shape for versatile styling'
    ],
    stock: 8,
    isBestSeller: true
  },
  {
    id: 'p5',
    name: 'VELARO Classic Gold Chronograph',
    price: 640,
    rating: 5.0,
    reviewsCount: 29,
    category: 'accessories',
    categoryName: 'Exclusive Accessories',
    mainImage: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: '18K Gold Emerald', hex: '#D4AF37' },
      { name: 'Platinum Silver Blue', hex: '#E5E4E2' }
    ],
    sizes: ['One Size (40mm Case)'],
    description: 'A timeless masterpiece that blends architectural precision with sophisticated horology. Featuring an 18K gold-plated case, Japanese automatic movement, and a genuine alligator leather strap.',
    details: [
      'Case: 40mm 316L stainless steel with 18K gold-plating (5 microns)',
      'Movement: Precision Japanese automatic caliber with 42-hour power reserve',
      'Dial: Deep emerald green with hand-applied gold indices and hands',
      'Strap: Hand-stitched premium brown alligator leather',
      'Water Resistance: Up to 50 meters (5 ATM)'
    ],
    stock: 5,
    isBestSeller: true
  },
  {
    id: 'p6',
    name: 'Pure Cashmere Turtleneck Sweater',
    price: 220,
    rating: 4.8,
    reviewsCount: 51,
    category: 'jackets',
    categoryName: 'Coats & Blazers',
    mainImage: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#EAE6DF' },
      { name: 'Charcoal Gray', hex: '#5A5A5A' },
      { name: 'Crimson Red', hex: '#7B1113' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Indulge in unparalleled softness with our signature turtleneck sweater, knitted from two-ply Grade-A Mongolian cashmere. Extremely lightweight yet remarkably insulating.',
    details: [
      'Fabric: 100% Grade-A Mongolian Cashmere (12-gauge knit)',
      'Double-ply yarn for exceptional warmth and anti-pilling longevity',
      'Ribbed cuffs, hem, and collar for a snug, refined fit',
      'Dry clean only to maintain natural luxury texture',
      'Ethically sourced and sustainably produced'
    ],
    stock: 14,
    isNewArrival: true
  },
  {
    id: 'p7',
    name: 'Premium Suede Leather Blazer',
    price: 425,
    rating: 4.9,
    reviewsCount: 37,
    category: 'jackets',
    categoryName: 'Coats & Blazers',
    mainImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Chocolate Suede', hex: '#4A3B32' },
      { name: 'Slate Gray Suede', hex: '#708090' }
    ],
    sizes: ['48 / S', '50 / M', '52 / L', '54 / XL'],
    description: 'The ultimate layering statement piece, crafted from velvety, ultra-supple lambskin suede. Tailored with soft, unstructured shoulders for a modern, relaxed-casual luxury drape.',
    details: [
      'Outer: 100% premium selected lambskin suede leather',
      'Lining: Full satin-silk interior lining for seamless layering',
      'Utility: Two patch pockets and a secure interior ticket pocket',
      'Real horn buttons and sleek notch lapels',
      'Hand-crafted by master leather artisans'
    ],
    stock: 7
  },
  {
    id: 'p8',
    name: 'The Heritage Leather Weekender Bag',
    price: 295,
    rating: 4.9,
    reviewsCount: 74,
    category: 'accessories',
    categoryName: 'Exclusive Accessories',
    mainImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#9E5B2F' },
      { name: 'Obsidian Black', hex: '#1E1E1E' }
    ],
    sizes: ['One Size (FAA Approved Carry-On)'],
    description: 'Designed for luxurious short escapes or high-end business travel, this duffel bag is handcrafted from full-grain, vegetable-tanned Tuscan leather that develops a beautiful unique patina over time.',
    details: [
      'Material: 100% full-grain, vegetable-tanned calfskin leather',
      'Hardware: Solid antique brass zippers and heavy-duty rivets',
      'Interior: Heavy-duty canvas lining with multiple zippered compartments',
      'Straps: Adjustable and detachable ergonomic leather shoulder strap',
      'Dimensions: 22" L x 10" W x 11" H (FAA carry-on approved size)'
    ],
    stock: 10,
    isNewArrival: true
  }
];
