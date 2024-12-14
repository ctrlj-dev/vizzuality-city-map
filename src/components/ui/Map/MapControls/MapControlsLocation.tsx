import { Locate } from 'lucide-react';
import { Button } from '../../Button';

type MapControlsLocationProps = {
  ref: React.RefObject<mapboxgl.Map | null>;
  location: [number, number];
};

const MapControlsLocation = ({ ref, location }: MapControlsLocationProps) => {
  const centerOnUserLocation = () => {
    if (location) {
      ref?.current?.flyTo({
        center: location,
        zoom: 10,
        essential: true,
      });
    }
  };

  return (
    <div className="absolute top-8 left-8 flex flex-col space-y-2">
      <Button size="default" onClick={centerOnUserLocation}>
        <Locate className="mr-2" />
        Near me
      </Button>
    </div>
  );
};

export default MapControlsLocation;
