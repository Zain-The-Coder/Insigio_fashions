import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US',
  });
  
  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center px-6 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
        <button onClick={() => navigate('/shop')} className="underline">Continue Shopping</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      navigate('/order-confirmation', { state: { orderId: 'VANTA-' + Math.floor(Math.random() * 1000000) } });
    }, 1000);
  };

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">CHECKOUT</h1>
          <p className="text-xs text-neutral-500 uppercase tracking-widest bg-yellow-100 text-yellow-800 py-1 px-4 inline-block font-bold rounded">Demo Mode - Do not enter real payment info</p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-6 pb-2 border-b border-neutral-200">Contact Information</h2>
              <div className="mb-10">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              
              <h2 className="text-lg font-bold tracking-widest uppercase mb-6 pb-2 border-b border-neutral-200">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name" 
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name" 
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div className="mb-4">
                <input 
                  type="text" 
                  name="address"
                  placeholder="Address" 
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  name="city"
                  placeholder="City" 
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
                <input 
                  type="text" 
                  name="postalCode"
                  placeholder="Postal code" 
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-4 border border-neutral-300 outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              
              <h2 className="text-lg font-bold tracking-widest uppercase mb-6 mt-10 pb-2 border-b border-neutral-200">Payment</h2>
              <div className="bg-neutral-50 p-6 border border-neutral-200 flex flex-col items-center justify-center text-center mb-10">
                <ShieldCheck size={32} className="text-neutral-400 mb-4" />
                <p className="text-sm font-medium mb-1">This is a demo store.</p>
                <p className="text-xs text-neutral-500">No real payment processing is integrated.</p>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-neutral-900 text-white py-5 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
              >
                Place Demo Order
              </button>
            </form>
          </div>
          
          {/* Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-neutral-50 p-8 sticky top-32">
              <h2 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-neutral-200 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-neutral-200 flex-shrink-0 relative">
                      <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-neutral-900 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow text-sm">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-neutral-500 text-xs mt-1">{item.color} / {item.size}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 pt-6 flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
