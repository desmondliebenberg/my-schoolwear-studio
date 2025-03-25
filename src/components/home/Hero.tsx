
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/10 animate-bounce-subtle"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-12 z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left md:pr-8 animate-fade-in">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> 
                Premium School Sportswear
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-4 text-balance">
              Custom Sportswear <br className="hidden md:block" />
              For Your School Team
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto md:mx-0">
              High-quality, customizable sportswear designed for school teams, clubs, and sports days. Create your perfect kit with our easy-to-use design studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="group">
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/customizer">Design Your Own</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1 mt-12 md:mt-0 animate-scale-in">
            <div className="glass-card p-3 max-w-md mx-auto aspect-[3/4] transition-transform hover:scale-[1.01] duration-500">
              <div className="bg-muted rounded-lg h-full w-full flex items-center justify-center">
                <div className="relative">
                  <span className="animate-pulse absolute -top-3 -right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Customizable
                  </span>
                  <img 
                    src="/placeholder.svg" 
                    alt="Customizable school sportswear" 
                    className="max-h-[70vh] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
