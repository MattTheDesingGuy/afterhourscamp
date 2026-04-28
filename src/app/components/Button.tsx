import React from 'react';
import { Link } from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = `px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-block text-center ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`;
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white text-[#1C325A] border-2 border-white hover:bg-opacity-90",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#1C325A]"
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={combinedClassName} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
      {children}
    </button>
  );
}
