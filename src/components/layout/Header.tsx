import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { SearchInput, MovieIcon } from '../common';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' },
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleMobileSearchClick = () => {
    navigate('/search');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)]'
          : 'bg-transparent'
      }`}>
        <div className="h-[70px] sm:h-[80px] lg:h-[90px] w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[140px] flex items-center justify-between">
          {/* Logo Section - Left side with Navigation */}
          <div className="flex gap-6 md:gap-12 lg:gap-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex gap-2 items-center">
              <MovieIcon />
              <span className="font-semibold text-white text-xl md:text-2xl tracking-tight">Movie</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 lg:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm lg:text-text-md font-normal text-white hover:text-neutral-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Input - Right side (Desktop only) */}
          <div className="hidden md:block">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search Movie"
            />
          </div>

          {/* Mobile Icons - Search and Menu */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Search Icon */}
            <button
              onClick={handleMobileSearchClick}
              aria-label="Search"
              className="text-white"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black md:hidden">
          {/* Menu Header */}
          <div className="h-[70px] sm:h-[80px] px-4 sm:px-6 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex gap-2 items-center" onClick={() => setIsOpen(false)}>
              <MovieIcon />
              <span className="font-semibold text-white text-xl tracking-tight">Movie</span>
            </Link>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="px-4 sm:px-6 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-4 text-base font-normal text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
