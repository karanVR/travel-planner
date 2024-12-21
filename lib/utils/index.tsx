import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const changeTheme = (theme: string) => {
  if (theme === 'light') return 'dark';
  else return 'light';
};

export const filterOptions = ['Popular', 'Recommended', 'New'];
export const carouselOptions = [
  {
    title: 'Vacations',
    number: 1122,
  },
  {
    title: 'Stays',
    number: 3489,
  },
  {
    title: 'Restaurant',
    number: 7843,
  },
  {
    title: 'Attractions',
    number: 856,
  },
  {
    title: 'Car Rentals',
    number: 674,
  },
  {
    title: 'Bus Airport',
    number: 98,
  },
  {
    title: 'Cafes',
    number: 743,
  },
];
