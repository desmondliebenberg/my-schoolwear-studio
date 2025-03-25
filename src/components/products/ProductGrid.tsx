
import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '@/data/products';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductGridProps {
  products: Product[];
  categories?: ProductCategory[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get min and max prices from products
  const priceMin = Math.min(...products.map(p => p.price));
  const priceMax = Math.max(...products.map(p => p.price));
  
  // Update price range based on available products
  useEffect(() => {
    setPriceRange([priceMin, priceMax]);
  }, [priceMin, priceMax]);
  
  // Filter products when any filter changes
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply customizable filter
    if (isCustomizable) {
      result = result.filter(product => product.customizable);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, isCustomizable, priceRange]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setIsCustomizable(false);
    setPriceRange([priceMin, priceMax]);
  };
  
  return (
    <div className="w-full">
      {/* Top Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus:ring-2 focus:ring-ring"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button
          variant="outline"
          className="sm:w-auto min-w-[120px] flex-shrink-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="col-span-1 animate-fade-in space-y-6 glass-card p-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <div className="mb-6">
                <Slider
                  value={priceRange}
                  min={priceMin}
                  max={priceMax}
                  step={1}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>R{priceRange[0].toFixed(2)}</span>
                <span>R{priceRange[1].toFixed(2)}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customizable"
                checked={isCustomizable}
                onCheckedChange={(checked) => setIsCustomizable(checked as boolean)}
              />
              <label
                htmlFor="customizable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Customizable Only
              </label>
            </div>
            
            <Separator />
            
            <Button variant="outline" onClick={resetFilters} className="w-full">
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Product Grid */}
        <div className={`${showFilters ? 'col-span-1 lg:col-span-3' : 'col-span-1 lg:col-span-4'}`}>
          {/* Active filters */}
          {(searchTerm || selectedCategory !== 'all' || isCustomizable || 
            priceRange[0] > priceMin || priceRange[1] < priceMax) && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active Filters:</span>
              
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setSelectedCategory('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {isCustomizable && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Customizable
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setIsCustomizable(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {(priceRange[0] > priceMin || priceRange[1] < priceMax) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: R{priceRange[0].toFixed(0)} - R{priceRange[1].toFixed(0)}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setPriceRange([priceMin, priceMax])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs ml-auto" 
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-lg border border-border/50">
              <div className="mb-4 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-sm max-w-md">
                  We couldn't find any products matching your current filters. Try adjusting your search criteria.
                </p>
              </div>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
