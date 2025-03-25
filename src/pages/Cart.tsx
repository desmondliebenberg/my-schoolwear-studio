
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="page-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
            <p className="text-muted-foreground">
              Review your items before checkout
            </p>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet.
                Browse our products and start shopping!
              </p>
              <Button asChild>
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Items ({items.length})</h2>
                    <Link to="/products" className="text-sm text-primary flex items-center">
                      <ArrowLeft className="h-3 w-3 mr-1" />
                      Continue Shopping
                    </Link>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <CartItem key={`${item.product.id}-${index}`} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
