import React from 'react';
import TpLogo from '../tpLogo';
import HeaderRightThemeToggle from '../headerRightThemeProfile';

const Header = () => {
  return (
    <header className="flex justify-between">
      <div className="font-bold text-2xl pl-6 pt-4 scale-75">
        <TpLogo />
      </div>
      <HeaderRightThemeToggle />
    </header>
  );
};

export default Header;
