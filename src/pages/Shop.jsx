import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = ['All', 'Puffer Jackets', 'Leather Jackets', 'Bomber Jackets', 'Everyday Outerwear'];
  
  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  let filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);
  
  if (activeSort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else {
    // featured
    filteredProducts.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
  }

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 md:px-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-neutral-200 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">THE COLLECTION</h1>
          <p className="text-neutral-500">{filteredProducts.length} Products</p>
        </div>
        
        <div className="hidden md:flex items-center gap-6 mt-6 md:mt-0">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-neutral-400 uppercase tracking-widest text-xs">Sort:</span>
            <select 
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <button 
          className="md:hidden flex items-center gap-2 mt-6 text-sm font-bold tracking-widest uppercase border border-neutral-200 px-4 py-2"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter size={16} /> Filters & Sort
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Categories</h3>
            <ul className="flex flex-col gap-4">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`text-sm text-left transition-colors ${activeCategory === cat ? 'font-bold text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="text-xl font-medium mb-4">No products found</h3>
              <p className="text-neutral-500 mb-8">Try adjusting your filters.</p>
              <button 
                onClick={() => handleCategoryChange('All')}
                className="bg-neutral-900 text-white px-8 py-3 text-sm font-bold tracking-widest uppercase"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/50 z-50 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
                <h2 className="text-lg font-bold tracking-widest uppercase">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Sort By</h3>
                <select 
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 p-3 outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Categories</h3>
                <ul className="flex flex-col gap-4">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        className={`text-sm w-full text-left p-2 rounded transition-colors ${activeCategory === cat ? 'bg-neutral-100 font-bold' : 'text-neutral-500'}`}
                        onClick={() => handleCategoryChange(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-neutral-900 text-white py-4 text-sm font-bold tracking-widest uppercase"
                >
                  Apply & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
