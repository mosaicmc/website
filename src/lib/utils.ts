import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serviceYearsLabel(startYear = 1990) {
  const years = new Date().getFullYear() - startYear;
  return `${years}+`;
}

export function languagesSpokenLabel(count = 60) {
  return `${count}+`;
}

export function serviceYearsBase(startYear = 1990) {
  return new Date().getFullYear() - startYear;
}

export function languagesSpokenBase(count = 60) {
  return count;
}
