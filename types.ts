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

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: Color;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  role?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
