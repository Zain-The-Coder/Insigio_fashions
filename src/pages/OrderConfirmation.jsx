import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart } = useCart();
  
  useEffect(() => {
    // Clear cart on successful order
    if (location.state?.orderId) {
      // In a real app this would be more robust
      localStorage.removeItem('vanta-cart');
      // For immediate UI update, though we shouldn't modify context directly like this without a proper method
      // We'll just redirect to home if no orderId is found
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  if (!location.state?.orderId) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-white px-6">
      <div className="max-w-xl w-full text-center">
        <CheckCircle size={64} className="text-green-600 mx-auto mb-8" />
        <h1 className="text-4xl font-bold tracking-tight mb-4 uppercase">Order Confirmed</h1>
        <p className="text-neutral-500 mb-8">
          Thank you for your purchase. Your order number is <strong className="text-neutral-900">{location.state.orderId}</strong>. 
          We'll send you an email confirmation shortly.
        </p>
        
        <div className="bg-neutral-50 p-8 mb-10 text-left border border-neutral-100">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-4">What's Next?</h2>
          <p className="text-sm text-neutral-600 mb-2">1. You will receive an order confirmation email.</p>
          <p className="text-sm text-neutral-600 mb-2">2. Our team will prepare your order for shipment.</p>
          <p className="text-sm text-neutral-600">3. You will receive a tracking link once your order ships.</p>
        </div>
        
        <Link 
          to="/shop" 
          className="inline-block bg-neutral-900 text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
          onClick={() => window.location.href = '/shop'} // Force reload to clear context state fully
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
