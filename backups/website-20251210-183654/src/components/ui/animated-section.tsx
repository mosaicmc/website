import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'rotate-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, once, hasAnimated]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    const animationMap = {
      'fade-in': 'animate-fade-in',
      'fade-in-up': 'animate-fade-in-up',
      'fade-in-down': 'animate-fade-in-down',
      'fade-in-left': 'animate-fade-in-left',
      'fade-in-right': 'animate-fade-in-right',
      'scale-in': 'animate-scale-in',
      'rotate-in': 'animate-rotate-in',
    };
    
    return animationMap[animation] || 'animate-fade-in-up';
  };

  return (
    <div
      ref={elementRef}
      className={`transition-opacity duration-300 ${getAnimationClass()} ${className}`}
      style={{ 
        animationDuration: `${duration}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

// Staggered animation component for lists
interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  baseAnimation?: string;
  className?: string;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 100,
  baseAnimation = 'fade-in-up',
  className = '',
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedSection
          animation={baseAnimation as 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'rotate-in'}
          delay={index * staggerDelay}
          key={index}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
};

// Enhanced button component with micro-interactions
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 relative overflow-hidden
    active:scale-98 focus-visible:outline-none focus-visible:ring-2
    disabled:opacity-50 disabled:cursor-not-allowed
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-white/10 before:to-transparent before:translate-x-[-100%] 
    hover:before:translate-x-[100%] before:transition-transform before:duration-700
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-ocean to-sky text-white shadow-xl
      hover:from-ocean/90 hover:to-sky/90 hover:shadow-2xl hover:shadow-ocean/20
      focus-visible:ring-ocean dark:focus-visible:ring-sky
    `,
    secondary: `
      backdrop-blur-md bg-white/20 border border-white/30 text-gray-800
      hover:bg-white/30 hover:shadow-xl dark:bg-slate-800/30 
      dark:border-slate-700/50 dark:text-gray-100 dark:hover:bg-slate-800/50
      focus-visible:ring-gray-500
    `,
    outline: `
      border-2 border-ocean text-ocean hover:bg-ocean hover:text-white
      dark:border-sky dark:text-sky dark:hover:bg-sky dark:hover:text-gray-900
      focus-visible:ring-ocean dark:focus-visible:ring-sky
    `,
  };

  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} group`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      
      {icon && iconPosition === 'left' && (
        <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
          {icon}
        </span>
      )}
    </button>
  );
};