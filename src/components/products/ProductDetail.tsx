
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  CircleCheck,
  ShoppingCart,
  Pencil,
  ChevronRight,
  Info,
  Star
} from 'lucide-react';
import { Product, ProductSize } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  const handleCustomize = () => {
    navigate(`/customizer/${product.id}?size=${selectedSize}&color=${selectedColor}`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="pt-4">
      <div className="flex items-center mb-4 text-sm">
        <Link to="/products" className="text-muted-foreground hover:text-primary flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{product.category}</span>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        {/* Product Image */}
        <div className="glass-card p-6 rounded-xl overflow-hidden">
          <div className="relative aspect-square bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
            {product.customizable && (
              <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 text-primary">
                Customizable
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium">5.0 (12 reviews)</span>
              </div>
              <Separator orientation="vertical" className="mx-4 h-4" />
              <span className="text-sm">{product.category}</span>
            </div>
            <p className="text-2xl font-bold text-primary mb-4">R{product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-col space-y-6">
            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full transition ${
                      selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  >
                    {selectedColor === color && (
                      <CircleCheck className="h-4 w-4 text-white m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Size</h3>
                <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full btn-hover"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              {product.customizable && (
                <Button 
                  variant="outline" 
                  onClick={handleCustomize}
                  className="w-full btn-hover"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              )}
            </div>

            {/* Product Info Alert */}
            <Alert>
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="ml-2 text-sm text-muted-foreground">
                Bulk order discounts available. Contact us for school team packages.
              </AlertDescription>
            </Alert>
          </div>

          {/* Product Details */}
          <div className="pt-4">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="materials" className="flex-1">Materials</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4 animate-fade-in">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>High-performance fabric</li>
                        <li>Moisture-wicking technology</li>
                        <li>Durable construction</li>
                        <li>Professional-grade quality</li>
                        <li>School sports-ready design</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="customization">
                    <AccordionTrigger>Customization Options</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        This product can be customized with:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>School logos</li>
                        <li>Player names and numbers</li>
                        <li>Team branding</li>
                        <li>Custom colors (minimum order quantities may apply)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care">
                    <AccordionTrigger>Care Instructions</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Machine wash cold</li>
                        <li>Do not bleach</li>
                        <li>Tumble dry low</li>
                        <li>Do not iron print/logo</li>
                        <li>Do not dry clean</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="materials" className="pt-4 animate-fade-in">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p><strong>Material Composition:</strong> {product.material}</p>
                  <p><strong>Fabric Weight:</strong> Medium weight, 180-200 gsm</p>
                  <p><strong>Properties:</strong> Breathable, quick-drying, durable, and color-fast</p>
                  <p><strong>Finish:</strong> Professional-grade stitching with reinforced seams</p>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4 animate-fade-in">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Standard Shipping:</strong> 3-5 business days
                  </p>
                  <p>
                    <strong>Express Shipping:</strong> 1-2 business days (additional fees apply)
                  </p>
                  <p>
                    <strong>Bulk Orders:</strong> Please allow 7-10 business days for school team orders
                  </p>
                  <p>
                    <strong>Customized Items:</strong> Additional 3-5 business days for production
                  </p>
                  <p className="text-xs mt-4">
                    Note: Shipping times may vary during peak seasons. Contact us for rush orders.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
