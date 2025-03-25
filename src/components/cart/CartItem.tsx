
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity, size, color, customization } = item;
  const { updateQuantity, removeItem } = useCart();
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="py-4 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden w-20 h-20 flex-shrink-0">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between">
            <Link 
              to={`/product/${product.id}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1 mt-1">
            <p>Size: {size}</p>
            <div className="flex items-center">
              <span className="mr-1">Color:</span>
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: color || '#000000' }}
              ></div>
            </div>
            {customization?.text && (
              <p>Custom Text: {customization.text}</p>
            )}
            {customization?.logo && (
              <p>Logo: Custom</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        {/* Quantity Controls */}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center font-medium text-sm">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrement}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Price */}
        <div className="text-right">
          <p className="font-medium">R{(product.price * quantity).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{quantity} × R{product.price.toFixed(2)}</p>
        </div>
      </div>
      
      <Separator className="mt-4" />
    </div>
  );
};

export default CartItem;
