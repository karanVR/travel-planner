'use client';

import React, { useState } from 'react';
import ThemeToggle from '../themeToggle';
import { UserButton } from '@clerk/nextjs';

const HeaderRightThemeToggle = () => {
  return (
    <div className="flex space-between items-center gap-8">
      <ThemeToggle />
      <div className="ml-auto w-fit">
        <UserButton />
      </div>
    </div>
  );
};

export default HeaderRightThemeToggle;
