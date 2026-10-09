import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navClasses = `fixed w-full z-40 transition-all duration-300 ease-in-out border-b ${
    isScrolled || !isHome || isMobileMenuOpen
      ? 'bg-white/95 backdrop-blur-md text-neutral-900 border-neutral-200 py-4'
      : 'bg-transparent text-white border-transparent py-6'
  }`;

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Puffer Jackets', path: '/shop?category=Puffer+Jackets' },
    { name: 'Leather Jackets', path: '/shop?category=Leather+Jackets' },
    { name: 'Bomber Jackets', path: '/shop?category=Bomber+Jackets' },
  ];

  return (
    <>
      <header className={navClasses}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button onClick={onOpenSearch} aria-label="Search">
              <Search size={20} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:opacity-70 transition-opacity">
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5 lg:gap-6">
            <button className="hidden lg:block hover:opacity-70 transition-opacity" onClick={onOpenSearch}>
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="hover:opacity-70 transition-opacity relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button className="hover:opacity-70 transition-opacity relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] z-30 bg-white text-neutral-900 p-6 pt-10"
          >
            <div className="flex flex-col gap-8 text-2xl font-medium tracking-wide">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="border-b border-neutral-100 pb-4">
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
