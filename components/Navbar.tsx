import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/education', label: '教育' },
    { path: '/projects', label: '项目' },
    { path: '/hobbies', label: '兴趣' },
    { path: '/chat', label: 'AI聊天' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b-2 border-slate-900 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-slate-900 text-white border-2 border-white shadow-retro flex items-center justify-center font-pixel text-xl font-bold group-hover:-translate-y-1 transition-transform">
                Q
              </div>
              <div className="flex flex-col">
                <span className="font-pixel text-sm text-slate-900 font-black tracking-tighter">麻袋的</span>
                <span className="font-bold text-xs text-slate-600">奇思妙想</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-bold tracking-wide transition-all duration-200 border-2 border-transparent hover:border-slate-900 hover:bg-white hover:shadow-retro ${
                    location.pathname === link.path 
                      ? 'text-slate-900 bg-y2k-cyan border-slate-900 shadow-retro' 
                      : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none border-2 border-slate-900 bg-white text-slate-900 shadow-retro focus:outline-none active:translate-y-1 active:shadow-none"
            >
              <span className="font-bold text-xs">MENU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-4 border-slate-900 absolute w-full top-full left-0 z-50">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 border-2 border-slate-900 text-center font-bold shadow-sm ${
                  location.pathname === link.path
                    ? 'bg-y2k-cyan text-black'
                    : 'bg-white text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;