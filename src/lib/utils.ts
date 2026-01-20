import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serviceYearsLabel(startYear = 1981) {
  const years = new Date().getFullYear() - startYear;
  return `${years}+`;
}

export function languagesSpokenLabel(count = 42) {
  return `${count}+`;
}

export function serviceYearsBase(startYear = 1981) {
  return new Date().getFullYear() - startYear;
}

export function languagesSpokenBase(count = 42) {
  return count;
}

/**
 * Resolves an absolute asset path by prepending the Vite base URL.
 * Handles paths starting with '/' correctly.
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If base is '/', ensure we return /path
  if (base === '/') return `/${cleanPath}`;
  
  // Vite's BASE_URL includes trailing slash
  return `${base}${cleanPath}`;
}
