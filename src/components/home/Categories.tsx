
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductCategories } from '@/data/products';
import { motion } from 'framer-motion';
import { CategoryButton } from '../ui/CategoryButton';

const Categories: React.FC = () => {
  const categories = getProductCategories();
  
  // Map category names to icon names (placeholder for now)
  const categoryIcons: Record<string, string> = {
    'Vests': 'jersey',
    'Tights': 'pants',
    'Rugby': 'rugby',
    'Netball': 'dress',
    'Golfers': 'shirt',
    'T-Shirts': 'tshirt',
    'Shorts': 'shorts',
    'Jackets': 'jacket',
    'Tracksuits': 'tracksuit',
    'Accessories': 'cap'
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Browse our wide range of high-quality sportswear categories for your school team needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <CategoryButton 
              key={category}
              category={category}
              icon={categoryIcons[category] || 'default'}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
