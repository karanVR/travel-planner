import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const changeTheme = (theme: string) => {
  if (theme === 'light') return 'dark';
  else return 'light';
};
