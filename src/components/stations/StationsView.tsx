import { getStations } from '@/lib/services/cityBikeApi';
import { Sidebar } from '../ui/Sidebar';
import { StationsWrapper } from './StationsContext';
import StationsHeader from './StationsHeader';
import StationsMap from './StationsMap';
import { StationsTable } from './StationsTable';

type StationsViewProps = {
  id: string;
};

const StationsView = async ({ id }: StationsViewProps) => {
  const stations = await getStations(id);
  return (
    <StationsWrapper initialStations={stations}>
      <Sidebar className="p-0 bg-primary-800">
        <StationsHeader />
        <StationsTable />
      </Sidebar>
      <StationsMap />
    </StationsWrapper>
  );
};

export default StationsView;
