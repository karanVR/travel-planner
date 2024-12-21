'use client';

import { useContext } from 'react';
import { changeTheme } from '../../../lib/utils';
import { themeContext } from '../../../lib/context';
import { FaSun } from 'react-icons/fa';
import { IoIosMoon } from 'react-icons/io';
import clsx from 'clsx';

const ThemeToggle = (value: any) => {
  const { appTheme, setAppTheme } = useContext(themeContext);
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
          <div
            onClick={() => setAppTheme(changeTheme(appTheme))}
            className={clsx('absolute top-1 z-50', {
              'left-1': appTheme === 'dark',
              'right-1': appTheme === 'light',
            })}
          >
            {appTheme === 'dark' ? (
              <IoIosMoon size="30px" />
            ) : (
              <FaSun size="30px" />
            )}
          </div>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
