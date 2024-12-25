import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CityCard from '.';

describe('CityCard Component', () => {
  test('renders city name and description', () => {
    const cityData = {
      name: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.209,
      code: 'DEL',
      flag: '🇮🇳',
      country: 'India',
      textColor: 'white',
    };

    render(<CityCard {...cityData} />);
    expect(screen.getByText('New Delhi')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });
});
