
import React, { useState } from 'react';
import { getFeaturedProducts, getPopularProducts } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '../products/ProductCard';

const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const featuredProducts = getFeaturedProducts();
  const popularProducts = getPopularProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Explore Our Collection</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover our high-quality sportswear, designed for performance, comfort and style.
          </p>
        </div>

        <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/50 backdrop-blur-sm">
              <TabsTrigger value="featured" className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-800">
                Featured Products
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-800">
                Popular Items
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="featured" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProducts;
