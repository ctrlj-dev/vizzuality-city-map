import { getStations } from '@/lib/services/cityBikeApi';
import { memo } from 'react';
import { Sidebar } from '../ui/Sidebar';
import { StationsWrapper } from './StationsContext';
import StationsHeader from './StationsHeader';
import StationsMap from './StationsMap';
import { StationsTable } from './StationsTable';

type StationsViewProps = {
  id: string;
};

const MemoizedStationsHeader = memo(StationsHeader);

const StationsView = async ({ id }: StationsViewProps) => {
  const stationsList = await getStations(id);
  const { stations, name, location, company } = stationsList;

  return (
    <>
      <Sidebar className="p-0 bg-primary-800">
        <MemoizedStationsHeader
          name={name}
          city={location.city}
          country={location.country}
          company={company}
        />
        <StationsWrapper initialStations={stations}>
          <StationsTable />
        </StationsWrapper>
      </Sidebar>
      <StationsMap stations={stations} />
    </>
  );
};

export default StationsView;
