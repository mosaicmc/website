"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isTranslationActive } from "@/lib/google-translate";

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to?: string;
  href?: string;
};

export function Link({ to, href, ...props }: LinkProps) {
  const destination = href ?? to ?? "";
  const isExternal = /^(https?:\/\/|mailto:|tel:|sms:|ftp:|javascript:|#)/i.test(
    destination
  );
  if (isExternal) {
    const { children, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={destination} {...rest}>
        {children}
      </a>
    );
  }
  const { children, onClick, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;
    const target = (rest.target || "").toLowerCase();
    if (target === "_blank" || target === "_new") return;
    if (isTranslationActive()) {
      event.preventDefault();
      window.location.assign(destination);
    }
  };
  return (
    <NextLink href={destination} {...rest} onClick={handleClick}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname();
  const [hash, setHash] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.location.hash || "";
  });
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.location.search || "";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const nextHash = window.location.hash || "";
      const nextSearch = window.location.search || "";
      setHash((prev) => (prev === nextHash ? prev : nextHash));
      setSearch((prev) => (prev === nextSearch ? prev : nextSearch));
    };
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);

  return { pathname: pathname ?? "/", search, hash, state: null };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string) => {
    if (isTranslationActive()) {
      window.location.assign(to);
      return;
    }
    router.push(to);
  };
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (isTranslationActive()) {
      if (replace) {
        window.location.replace(to);
      } else {
        window.location.assign(to);
      }
      return;
    }
    if (replace) router.replace(to);
    else router.push(to);
  }, [replace, router, to]);
  return null;
}
