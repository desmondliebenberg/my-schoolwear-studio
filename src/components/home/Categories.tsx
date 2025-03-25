
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductCategories } from '@/data/products';

const Categories: React.FC = () => {
  // Define our new categories based on the image
  const displayCategories = [
    'All',
    'T-Shirts',
    'Pants',
    'Hoodies',
    'Jackets',
    'Shirts',
    'Shorts',
    'Sweaters'
  ];
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Shop Collection</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {displayCategories.map((category) => (
            <Link
              key={category}
              to={category === 'All' ? '/products' : `/products?category=${category}`}
              onClick={() => setActiveCategory(category)}
              className={`inline-block px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
