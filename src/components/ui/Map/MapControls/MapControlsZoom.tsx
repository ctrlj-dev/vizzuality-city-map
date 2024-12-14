import { Minus, Plus } from 'lucide-react';
import { Button } from '../../Button';

type MapControlsZoomProps = {
  ref: React.RefObject<mapboxgl.Map | null>;
};

const MapControlsZoom = ({ ref }: MapControlsZoomProps) => {
  const zoomIn = () => {
    ref?.current?.zoomIn();
  };

  const zoomOut = () => {
    ref?.current?.zoomOut();
  };

  return (
    <div className="mapbox-zoom-buttons">
      <Button onClick={zoomIn} variant="secondary">
        <Plus size={32} />
      </Button>
      <Button onClick={zoomOut} variant="secondary">
        <Minus size={32} />
      </Button>
    </div>
  );
};

export default MapControlsZoom;
