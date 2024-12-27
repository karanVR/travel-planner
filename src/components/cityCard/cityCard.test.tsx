import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CityCard from '.';

describe('CityCard Component', () => {
  test('renders city name and description', async () => {
    const cityData = {
      name: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.209,
      code: 'DEL',
      flag: '🇮🇳',
      country: 'India',
      textColor: 'white',
    };

    await act(async () => {
      render(<CityCard {...cityData} />);
    });

    expect(screen.getByText((content, element) => content.includes('India'))).toBeInTheDocument();

  });
});
