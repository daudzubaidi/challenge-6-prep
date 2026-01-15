import { Link } from 'react-router-dom';
import { MovieIcon } from '../common';

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-base-black h-footer py-2">
      <div className="w-full h-full px-35 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <MovieIcon />
          <span className="font-semibold text-white text-2xl">Movie</span>
        </Link>

        {/* Copyright */}
        <p className="text-text-md font-regular text-neutral-600">
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
};
