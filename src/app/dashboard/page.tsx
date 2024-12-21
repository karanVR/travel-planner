'use client';

import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import clsx from 'clsx';

const Dashboad = () => {
  const [countries, setCountries] = useState([]);
  const { width: windowWidth } = useWindowDimensions();
  const fetchCountries = async () => {
    const res = await fetch(
      `https://restcountries.com/v3.1/independent?status=true`,
    );
    const data = await res.json();
    console.log(data, 'countriesData');
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center gap-8 items-center">
        <div className="flex flex-col justify-center items-center">
          {' '}
          <h2 className={clsx('font-[900] text-4xl')}>
            Discover the vacation of your dreams
          </h2>
          <p>Search low prices on flights, hotels, food and much more...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboad;
