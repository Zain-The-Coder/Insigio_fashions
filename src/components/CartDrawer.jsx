import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { motion, AnimatePresence } from 'motion/react';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-neutral-900/50 z-50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.4, ease: "anticipate" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-lg font-bold tracking-widest uppercase flex items-center gap-2">
                <ShoppingBag size={20} /> Your Bag
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-6">
                  <ShoppingBag size={48} className="text-neutral-300" />
                  <p className="text-lg font-medium">Your bag is empty.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                    className="mt-4 bg-neutral-900 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-24 h-32 bg-neutral-100 flex-shrink-0">
                        <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-medium"><Link to={`/product/${item.slug}`} onClick={() => setIsCartOpen(false)} className="hover:underline">{item.name}</Link></h3>
                          <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500 mb-2">Color: {item.color} | Size: {item.size}</p>
                        <p className="text-sm font-medium mb-auto">${item.price}</p>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center border border-neutral-200 w-fit">
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="px-2 py-1 hover:bg-neutral-50">-</button>
                            <span className="px-2 py-1 text-xs min-w-[2rem] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="px-2 py-1 hover:bg-neutral-50">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-white">
                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <p className="text-xs text-neutral-500 mb-6 uppercase tracking-widest text-center">Shipping and taxes calculated at checkout.</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-neutral-900 text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                  >
                    Checkout
                  </button>
                  <button 
                    onClick={handleViewCart}
                    className="w-full bg-white text-neutral-900 py-4 text-sm font-bold tracking-widest uppercase border border-neutral-900 hover:bg-neutral-50 transition-colors"
                  >
                    View Bag
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
