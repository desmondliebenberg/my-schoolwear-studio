
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">My Schoolwear Hub</h3>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for high-quality, customizable school sportswear and uniforms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link to="/customizer" className="hover:text-accent transition-colors">Customize</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=Vests" className="hover:text-accent transition-colors">Vests</Link></li>
              <li><Link to="/products?category=Rugby" className="hover:text-accent transition-colors">Rugby</Link></li>
              <li><Link to="/products?category=Netball" className="hover:text-accent transition-colors">Netball</Link></li>
              <li><Link to="/products?category=Jackets" className="hover:text-accent transition-colors">Jackets</Link></li>
              <li><Link to="/products?category=T-Shirts" className="hover:text-accent transition-colors">T-Shirts</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@myschoolwearhub.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2" />
                +27 (0) 123 456 7890
              </p>
              <p>123 Fashion Street<br/>Design District<br/>Cape Town, 8001</p>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} My Schoolwear Hub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/shipping" className="hover:text-accent transition-colors">Shipping</Link>
            <Link to="/returns" className="hover:text-accent transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
