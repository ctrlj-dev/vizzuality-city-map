import { Map } from '@/components/ui/Map';
import { Sidebar } from '@/components/ui/Sidebar';
import { getNetworks } from '@/lib/services';
import { NetworksWrapper } from './NetworksContext';
import { NetworksFilters } from './NetworksFilters';
import NetworksHeader from './NetworksHeader';
import NetworksList from './NetworksList';

const NetworksView = async () => {
  const networks = await getNetworks();

  return (
    <NetworksWrapper initialNetworks={networks}>
      <Sidebar>
        <NetworksHeader />
        <NetworksFilters />
        <NetworksList />
      </Sidebar>
      <Map />
    </NetworksWrapper>
  );
};

export default NetworksView;
