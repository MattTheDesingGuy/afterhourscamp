import { Link } from 'react-router';

const LOGO_SRC = `${import.meta.env.BASE_URL}brand/full-white-logo.svg`;

export function Footer() {
  return (
    <footer className="text-white py-12 bg-[#050b2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src={LOGO_SRC}
              alt="Afterhours"
              width={120}
              height={120}
              className="h-[120px] w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-4">
            <nav className="flex flex-col gap-6 text-center">
              <Link to="/" className="hover:text-[#FBB040] transition-colors">
                Home
              </Link>
              <Link to="/tickets" className="hover:text-[#FBB040] transition-colors">
                Tickets
              </Link>
              <Link to="/contact" className="hover:text-[#FBB040] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <a
              href="mailto:afterhourscamp1@gmail.com"
              className="hover:text-[#FBB040] transition-colors"
            >
              afterhourscamp1@gmail.com
            </a>
            <a
              href="tel:0402510836"
              className="hover:text-[#FBB040] transition-colors"
            >
              0402 510 836
            </a>
            {/* Social icons removed pending real Instagram/Facebook URLs */}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Afterhours. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
