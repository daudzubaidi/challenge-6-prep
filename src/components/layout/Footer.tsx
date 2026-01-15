import { Link } from 'react-router-dom';
import { MovieIcon } from '../common';

export const Footer = () => {
  return (
    <footer className="border-t border-[#252B37] bg-base-black">
      {/* Desktop Footer */}
      <div className="hidden md:flex w-full h-footer px-35 items-center justify-between py-2">
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

      {/* Mobile Footer */}
      <div className="md:hidden flex flex-col justify-between px-4 py-6 h-[120px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <MovieIcon />
          <span className="font-semibold text-[#FDFDFD] text-[19.911px] leading-[24.889px] tracking-[-0.7964px]">Movie</span>
        </Link>

        {/* Copyright */}
        <p className="text-xs leading-6 font-normal text-[#535862]">
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
};
