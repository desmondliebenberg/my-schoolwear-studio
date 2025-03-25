
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '@/data/products';
import {
  Shirt,
  Scissors,
  Ruler,
  Medal,
  Heart,
  ShoppingBag
} from 'lucide-react';

interface CategoryButtonProps {
  category: ProductCategory;
  icon: string;
  delay?: number;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ category, icon, delay = 0 }) => {
  // Map icons to Lucide components
  const getIcon = () => {
    switch (category) {
      case 'Vests':
        return <Shirt className="h-6 w-6" />;
      case 'Tights':
        return <Shirt className="h-6 w-6" />; // Changed from PantsShort to Shirt
      case 'Rugby':
        return <Medal className="h-6 w-6" />;
      case 'Netball':
        return <Heart className="h-6 w-6" />;
      case 'Golfers':
        return <Shirt className="h-6 w-6" />;
      case 'T-Shirts':
        return <Shirt className="h-6 w-6" />;
      case 'Shorts':
        return <Scissors className="h-6 w-6" />;
      case 'Jackets':
        return <ShoppingBag className="h-6 w-6" />;
      case 'Tracksuits':
        return <Shirt className="h-6 w-6" />; // Changed from PantsShort to Shirt
      case 'Accessories':
        return <Ruler className="h-6 w-6" />;
      default:
        return <Shirt className="h-6 w-6" />;
    }
  };

  return (
    <Link
      to={`/products?category=${category}`}
      className="block"
    >
      <div className="group glass-card p-4 rounded-xl text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
          {getIcon()}
        </div>
        <h3 className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
          {category}
        </h3>
      </div>
    </Link>
  );
};
