
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { getProductCategories, products } from '@/data/products';

const Products = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('All Products');
  
  // Extract category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setPageTitle(`${category}`);
    } else {
      setPageTitle('All Products');
    }
  }, [location.search]);
  
  const categories = getProductCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="page-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">
              Browse our collection of high-quality school sportswear
            </p>
          </div>
          
          <ProductGrid products={products} categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
