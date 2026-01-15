import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Film } from 'lucide-react';
import { SearchInput } from '../common';

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

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' },
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled
        ? 'backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border-b border-[#252b37]'
        : 'bg-transparent'
    }`}>
      <div className="h-[90px] w-full px-[140px] flex items-center justify-between">
        {/* Logo Section - Left side with Navigation */}
        <div className="flex gap-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center">
            <Film className="h-10 w-10 text-white" />
            <span className="font-semibold text-white text-2xl tracking-tight">Movie</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-text-md font-regular text-white hover:text-neutral-400 transition-colors"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-gray-800/50 py-6 md:hidden bg-background-dark/50 absolute top-[90px] w-full left-0 right-0">
          <div className="space-y-4">
            {/* Search for mobile */}
            <div className="px-10 pb-4">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Search Movie"
              />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-10 py-3 text-base font-normal transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-gray-800/50 font-medium'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
