import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { products } from '../data/products.js';
import { motion, AnimatePresence } from 'motion/react';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const searchResults = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleProductClick = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-[60] flex flex-col"
        >
          <div className="container mx-auto px-6 md:px-12 py-8 flex justify-between items-center border-b border-neutral-100">
            <h2 className="text-sm font-bold tracking-widest uppercase">Search</h2>
            <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 py-12 flex-grow flex flex-col max-w-4xl">
            <div className="relative border-b-2 border-neutral-900 pb-4 flex items-center gap-4">
              <Search size={32} className="text-neutral-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search products or categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-2xl md:text-4xl bg-transparent border-none outline-none placeholder-neutral-300 font-medium"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-neutral-900">
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="mt-12 flex-grow overflow-y-auto">
              {query && searchResults.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.map(product => (
                      <div 
                        key={product.id} 
                        className="flex gap-4 cursor-pointer group hover:bg-neutral-50 p-4 transition-colors rounded"
                        onClick={() => handleProductClick(product.slug)}
                      >
                        <div className="w-16 h-20 bg-neutral-100 flex-shrink-0">
                          <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold group-hover:underline">{product.name}</h4>
                          <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
                          <p className="text-sm font-medium">${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : query && searchResults.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-neutral-500">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="mt-8">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">Popular Categories</h3>
                  <div className="flex flex-wrap gap-4">
                    {['Puffer Jackets', 'Leather Jackets', 'Bomber Jackets'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {
                          onClose();
                          navigate(`/shop?category=${cat.replace(' ', '+')}`);
                        }}
                        className="px-6 py-3 border border-neutral-200 text-sm font-medium hover:border-neutral-900 transition-colors rounded-full"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
