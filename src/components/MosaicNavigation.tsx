import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Phone, X, Home, Heart, Users, Globe, LucideIcon } from "lucide-react";
import { ThemeToggle } from './ui/theme-toggle';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const services: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Settlement Support",
    href: "/services/settlement-support",
    description: "Help new migrants settle into Australian life with practical support and guidance.",
    icon: Home,
  },
  {
    title: "Aged Care",
    href: "/services/aged-care",
    description: "Culturally appropriate aged care services for multicultural communities.",
    icon: Heart,
  },
  {
    title: "Family Support",
    href: "/services/family-support",
    description: "Supporting families with children, parenting resources, and family wellbeing.",
    icon: Users,
  },
  {
    title: "Community Engagement",
    href: "/services/community-engagement",
    description: "Building stronger communities through events, programs, and connections.",
    icon: Globe,
  },
];

const mainNavigation = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Stories", href: "/stories" },
  { title: "Resources", href: "/resources" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to?: string; icon?: LucideIcon }
>(({ className, title, children, to, href, icon: Icon, ...props }, ref) => {
  const linkProps = to ? { to } : { href };
  const Component = to ? Link : "a";
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Component
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-slate-700 focus:text-gray-900 dark:focus:text-white",
            className
          )}
          {...linkProps}
          {...props}
        >
          <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-gray-900 dark:text-white">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-300">
            {children}
          </p>
        </Component>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link to="/" className="flex-shrink-0 group relative flex items-center">
      <img
        className="transition-all duration-500 group-hover:scale-105 hover:drop-shadow-lg h-16 sm:h-18 lg:h-20 w-auto max-w-none"
        src={theme === 'dark' ? '/3.png' : '/4.png'}
        alt="Mosaic Multicultural Connections"
      />
    </Link>
  );
};

export default function MosaicNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  // Check if current path matches navigation item
  const isActivePath = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      return location.pathname.startsWith('/services');
    }
    return location.pathname === href;
  };

  const handleCloseCrisisBanner = () => {
    setShowCrisisBanner(false);
  };

  return (
    <>
      {/* Crisis Support Banner */}
      {showCrisisBanner && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium relative z-[120]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 sm:space-x-4">
            <span className="text-sm">🚨 Crisis Support Available</span>
            <a 
              href="tel:0249261300" 
              className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-colors text-sm font-medium"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call (02) 4926 1300
            </a>
            <span className="hidden sm:inline text-xs">• Available 24/7</span>
            <button
              onClick={handleCloseCrisisBanner}
              className="ml-2 p-1 hover:bg-red-700 rounded transition-colors"
              aria-label="Close crisis banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <nav className="border-b bg-white dark:bg-slate-800 sticky top-0 z-50 shadow-lg border-gray-200 dark:border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                        isActivePath('/') 
                          ? "text-white dark:text-white bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                          : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50"
                      )}>
                        {t('nav.home')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {/* Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      isActivePath('/services', true)
                        ? "text-white dark:text-white bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                        : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50"
                    )}>{t('nav.services')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            Core Services
                          </h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3">
                            {services.map((service) => (
                              <ListItem
                                key={service.title}
                                title={service.title}
                                to={service.href}
                                icon={service.icon}
                              >
                                {service.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>

                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            Quick Links
                          </h6>
                          <ul className="mt-2.5 grid gap-3">
                            <ListItem
                              title="All Services"
                              to="/services"
                              icon={Globe}
                            >
                              Explore our complete range of multicultural support services
                            </ListItem>
                            <ListItem
                              title="Get Support"
                              to="/contact"
                              icon={Phone}
                            >
                              Contact us for immediate assistance and guidance
                            </ListItem>
                            <ListItem
                              title="Locations"
                              to="/locations"
                              icon={Home}
                            >
                              Find service locations across New South Wales
                            </ListItem>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Other Navigation Items */}
                  {mainNavigation.slice(1).map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <Link to={item.href}>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                          isActivePath(item.href)
                            ? "text-white dark:text-white bg-ocean dark:bg-sky shadow-lg border border-ocean/20 dark:border-sky/20"
                            : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50"
                        )}>
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Phone Icon - Compact */}
              <a href="tel:0249608400" className="p-2 rounded-lg text-ocean dark:text-sky hover:bg-sand/50 dark:hover:bg-slate-800/50 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Action Buttons Group */}
              <div className="flex items-center space-x-2">
                <Button size="sm" asChild className="bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <Link to="/get-involved">{t('nav.getInvolved')}</Link>
                </Button>
                {/* Prominent Donate Button */}
                <Button 
                  size="default" 
                  asChild
                  className="bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link to="/donate">Donate</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link 
                      to="/" 
                      className={cn("text-lg font-medium transition-colors",
                        isActivePath('/')
                          ? "text-white dark:text-white bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.home')}
                    </Link>
                    
                    <Link 
                      to="/services" 
                      className={cn("text-lg font-medium transition-colors",
                        isActivePath('/services', true)
                          ? "text-white dark:text-white bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.services')}
                    </Link>
                    <div className="pl-4 space-y-3">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.title}
                            to={service.href}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-ocean dark:hover:text-sky transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            {service.title}
                          </Link>
                        );
                      })}
                    </div>
                    
                    {mainNavigation.slice(1).map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={cn("text-lg font-medium transition-colors",
                          isActivePath(item.href)
                            ? "text-white dark:text-white bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                            : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-200/30 dark:border-slate-700/30 space-y-3">
                      <Button variant="outline" size="sm" asChild className="w-full border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-sand/50 dark:hover:bg-slate-800/50">
                        <a href="tel:0249608400">📞 Call (02) 4960 8400</a>
                      </Button>
                      <Button size="sm" asChild className="w-full bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-white font-semibold shadow-lg">
                        <Link to="/get-involved" onClick={() => setIsOpen(false)}>
                          🤝 {t('nav.getInvolved')}
                        </Link>
                      </Button>
                      {/* Prominent Mobile Donate Button */}
                      <Button 
                        size="default" 
                        asChild 
                        className="w-full bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-white font-semibold py-3 shadow-lg"
                      >
                        <Link to="/donate" onClick={() => setIsOpen(false)}>
                          Donate to Support Our Community
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}