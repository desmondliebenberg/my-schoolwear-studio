
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About My Schoolwear Hub</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground mb-6">
                We provide high-quality customizable sportswear and school uniforms for educational institutions across the country.
              </p>
              
              <div className="grid gap-8 md:grid-cols-2 my-12">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p>To provide schools with accessible, high-quality, customizable sportswear that represents their unique identity and instills pride in their students.</p>
                </div>
                
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p>To be the leading provider of school sportswear, known for quality, durability, and exceptional customer service.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-6">Our Story</h2>
              <p>
                My Schoolwear Hub was founded in 2015 with a simple mission: to help schools create sportswear that truly represents their spirit and identity. 
                What started as a small operation has grown into a trusted partner for schools nationwide.
              </p>
              
              <p>
                We understand that school sportswear is more than just clothing – it's a symbol of pride, unity, and belonging. 
                That's why we put so much care into every item we produce, from design to delivery.
              </p>
              
              <h2 className="text-2xl font-bold mt-12 mb-6">Our Values</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li><strong>Quality:</strong> We never compromise on the materials we use or the craftsmanship we apply.</li>
                <li><strong>Reliability:</strong> Schools and students depend on us, and we take that responsibility seriously.</li>
                <li><strong>Innovation:</strong> We continuously seek better ways to serve our customers through new designs and technologies.</li>
                <li><strong>Sustainability:</strong> We're committed to reducing our environmental impact through responsible production practices.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
