
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CartSummary: React.FC = () => {
  const { getCartTotal, clearCart, items } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const subtotal = getCartTotal();
  const shipping = 75; // Fixed shipping cost
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully! Redirecting to confirmation page...");
      
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        navigate('/');
      }, 1500);
    }, 2000);
  };
  
  const hasCustomItems = items.some(item => item.customization?.text || item.customization?.logo);

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>R{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>R{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">VAT (15%)</span>
          <span>R{tax.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>R{total.toFixed(2)}</span>
        </div>
      </div>
      
      {hasCustomItems && (
        <Alert className="mt-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-xs">
            Your order contains customized items. Please allow an additional 3-5 business days for production.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mt-6 space-y-3">
        <Button 
          className="w-full"
          onClick={handleCheckout}
          disabled={isProcessing || items.length === 0}
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 mt-2">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
