'use client';

import { useContext } from 'react';
import NetworksListContext from './NetworksContext';
import NetworksItem from './NetworksItem';

const NetworksList = () => {
  const { networks } = useContext(NetworksListContext);

  if (!networks || networks.length === 0) {
    return <p className="mt-8 text-primary-800">No networks available...</p>;
  }

  return (
    <div className="my-4">
      {networks.map(network => (
        <NetworksItem
          key={network.id}
          id={network.id}
          name={network.name}
          company={network.company}
          location={network.location}
        />
      ))}
    </div>
  );
};

export default NetworksList;
