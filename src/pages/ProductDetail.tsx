
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailComponent from '@/components/products/ProductDetail';
import { getProductById, Product } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to 404
        navigate('/not-found');
      }
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="animate-pulse w-12 h-12 rounded-full bg-primary/30"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="page-container">
          <ProductDetailComponent product={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
