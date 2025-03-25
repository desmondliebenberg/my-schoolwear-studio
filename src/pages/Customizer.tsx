
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomizerStudio from '@/components/customizer/CustomizerStudio';
import { getProductById, Product } from '@/data/products';

const Customizer = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If no product ID is provided, get a default customizable product
    if (!id) {
      // Get the first customizable product
      const customizableProducts = getProductById('001');
      if (customizableProducts) {
        setProduct(customizableProducts);
      } else {
        // No customizable products found, redirect to products page
        navigate('/products');
      }
    } else {
      // Get the specific product
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        if (foundProduct.customizable) {
          setProduct(foundProduct);
        } else {
          // Product is not customizable, redirect to product detail
          navigate(`/product/${id}`);
        }
      } else {
        // Product not found, redirect to 404
        navigate('/not-found');
      }
    }
    
    setLoading(false);
  }, [id, navigate, location]);

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
          <CustomizerStudio product={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Customizer;
