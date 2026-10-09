import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [activeAccordion, setActiveAccordion] = useState('details');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.availableColors[0]);
      setActiveImage(0);
      setSelectedSize('');
      setQuantity(1);
      setError('');
    }
  }, [product]);

  if (!product) {
    return <div className="pt-32 text-center h-screen">Product not found.</div>;
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative">
            <img 
              src={product.imageUrls[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300" 
            />
          </div>
          {product.imageUrls.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.imageUrls.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-24 flex-shrink-0 border-2 transition-colors ${activeImage === idx ? 'border-neutral-900' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Details */}
        <div className="w-full md:w-1/2 md:py-10 flex flex-col">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 text-xl mb-8">
            <span>${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-neutral-400 line-through">${product.compareAtPrice}</span>
            )}
          </div>
          
          <p className="text-neutral-600 leading-relaxed mb-10">
            {product.description}
          </p>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold tracking-widest uppercase">Color: {selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {product.availableColors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-neutral-900' : 'border-transparent'} flex items-center justify-center relative`}
                  title={color}
                >
                  <span className={`block w-6 h-6 rounded-full ${color.toLowerCase() === 'black' ? 'bg-black' : color.toLowerCase() === 'charcoal' ? 'bg-[#333]' : color.toLowerCase() === 'olive' ? 'bg-[#556B2F]' : color.toLowerCase() === 'navy' ? 'bg-[#000080]' : color.toLowerCase() === 'silver' ? 'bg-[#C0C0C0]' : color.toLowerCase() === 'tan' ? 'bg-[#D2B48C]' : color.toLowerCase() === 'beige' ? 'bg-[#F5F5DC]' : color.toLowerCase() === 'cream' ? 'bg-[#FFFDD0]' : color.toLowerCase() === 'grey' ? 'bg-gray-500' : 'bg-neutral-200'}`}></span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold tracking-widest uppercase">Size</span>
              <button className="text-xs text-neutral-500 underline uppercase tracking-widest hover:text-neutral-900 transition-colors">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(''); }}
                  className={`py-3 text-sm font-medium border transition-colors ${selectedSize === size ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 hover:border-neutral-900 text-neutral-900'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-600 text-xs mt-2 font-medium">{error}</p>}
          </div>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-neutral-200">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-neutral-50 transition-colors">-</button>
              <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-neutral-50 transition-colors">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-neutral-900 text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className={`p-4 border transition-colors ${isWishlisted ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-900'}`}
              aria-label="Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? "black" : "none"} />
            </button>
          </div>
          
          <div className="border-t border-neutral-200 pt-6 mt-4">
            <button 
              className="flex justify-between w-full py-4 text-sm font-bold tracking-widest uppercase"
              onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
            >
              Materials & Details
              {activeAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {activeAccordion === 'details' && (
              <div className="pb-6 text-sm text-neutral-600 leading-relaxed">
                <p className="mb-2"><strong>Materials:</strong> {product.materials}</p>
                <p>Designed and engineered to our exact specifications. Dry clean only. Do not bleach.</p>
              </div>
            )}
            
            <button 
              className="flex justify-between w-full py-4 text-sm font-bold tracking-widest uppercase border-t border-neutral-100"
              onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
            >
              Shipping & Returns
              {activeAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {activeAccordion === 'shipping' && (
              <div className="pb-6 text-sm text-neutral-600 leading-relaxed">
                <p className="mb-2">Complimentary express shipping on orders over $300.</p>
                <p>30-day return policy for unworn items with tags attached.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-6 md:px-12 mt-32">
          <h2 className="text-2xl font-bold tracking-tight mb-10 text-center uppercase">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
