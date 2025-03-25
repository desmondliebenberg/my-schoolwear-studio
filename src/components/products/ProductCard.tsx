
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      product,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/50 bg-card/80 backdrop-blur-sm">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {product.customizable && (
            <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 text-primary">
              Customizable
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {product.category}
          </p>
          <p className="font-bold text-lg">
            R{product.price.toFixed(2)}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 gap-2 flex">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full btn-hover"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          {product.customizable && (
            <Button 
              variant="ghost" 
              size="icon"
              className="btn-hover"
              asChild
            >
              <Link to={`/customizer/${product.id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
