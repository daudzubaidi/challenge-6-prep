import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-base-black h-footer">
      <div className="w-full h-full px-35 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-10 w-10 text-neutral-25" />
          <span className="font-semibold text-neutral-25 text-2xl">Movie</span>
        </Link>

        {/* Copyright */}
        <p className="text-text-md font-regular text-neutral-600">
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
};
