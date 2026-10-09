import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <Heart size={48} className="text-neutral-200 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight mb-4">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-neutral-500 mb-8">Save items you love here to easily find them later.</p>
        <Link to="/shop" className="bg-neutral-900 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 min-h-screen">
      <h1 className="text-4xl font-bold tracking-tight mb-2">WISHLIST</h1>
      <p className="text-neutral-500 mb-12">{wishlist.length} Items</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
