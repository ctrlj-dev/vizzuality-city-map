'use client';

import { Map } from '@/components/ui/Map';
import { OnMarketMouseEvent } from '@/components/ui/Map/Map';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { NetworkStateContext } from './NetworksContext';
import { getNetworksMarkers } from './networks.utils';

const NetworksMap = () => {
  const { networks } = useContext(NetworkStateContext);
  const router = useRouter();

  const markers = getNetworksMarkers(networks);

  const handleMapRouting = (e: OnMarketMouseEvent) => {
    if (!e.features) {
      return;
    }
    const id = e?.features[0]?.properties?.id;
    router.push(`networks/${id}`);
  };

  return (
    <Map
      id="networks"
      onMarkerClick={e => handleMapRouting(e)}
      markers={markers}
    />
  );
};

export default NetworksMap;
