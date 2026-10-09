import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { motion } from 'motion/react';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.imageUrls[1] && (
            <img 
              src={product.imageUrls[1]} 
              alt={`${product.name} alternate`} 
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
        
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur text-neutral-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={isWishlisted ? "black" : "none"} />
        </button>
        
        {(product.compareAtPrice || product.featured) && (
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.compareAtPrice && (
              <span className="bg-red-600 text-white text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
                Sale
              </span>
            )}
            {product.featured && (
              <span className="bg-neutral-900 text-white text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
                New
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium mb-1 truncate">
          <Link to={`/product/${product.slug}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="text-xs text-neutral-500 mb-2">{product.category}</p>
        <div className="flex items-center gap-2 text-sm mt-auto">
          <span>${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-neutral-400 line-through">${product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
