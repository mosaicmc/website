import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ui/theme-toggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes and scroll to top
  useEffect(() => {
    setIsMenuOpen(false);
    // Smooth scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { 
      name: t('nav.services'), 
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: t('services.settlement'), href: '/services/settlement-support' },
        { name: t('services.agedCare'), href: '/services/aged-care' },
        { name: t('services.familySupport'), href: '/services/family-support' },
        { name: t('services.communityEngagement'), href: '/services/community-engagement' }
      ]
    },
    { name: t('nav.stories'), href: '/stories' },
    { name: t('nav.resources'), href: '/resources' },
  ];

  // Check if current path matches navigation item
  const isActivePath = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      return location.pathname.startsWith('/services');
    }
    return location.pathname === href;
  };

  // Enhanced scroll to top function for links
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 shadow-2xl border-b border-white/30 dark:border-slate-700/50' 
        : 'backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-white/20 dark:border-slate-700/30'
    } transition-all duration-500 ease-out`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          {/* Logo Section - MUCH LARGER */}
          <Link 
            to="/" 
            className="flex-shrink-0 group relative"
            onClick={handleLinkClick}
          >
            <img
              className={`transition-all duration-500 group-hover:scale-105 hover:drop-shadow-lg ${
                isScrolled 
                  ? 'h-14 sm:h-16 lg:h-20' 
                  : 'h-16 sm:h-20 lg:h-24'
              } w-auto max-w-none`}
              src={theme === 'dark' ? '/3.png' : '/4.png'}
              alt="Mosaic Multicultural Connections"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <Link
                      to={item.href}
                      className={`relative px-4 py-2 transition-all duration-300 font-medium text-base flex items-center rounded-lg hover:backdrop-blur-md ${
                        isActivePath(item.href, item.hasDropdown)
                          ? 'text-ocean dark:text-sky bg-white/60 dark:bg-slate-800/60'
                          : 'text-gray-700 dark:text-gray-300 hover:text-ocean dark:hover:text-sky hover:bg-white/40 dark:hover:bg-slate-800/40'
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      onClick={handleLinkClick}
                    >
                      <span className="flex items-center">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-ocean dark:group-hover:text-sky" />
                      </span>
                    </Link>
                    
                    {/* Services Dropdown */}
                    <div 
                      className={`absolute top-full left-0 mt-2 w-64 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 rounded-xl shadow-2xl border border-white/30 dark:border-slate-700/50 z-[110] transition-all duration-500 ease-out ${
                        isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <div className="py-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className={`block px-4 py-3 transition-all duration-200 ${
                              location.pathname === dropdownItem.href
                                ? 'text-ocean dark:text-sky bg-white/70 dark:bg-slate-800/70'
                                : 'text-gray-700 dark:text-gray-300 hover:text-ocean dark:hover:text-sky hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                            onClick={handleLinkClick}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 transition-all duration-300 font-medium text-base rounded-lg ${
                      isActivePath(item.href)
                        ? 'text-ocean dark:text-sky bg-white/60 dark:bg-slate-800/60'
                        : 'text-gray-700 dark:text-gray-300 hover:text-ocean dark:hover:text-sky hover:bg-white/40 dark:hover:bg-slate-800/40'
                    }`}
                    onClick={() => handleLinkClick(item.href)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions - Updated with new ThemeToggle */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/get-involved"
              className="relative px-6 py-2.5 bg-gradient-to-r from-leaf to-leaf/90 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:from-leaf/90 hover:to-leaf hover:shadow-lg hover:shadow-leaf/25 backdrop-blur-sm"
              onClick={handleLinkClick}
            >
              {t('nav.getInvolved')}
            </Link>
            <Link
              to="/get-involved"
              className="relative px-6 py-2.5 bg-gradient-to-r from-sun to-sun/90 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:from-sun/90 hover:to-sun hover:shadow-lg hover:shadow-sun/25 backdrop-blur-sm"
              onClick={handleLinkClick}
            >
              {t('nav.donate')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-md text-gray-700 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 dark:text-gray-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation - FIXED LAYOUT */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-t border-white/30 dark:border-slate-700/50 shadow-2xl z-[110]">
            <div className="px-4 py-6 space-y-3">
              
              {/* Navigation Items FIRST */}
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium text-base ${
                          isActivePath(item.href, item.hasDropdown)
                            ? 'text-ocean dark:text-sky bg-white/70 dark:bg-slate-800/70'
                            : 'text-gray-700 dark:text-gray-300 hover:text-ocean dark:hover:text-sky hover:bg-white/50 dark:hover:bg-slate-800/50'
                        }`}
                        onClick={handleLinkClick}
                      >
                        {t('nav.services')}
                      </Link>
                      <div className="ml-4 space-y-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className={`block px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                              location.pathname === dropdownItem.href
                                ? 'text-ocean dark:text-sky bg-white/60 dark:bg-slate-800/60'
                                : 'text-gray-600 dark:text-gray-400 hover:text-ocean dark:hover:text-sky hover:bg-white/40 dark:hover:bg-slate-800/40'
                            }`}
                            onClick={handleLinkClick}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium text-base ${
                        isActivePath(item.href)
                          ? 'text-ocean dark:text-sky bg-white/70 dark:bg-slate-800/70'
                          : 'text-gray-700 dark:text-gray-300 hover:text-ocean dark:hover:text-sky hover:bg-white/50 dark:hover:bg-slate-800/50'
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Bottom Section */}
              <div className="pt-4 border-t border-gray-200/30 dark:border-slate-700/30 space-y-3">
                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
                <Link
                  to="/get-involved"
                  className="block bg-gradient-to-r from-leaf to-leaf/90 text-white px-4 py-3 rounded-lg font-semibold text-base text-center hover:from-leaf/90 hover:to-leaf transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  {t('nav.getInvolved')}
                </Link>
                <Link
                  to="/get-involved"
                  className="block bg-gradient-to-r from-sun to-sun/90 text-white px-4 py-3 rounded-lg font-semibold text-base text-center hover:from-sun/90 hover:to-sun transition-all duration-300"
                  onClick={handleLinkClick}
                >
                  {t('nav.donate')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;