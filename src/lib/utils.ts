import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serviceYearsLabel(startYear = 1985) {
  const years = new Date().getFullYear() - startYear;
  return `${years}+`;
}

export function languagesSpokenLabel(count = 42) {
  return `${count}+`;
}

export function serviceYearsBase(startYear = 1985) {
  return new Date().getFullYear() - startYear;
}

export function languagesSpokenBase(count = 42) {
  return count;
}
