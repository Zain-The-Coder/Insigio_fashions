import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">YOUR BAG IS EMPTY</h1>
        <p className="text-neutral-500 mb-8">Looks like you haven't added anything to your bag yet.</p>
        <Link to="/shop" className="bg-neutral-900 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 min-h-screen">
      <h1 className="text-4xl font-bold tracking-tight mb-12">SHOPPING BAG</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow">
          <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-bold tracking-widest uppercase text-neutral-400 border-b border-neutral-200 pb-4 mb-8">
            <div className="col-span-3">Product</div>
            <div className="col-span-1 text-center">Quantity</div>
            <div className="col-span-1 text-center">Total</div>
            <div className="col-span-1 text-right">Remove</div>
          </div>
          
          <div className="flex flex-col gap-8">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border-b border-neutral-100 pb-8 last:border-0">
                <div className="col-span-3 flex gap-6 w-full">
                  <Link to={`/product/${item.slug}`} className="w-24 h-32 flex-shrink-0 bg-neutral-100">
                    <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-1"><Link to={`/product/${item.slug}`} className="hover:underline">{item.name}</Link></h3>
                    <p className="text-sm text-neutral-500 mb-1">Color: {item.color}</p>
                    <p className="text-sm text-neutral-500 mb-2">Size: {item.size}</p>
                    <p className="text-sm font-medium md:hidden">${item.price}</p>
                  </div>
                </div>
                
                <div className="col-span-1 flex items-center justify-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex items-center border border-neutral-200 w-fit">
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="px-4 py-2 hover:bg-neutral-50">-</button>
                    <span className="px-4 py-2 text-sm min-w-[3rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="px-4 py-2 hover:bg-neutral-50">+</button>
                  </div>
                </div>
                
                <div className="col-span-1 text-center font-medium hidden md:block">
                  ${item.price * item.quantity}
                </div>
                
                <div className="col-span-1 text-right hidden md:block">
                  <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-neutral-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={20} className="ml-auto" />
                  </button>
                </div>
                
                {/* Mobile remove */}
                <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="md:hidden text-sm text-neutral-500 underline uppercase tracking-widest mt-2 self-start">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-neutral-50 p-8">
            <h2 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-neutral-200 pb-4">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-sm text-neutral-600">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-sm text-neutral-600 border-b border-neutral-200 pb-6">
              <span>Estimated Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between items-center mb-8 text-xl font-bold">
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full text-center bg-neutral-900 text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
