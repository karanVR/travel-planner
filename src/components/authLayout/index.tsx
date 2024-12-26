import React from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import Header from '@/components/header';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <SignedOut>
        <div className="flex w-full h-screen items-center justify-center">
          <SignIn routing="hash" forceRedirectUrl="/dashboard" />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col w-full h-full min-h-screen py-2">
          <Header />
          <main>
            <div className="h-full relative">
              <div className="hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
              </div>
              <div className="relative w-full md:pl-72">
                <Navbar />
                {children}
              </div>
            </div>
          </main>
        </div>
      </SignedIn>
    </div>
  );
};

export default AuthLayout;
