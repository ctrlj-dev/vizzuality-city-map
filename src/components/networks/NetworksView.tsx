import { Map } from '@/components/ui/Map';
import { Sidebar } from '@/components/ui/Sidebar';
import { getNetworks } from '@/lib/services';
import { NetworksWrapper } from './NetworksContext';
import NetworksCountrySelector from './NetworksCountrySelector';
import NetworksHeader from './NetworksHeader';
import NetworksList from './NetworksList';
import NetworksSearch from './NetworksSearch';

const NetworksView = async () => {
  const networks = await getNetworks();

  return (
    <NetworksWrapper initialNetworks={networks}>
      <Sidebar>
        <NetworksHeader />
        <div className="h-12 flex gap-2 mt-4">
          <NetworksSearch />
          <NetworksCountrySelector />
        </div>
        <NetworksList />
      </Sidebar>
      <Map />
    </NetworksWrapper>
  );
};

export default NetworksView;
