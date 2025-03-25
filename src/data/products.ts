
export type ProductCategory = 
  | 'Vests'
  | 'Tights'
  | 'Rugby'
  | 'Netball'
  | 'Golfers'
  | 'T-Shirts'
  | 'Shorts'
  | 'Jackets'
  | 'Tracksuits'
  | 'Accessories';

export type ProductSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  sizes: ProductSize[];
  colors: string[];
  material: string;
  imageUrl: string;
  customizable: boolean;
  popular: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '001',
    name: 'Premium School Vest',
    category: 'Vests',
    description: 'High-quality breathable sports vest perfect for physical education classes and sports days.',
    price: 24.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000', '#ffffff'],
    material: '100% Polyester Dry-Fit',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true,
    featured: true
  },
  {
    id: '002',
    name: 'Performance Rugby Jersey',
    category: 'Rugby',
    description: 'Durable and professional grade rugby jersey for school teams and competitions.',
    price: 45.99,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000'],
    material: '95% Polyester, 5% Elastane',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true
  },
  {
    id: '003',
    name: 'School Sports Shorts',
    category: 'Shorts',
    description: 'Comfortable and lightweight sports shorts with moisture-wicking technology.',
    price: 19.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#1e3a8a', '#000000', '#ffffff'],
    material: '100% Polyester',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: false
  },
  {
    id: '004',
    name: 'Elite Netball Dress',
    category: 'Netball',
    description: 'Professional netball dress designed for maximum comfort and movement.',
    price: 42.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000'],
    material: '90% Polyester, 10% Elastane',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true,
    featured: true
  },
  {
    id: '005',
    name: 'School Tracksuit Jacket',
    category: 'Jackets',
    description: 'Stylish and warm tracksuit jacket with school colors and customizable design.',
    price: 54.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#000000'],
    material: '95% Polyester, 5% Elastane',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true
  },
  {
    id: '006',
    name: 'Performance Golf Shirt',
    category: 'Golfers',
    description: 'Classic polo-style golf shirt with moisture management and UV protection.',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000', '#ffffff'],
    material: '100% Polyester Pique',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: false,
    featured: true
  },
  {
    id: '007',
    name: 'Compression Tights',
    category: 'Tights',
    description: 'Professional-grade compression tights for enhanced performance and recovery.',
    price: 32.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#1e3a8a'],
    material: '80% Nylon, 20% Spandex',
    imageUrl: '/placeholder.svg',
    customizable: false,
    popular: true
  },
  {
    id: '008',
    name: 'School Sports T-Shirt',
    category: 'T-Shirts',
    description: 'Comfortable and breathable t-shirt for physical education and casual sports.',
    price: 18.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000', '#ffffff'],
    material: '100% Cotton',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true
  },
  {
    id: '009',
    name: 'Tracksuit Pants',
    category: 'Tracksuits',
    description: 'Comfortable tracksuit pants with tapered fit and zippered pockets.',
    price: 39.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#000000'],
    material: '95% Polyester, 5% Elastane',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: false
  },
  {
    id: '010',
    name: 'Sports Cap',
    category: 'Accessories',
    description: 'Adjustable sports cap with breathable fabric and customizable design.',
    price: 14.99,
    sizes: ['S', 'M', 'L'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000', '#ffffff'],
    material: '100% Polyester',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true
  },
  {
    id: '011',
    name: 'Winter School Jacket',
    category: 'Jackets',
    description: 'Insulated winter jacket with water-resistant outer layer, perfect for cold weather.',
    price: 69.99,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1e3a8a', '#000000'],
    material: 'Outer: 100% Polyester, Inner: Thermal Fleece',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: true,
    featured: true
  },
  {
    id: '012',
    name: 'Sleeveless Performance Vest',
    category: 'Vests',
    description: 'Lightweight training vest designed for intense workouts and competitions.',
    price: 22.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#1e3a8a', '#dc2626', '#16a34a', '#000000', '#ffffff'],
    material: '100% Polyester Mesh',
    imageUrl: '/placeholder.svg',
    customizable: true,
    popular: false
  }
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getPopularProducts = (limit: number = 6): Product[] => {
  return products.filter(product => product.popular).slice(0, limit);
};

export const getProductCategories = (): ProductCategory[] => {
  return [...new Set(products.map(product => product.category))];
};
