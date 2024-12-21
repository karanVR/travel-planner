'use client';

import clsx from 'clsx';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { VscLayoutMenubar } from 'react-icons/vsc';
import { cn } from '../../../lib/utils';
import logo from '../../assets/images/logo.png';
import { themeContext } from '../../../lib/context';

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
    label: 'Second section',
    icon: VscLayoutMenubar,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Profile',
    icon: VscLayoutMenubar,
    href: '/conversation',
    color: 'text-red-500',
  },
];

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true));

  if (!isMounted) {
    return null;
  }

  const pathname = usePathname();
  const { appTheme } = useContext(themeContext);
  return (
    <div
      className={cn(
        'space-y-4 flex-col items-center  h-full',
        appTheme === 'light' ? 'bg-black text-white' : 'bg-white text-black',
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
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
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
