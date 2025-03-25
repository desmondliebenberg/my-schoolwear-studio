
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  ShoppingBag,
  Home,
  Shirt,
  Heart,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getItemCount } = useCart();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Handle scroll effect with animated transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu and search close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-item-active' : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      {/* Announcement Bar */}
      <div className="bg-accent text-accent-foreground py-2 text-center text-sm font-medium animate-slide-in">
        <p>Free shipping on orders over $50! Use code <span className="font-bold">FREESHIP</span> at checkout</p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-primary transition-all duration-300 hover:text-glow">
              CustomShop Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
            <Link to="/products" className={`nav-item ${isActive('/products')}`}>Products</Link>
            <Link to="/customizer" className={`nav-item ${isActive('/customizer')}`}>Customize</Link>
            <Link to="/about" className={`nav-item ${isActive('/about')}`}>About</Link>
            <Link to="/contact" className={`nav-item ${isActive('/contact')}`}>Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hover:bg-primary/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch}
              className="hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Saved Designs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="hover:bg-primary/10 relative"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-accent text-white">
                    {getItemCount()}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-primary/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="animate-fade-in pt-2 pb-4 px-4">
            <div className="flex items-center w-full">
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="w-full" 
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={toggleSearch} className="ml-2">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in bg-white dark:bg-gray-900 shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            <Link to="/" className={`flex items-center p-2 hover:bg-primary/5 rounded-md ${isActive('/')}`}>
              <Home className="mr-3 h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/products" className={`flex items-center p-2 hover:bg-primary/5 rounded-md ${isActive('/products')}`}>
              <Shirt className="mr-3 h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link to="/customizer" className={`flex items-center p-2 hover:bg-primary/5 rounded-md ${isActive('/customizer')}`}>
              <ShoppingBag className="mr-3 h-5 w-5" />
              <span>Customize</span>
            </Link>
            <Link to="/about" className={`flex items-center p-2 hover:bg-primary/5 rounded-md ${isActive('/about')}`}>
              <span className="ml-8">About</span>
            </Link>
            <Link to="/contact" className={`flex items-center p-2 hover:bg-primary/5 rounded-md ${isActive('/contact')}`}>
              <span className="ml-8">Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
