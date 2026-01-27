import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Globe, Home, LucideIcon, Phone, UserPlus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu-trigger-style";
import { prefetchOnHover } from "@/lib/prefetch";

type ServiceNavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

type NavLinkItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

type GetInvolvedItem = {
  title: string;
  href?: string;
  description: string;
  icon: LucideIcon;
  external?: string;
};

type CustomNavigationProps = {
  isEmergencyMode: boolean;
  services: ServiceNavItem[];
  aboutLinks: NavLinkItem[];
  getInvolvedLinks: GetInvolvedItem[];
  resourcesLinks: NavLinkItem[];
  isActivePath: (href: string, hasDropdown?: boolean) => boolean;
  labels: {
    home: string;
    services: string;
    about: string;
    getInvolved: string;
    resources: string;
  };
  onPrefetch: {
    services: () => void;
    about: () => void;
    getInvolved: () => void;
    resources: () => void;
  };
};

type DropdownMenuProps = {
  triggerLabel: string;
  isActive?: boolean;
  onOpenPrefetch?: () => void;
  children: (closeMenu: () => void) => React.ReactNode;
};

const TriggerButton = ({
  label,
  isActive,
  onClick,
  onMouseEnter,
  onFocus,
  isOpen,
}: {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  isOpen?: boolean;
}) => (
  <button
    type="button"
    className={cn(
      navigationMenuTriggerStyle(),
      isActive
        ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
        : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    )}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onFocus={onFocus}
    aria-expanded={!!isOpen}
    aria-haspopup="true"
  >
    {label}
    <ChevronDown
      className={cn("ml-1 h-3 w-3 transition duration-300", isOpen && "rotate-180")}
      aria-hidden="true"
    />
  </button>
);

const MenuLinkItem = ({
  title,
  href,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}) => (
  <li>
    <Link
      to={href}
      className={cn(
        "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
        "text-foreground",
        "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
        "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      )}
      onClick={onClick}
      {...prefetchOnHover(href)}
    >
      <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
        <Icon className="h-5 w-5" />
        {title}
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </Link>
  </li>
);

const DropdownMenu = ({
  triggerLabel,
  isActive,
  onOpenPrefetch,
  children,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const openMenu = () => {
    if (closeTimeout.current) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    if (!isOpen) {
      onOpenPrefetch?.();
    }
    setIsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!menuRef.current) return;
    const next = event.relatedTarget as Node | null;
    if (!next || !menuRef.current.contains(next)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="flex items-center"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={handleBlur}
      ref={menuRef}
    >
      <TriggerButton
        label={triggerLabel}
        isActive={isActive}
        isOpen={isOpen}
        onMouseEnter={openMenu}
        onFocus={openMenu}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        translate="yes"
        className={cn(
          "absolute left-1/2 top-full mt-2 w-[900px] max-w-[90vw] -translate-x-1/2 rounded-lg border border-white/30 bg-white p-4 shadow-2xl dark:border-slate-700/50 dark:bg-slate-900/95",
          "transition-all duration-200",
          isOpen
            ? "opacity-100 visible translate-y-0 pointer-events-auto"
            : "opacity-0 invisible -translate-y-2 pointer-events-none",
          "z-[100]"
        )}
      >
        {children(() => setIsOpen(false))}
      </div>
    </div>
  );
};

export default function CustomNavigation({
  isEmergencyMode,
  services,
  aboutLinks,
  getInvolvedLinks,
  resourcesLinks,
  isActivePath,
  labels,
  onPrefetch,
}: CustomNavigationProps) {
  return (
    <div className="flex items-center gap-1" translate="yes">
      <Link
        to="/"
        className={cn(
          navigationMenuTriggerStyle(),
          isActivePath("/")
            ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
            : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        )}
        {...prefetchOnHover("/")}
      >
        {labels.home}
      </Link>

      {!isEmergencyMode && (
        <DropdownMenu
          triggerLabel={labels.services}
          isActive={isActivePath("/services", true)}
          onOpenPrefetch={onPrefetch.services}
        >
          {(closeMenu) => (
            <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
              <div className="col-span-2">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">Core Services</h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                  {services.map((service) => (
                    <MenuLinkItem
                      key={service.title}
                      title={service.title}
                      href={service.href}
                      description={service.description}
                      icon={service.icon}
                      onClick={closeMenu}
                    />
                  ))}
                </ul>
              </div>
              <div className="pl-4">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">Quick Links</h6>
                <ul className="mt-2.5 grid gap-3 list-none">
                  <MenuLinkItem
                    title="All Services"
                    href="/services"
                    description="Explore our complete range of multicultural support services"
                    icon={Globe}
                    onClick={closeMenu}
                  />
                  <MenuLinkItem
                    title="Get Support"
                    href="/contact-us"
                    description="Contact us for immediate assistance and guidance"
                    icon={Phone}
                    onClick={closeMenu}
                  />
                  <li>
                    <a
                      href="https://forms.mosaicmc.org.au/refer"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={cn(
                        "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
                        "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
                        "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      aria-label="Make a Referral (opens in new tab)"
                    >
                      <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
                        <UserPlus className="h-5 w-5" />
                        Make a Referral
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Secure online referral form for clients, families and individuals
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </DropdownMenu>
      )}

      <DropdownMenu
        triggerLabel={labels.about}
        isActive={isActivePath("/about", true) || isActivePath("/company/news", true)}
        onOpenPrefetch={onPrefetch.about}
      >
        {(closeMenu) => (
          <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
            <div className="col-span-2">
              <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">About Mosaic</h6>
              <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                {aboutLinks.map((link) => (
                  <MenuLinkItem
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    description={link.description}
                    icon={link.icon}
                    onClick={closeMenu}
                  />
                ))}
              </ul>
            </div>
            <div className="pl-4">
              <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">Explore</h6>
              <ul className="mt-2.5 grid gap-3 list-none">
                <MenuLinkItem
                  title="Our Story"
                  href="/about#our-story-heading"
                  description="Discover our mission, history and leadership"
                  icon={Home}
                  onClick={closeMenu}
                />
              </ul>
            </div>
          </div>
        )}
      </DropdownMenu>

      {!isEmergencyMode && (
        <DropdownMenu
          triggerLabel={labels.getInvolved}
          isActive={isActivePath("/get-involved", true)}
          onOpenPrefetch={onPrefetch.getInvolved}
        >
          {(closeMenu) => (
            <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
              <div className="col-span-2">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">Participate</h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                  {getInvolvedLinks.map((gi) =>
                    gi.href ? (
                      <MenuLinkItem
                        key={gi.title}
                        title={gi.title}
                        href={gi.href}
                        description={gi.description}
                        icon={gi.icon}
                        onClick={closeMenu}
                      />
                    ) : (
                      <li key={gi.title}>
                        <a
                          href={gi.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMenu}
                          aria-label={`${gi.title} (opens in new tab)`}
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
                            "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
                            "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          )}
                        >
                          <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
                            <gi.icon className="h-5 w-5" />
                            {gi.title}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {gi.description}
                          </p>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="pl-4">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">Explore</h6>
                <ul className="mt-2.5 grid gap-3 list-none">
                  <MenuLinkItem title="Opportunities" href="/get-involved" description="Join our Mission" icon={Phone} onClick={closeMenu} />
                  <MenuLinkItem
                    title="Contact Us"
                    href="/contact-us"
                    description="Find service locations across New South Wales"
                    icon={Home}
                    onClick={closeMenu}
                  />
                </ul>
              </div>
            </div>
          )}
        </DropdownMenu>
      )}

      {!isEmergencyMode && (
        <DropdownMenu
          triggerLabel={labels.resources}
          isActive={isActivePath("/resources", true)}
          onOpenPrefetch={onPrefetch.resources}
        >
          {(closeMenu) => (
            <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-border">
              <div className="col-span-2">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">Key Resources</h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                  {resourcesLinks.map((res) => (
                    <MenuLinkItem
                      key={res.title}
                      title={res.title}
                      href={res.href}
                      description={res.description}
                      icon={res.icon}
                      onClick={closeMenu}
                    />
                  ))}
                </ul>
              </div>
              <div className="pl-4">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">Explore</h6>
                <ul className="mt-2.5 grid gap-3 list-none">
                  <MenuLinkItem
                    title="All Resources"
                    href="/resources"
                    description="Browse brochures, annual reports, helpful links, emergency & translation"
                    icon={Globe}
                    onClick={closeMenu}
                  />
                  <MenuLinkItem
                    title="Contact"
                    href="/contact-us"
                    description="Reach us for guidance and support"
                    icon={Phone}
                    onClick={closeMenu}
                  />
                </ul>
              </div>
            </div>
          )}
        </DropdownMenu>
      )}
    </div>
  );
}
