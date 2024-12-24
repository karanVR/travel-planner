import { useSavedCities } from '@/hooks/useSavedCitiesContext.hook'; // Adjust the import path as per your project

const SaveButton = ({
  city,
  onButtonClick,
}: {
  city: string;
  onButtonClick?: () => void;
}) => {
  const { savedCities } = useSavedCities();

  const isCitySaved = savedCities.some(
    (savedCity: any) => savedCity.name === city,
  );

  return (
    <button
      className="animated-btn px-2 py-2 bg-red-400 ml-auto rounded-md text-xs"
      onClick={onButtonClick}
    >
      {isCitySaved ? 'Remove from Itinerary' : 'Save to Itinerary'}
    </button>
  );
};

export default SaveButton;
