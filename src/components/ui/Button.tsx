import React from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none';
    
    const variants = {
      primary: 'bg-white text-black hover:bg-white/90',
      secondary: 'bg-white/10 text-white hover:bg-white/20',
      outline: 'border border-fathom-border text-white hover:bg-white/5',
      ghost: 'text-white hover:bg-white/10',
      gradient: 'button-gradient bg-[#1a1a1a] text-white',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedStyles = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link to={href} className={combinedStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedStyles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
