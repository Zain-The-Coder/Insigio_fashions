import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10 border-t border-neutral-800">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-[0.2em] mb-6">VANTA</h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Engineered outerwear for the uncompromising. Designed in the city, built for the elements.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium tracking-widest mb-6 uppercase">Shop</h3>
          <ul className="flex flex-col gap-4 text-sm text-neutral-400">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/shop?category=Puffer+Jackets" className="hover:text-white transition-colors">Puffers</Link></li>
            <li><Link to="/shop?category=Leather+Jackets" className="hover:text-white transition-colors">Leathers</Link></li>
            <li><Link to="/shop?category=Bomber+Jackets" className="hover:text-white transition-colors">Bombers</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium tracking-widest mb-6 uppercase">Support</h3>
          <ul className="flex flex-col gap-4 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium tracking-widest mb-6 uppercase">Newsletter</h3>
          <p className="text-neutral-400 text-sm mb-4">
            Join the inner circle for early access and exclusive releases.
          </p>
          <form className="flex border-b border-neutral-600 pb-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter (Demo)'); }}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-neutral-500"
              required
            />
            <button type="submit" className="text-xs tracking-widest font-medium uppercase hover:opacity-70">
              Join
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 text-xs text-neutral-500 gap-4">
        <p>&copy; {new Date().getFullYear()} VANTA. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
