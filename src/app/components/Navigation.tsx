import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const ICON_SRC = `${import.meta.env.BASE_URL}brand/icon-gradient.svg`;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#050b2f] transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={ICON_SRC}
                alt="Afterhours"
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-[#FBB040] transition-colors duration-200 font-medium text-[#ffffff]"
                >
                  {link.name}
                </Link>
              ))}
              <Button to="/tickets" variant="primary" className="!py-2 !px-6">
                Get Tickets
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#ffffff] p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-20">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#1C325A] text-2xl hover:text-[#FBB040] transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Button to="/tickets" variant="primary" className="mt-4">
              Get Tickets
            </Button>
          </div>
        </div>
      )}
    </>
  );
}