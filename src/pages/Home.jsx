import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = [...products].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1549643276-fdf2fab574f5?auto=format&fit=crop&q=80&w=2400" 
            alt="Model wearing Vanta jacket" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-neutral-900/30"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6 mt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6"
          >
            Vanta Winter '26
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            BUILT FOR <br/>THE COLD.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-neutral-200 max-w-md mx-auto mb-10"
          >
            Engineered outerwear. Uncompromising attitude.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop" className="bg-white text-neutral-900 px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors">
              Explore Collection
            </Link>
            <Link to="/shop" className="border border-white text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-6 md:px-12 container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold tracking-tight">THE OUTERWEAR EDIT</h2>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-neutral-500 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-neutral-500 transition-colors border-b border-neutral-900 pb-1">
            View All Collection
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        {[
          { name: "Puffer Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800" },
          { name: "Leather Jackets", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800" },
          { name: "Bomber Jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" },
          { name: "Everyday Outerwear", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800" }
        ].map((cat, idx) => (
          <Link to={`/shop?category=${cat.name.replace(' ', '+')}`} key={idx} className="relative aspect-square group overflow-hidden">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold tracking-widest uppercase">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </section>

      {/* Editorial Split */}
      <section className="flex flex-col md:flex-row w-full bg-neutral-100">
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-auto md:h-screen relative">
          <img 
            src="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=1200" 
            alt="Editorial campaign" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 h-auto md:h-screen">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">MORE THAN OUTERWEAR.</h2>
            <p className="text-neutral-500 text-lg mb-10 leading-relaxed">
              Designed for the elements. Made for your own rules. Our pieces are engineered to perform in the harshest conditions without compromising on aesthetic precision.
            </p>
            <Link to="/shop" className="bg-neutral-900 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors inline-block">
              Discover Vanta
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 border-y border-neutral-200">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Premium Materials</h3>
            <p className="text-neutral-500 text-sm">Sourced from the world's leading mills, our fabrics are rigorously tested for durability and performance.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Reliable Shipping</h3>
            <p className="text-neutral-500 text-sm">Complimentary express shipping on all orders over $300. Fully tracked from our warehouse to your door.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Easy Returns</h3>
            <p className="text-neutral-500 text-sm">Not quite right? Return your unworn items within 30 days for a full refund or exchange.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
