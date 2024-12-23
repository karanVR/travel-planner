'use client';

import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { VscLayoutMenubar } from 'react-icons/vsc';
import { cn } from '../../../lib/utils';
import { themeContext } from '@/hooks/useThemeContext.hook';
import { TbUserHexagon } from 'react-icons/tb';
import { FaWpexplorer } from 'react-icons/fa6';
import { FaPlane } from 'react-icons/fa';
import { BiSolidCity } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

const routes = [
  {
    label: 'Dashboard',
    icon: VscLayoutMenubar,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Cities',
    icon: FaPlane,
    href: '/city',
    color: 'text-sky-500',
  },
  {
    label: 'Explore Nearby',
    icon: FaWpexplorer,
    href: '/explore',
    color: 'text-violet-500',
  },
  {
    label: 'Profile',
    icon: TbUserHexagon,
    href: '/profile',
    color: 'text-red-500',
  },
  {
    label: 'Saved Cities',
    icon: BiSolidCity,
    href: '/saved-cities',
    color: 'text-green-500',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { appTheme } = useContext(themeContext);
  return (
    <div
      className={cn(
        'space-y-4 flex-col items-center  h-full',
        appTheme === 'light' ? 'bg-black text-white' : 'bg-white/10 text-zinc',
      )}
    >
      <div className="px-3 py-2 flex-1">
        {/* <Link href="/dashboard" className="flex items-center pl-3 mb-14 ">
          <div className="relative w-8 h-8 mr-4">
            <Image alt="logo" src={logo} width={40} className="rounded-md"/>
          </div>
         
        </Link> */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={uuidv4()}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition',
                // pathname === route.href
                //   ? "text-white bg-white/10"
                //   : "text-zinc-400",
              )}
            >
              <div className="items-center flex flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
