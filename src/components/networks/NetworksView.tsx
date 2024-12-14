import { Sidebar } from '@/components/ui/Sidebar';
import { getNetworks } from '@/lib/services';
import { NetworksWrapper } from './NetworksContext';
import { NetworksFilters } from './NetworksFilters';
import NetworksHeader from './NetworksHeader';
import NetworksList from './NetworksList';
import { NetworksMap } from './NetWorksMap';

const NetworksView = async () => {
  const networks = await getNetworks();

  return (
    <NetworksWrapper initialNetworks={networks}>
      <Sidebar>
        <NetworksHeader />
        <NetworksFilters />
        <NetworksList />
      </Sidebar>
      <NetworksMap />
    </NetworksWrapper>
  );
};

export default NetworksView;
