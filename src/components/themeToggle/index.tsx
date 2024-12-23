'use client';

import { useContext } from 'react';
import { themeContext } from '@/context/themeContext';
import { FaSun } from 'react-icons/fa';
import { IoIosMoon } from 'react-icons/io';
import clsx from 'clsx';

const ThemeToggle = () => {
  const { appTheme, setAppTheme } = useContext(themeContext);

  const toggleTheme = () => {
    const newTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Toggle dark class on root
  };

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={appTheme === 'dark'}
          className="sr-only peer"
          onChange={toggleTheme}
        ></input>

        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
          <div
            className={clsx('absolute z-50', {
              'left-1 bottom-[2px]': appTheme === 'dark',
              'right-1 bottom-[5px]': appTheme === 'light',
            })}
          >
            {appTheme === 'dark' ? (
              <IoIosMoon size="20px" />
            ) : (
              <FaSun size="15px" />
            )}
          </div>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
