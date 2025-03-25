import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Upload, 
  ArrowLeft, 
  ShoppingCart, 
  Undo, 
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  Text,
  Image as ImageIcon,
  Palette,
  ArrowRight,
  Check
} from 'lucide-react';
import { Product } from '@/data/products';
import { useCustomization } from '@/hooks/useCustomization';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

interface CustomizerStudioProps {
  product: Product;
}

const CustomizerStudio: React.FC<CustomizerStudioProps> = ({ product }) => {
  const {
    options,
    logoPreview,
    updateText,
    updateTextColor,
    updateTextFont,
    updateLogoPosition,
    handleLogoUpload,
    resetCustomization
  } = useCustomization();
  
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [textSize, setTextSize] = useState(24);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const steps = [
    { title: "Product", description: "Choose base product" },
    { title: "Design", description: "Add text and images" },
    { title: "Preview", description: "Review your design" },
  ];

  const textFonts = [
    { label: "Sans Serif", value: "'Inter', sans-serif" },
    { label: "Serif", value: "'Merriweather', serif" },
    { label: "Monospace", value: "'JetBrains Mono', monospace" },
    { label: "Display", value: "'Bebas Neue', cursive" },
    { label: "Handwritten", value: "'Caveat', cursive" }
  ];

  const handleLogoUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Please upload an image smaller than 5MB.");
        return;
      }
      
      handleLogoUpload(file);
      toast.success("Logo uploaded successfully");
    }
  };

  const addToCart = () => {
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      customization: options
    });
    
    navigate('/cart');
  };

  const saveDesign = () => {
    // In a real app, this would save to a user's account
    toast.success("Design saved successfully");
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <Link to="/products" className="flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        <h1 className="text-xl font-bold">Customization Studio</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveDesign}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={resetCustomization}>
            <RefreshCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div className={`flex-1 h-0.5 ${index <= activeStep ? 'bg-primary' : 'bg-muted'}`} />
              )}
              <div 
                className={`relative flex flex-col items-center ${
                  index <= activeStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index < activeStep 
                      ? 'bg-primary text-primary-foreground' 
                      : index === activeStep 
                      ? 'border-2 border-primary text-primary' 
                      : 'border-2 border-muted text-muted-foreground'
                  }`}
                >
                  {index < activeStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="absolute -bottom-6 text-center w-24">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs opacity-70 hidden sm:block">{step.description}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
        {/* Product Preview */}
        <div className="glass-card p-6 rounded-xl overflow-hidden">
          <div className="relative aspect-square bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <div 
              className="w-full h-full relative" 
              style={{ backgroundColor: selectedColor }}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
              
              {/* Text Customization */}
              {options.text && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ 
                    color: options.textColor || 'white',
                    fontFamily: options.textFont || "'Inter', sans-serif",
                    fontSize: `${textSize}px`,
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                  }}
                >
                  {options.text}
                </div>
              )}
              
              {/* Logo Customization */}
              {logoPreview && (
                <div 
                  className={`absolute ${
                    options.logoPosition === 'left' 
                      ? 'top-4 left-4' 
                      : options.logoPosition === 'right' 
                      ? 'top-4 right-4' 
                      : 'top-4 left-1/2 transform -translate-x-1/2'
                  }`}
                >
                  <img 
                    src={logoPreview} 
                    alt="Custom Logo" 
                    className="max-w-[100px] max-h-[100px] object-contain"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p className="text-muted-foreground">Size: {selectedSize} | Color: {selectedColor}</p>
          </div>
        </div>

        {/* Customization Controls */}
        <div>
          {activeStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Product Options</h2>
              
              {/* Color Selection */}
              <div>
                <Label htmlFor="color-select">Color</Label>
                <div className="flex space-x-2 mt-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full transition ${
                        selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div>
                <Label htmlFor="size-select">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full mt-2">
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
              
              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center mt-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(`/product/${product.id}`)}>
                  Cancel
                </Button>
                <Button onClick={nextStep}>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Design Customization</h2>
              
              <Tabs defaultValue="text">
                <TabsList className="w-full">
                  <TabsTrigger value="text" className="w-1/2">
                    <Text className="h-4 w-4 mr-2" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="images" className="w-1/2">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Images
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4 pt-4 animate-fade-in">
                  <div>
                    <Label htmlFor="custom-text">Custom Text</Label>
                    <Input
                      id="custom-text"
                      placeholder="Enter text for your design"
                      value={options.text || ''}
                      onChange={(e) => updateText(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex space-x-2 mt-2">
                      {['#FFFFFF', '#000000', '#FF0000', '#0000FF', '#FFFF00'].map(color => (
                        <button
                          key={color}
                          onClick={() => updateTextColor(color)}
                          className={`h-8 w-8 rounded-full transition ${
                            options.textColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Text color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="text-font">Text Font</Label>
                    <Select 
                      value={options.textFont || textFonts[0].value} 
                      onValueChange={updateTextFont}
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        {textFonts.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            <span style={{ fontFamily: font.value }}>{font.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="text-size">Text Size</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm">Small</span>
                      <Slider
                        value={[textSize]}
                        min={12}
                        max={72}
                        step={1}
                        onValueChange={(value) => setTextSize(value[0])}
                        className="flex-1"
                      />
                      <span className="text-sm">Large</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="images" className="space-y-4 pt-4 animate-fade-in">
                  <div>
                    <Label>Upload Logo</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      
                      {logoPreview ? (
                        <div className="space-y-3">
                          <img 
                            src={logoPreview} 
                            alt="Logo Preview" 
                            className="max-h-32 mx-auto" 
                          />
                          <Button variant="outline" onClick={handleLogoUploadClick}>
                            Change Logo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            SVG, PNG, JPG (max. 5MB)
                          </p>
                          <Button variant="outline" onClick={handleLogoUploadClick}>
                            Select File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="logo-position">Logo Position</Label>
                    <Select 
                      value={options.logoPosition || 'center'} 
                      onValueChange={(value) => updateLogoPosition(value as 'left' | 'right' | 'center')}
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Preview <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="glass-card p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product:</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center">
                      <div 
                        className="h-4 w-4 rounded-full mr-2" 
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                      <span className="font-medium">{selectedColor}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom Text:</span>
                    <span className="font-medium">{options.text || 'None'}</span>
                  </div>
                  {options.textColor && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Text Color:</span>
                      <div className="flex items-center">
                        <div 
                          className="h-4 w-4 rounded-full mr-2" 
                          style={{ backgroundColor: options.textColor }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Logo:</span>
                    <span className="font-medium">{logoPreview ? 'Custom' : 'None'}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>R{(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-6">
                  By proceeding, you confirm that you have the necessary rights to use any uploaded images or logos. 
                  Custom orders cannot be returned unless there is a manufacturing defect.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={saveDesign}>
                    <Save className="mr-2 h-4 w-4" /> Save Design
                  </Button>
                  <Button onClick={addToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizerStudio;
