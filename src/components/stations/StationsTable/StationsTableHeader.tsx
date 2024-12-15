import { ArrowDownUp } from 'lucide-react';
import { useContext } from 'react';
import { StationsAPIContext } from '../StationsContext';

const StationsTableHeader = () => {
  const { handleSort } = useContext(StationsAPIContext);

  return (
    <thead>
      <tr>
        <th className="w-1/3 px-4 py-2 border-b-2 border-white uppercase tracking-wide text-sm font-medium">
          Station Name
        </th>
        <th
          className="w-1/3 px-4 py-2 border-b-2 border-white text-sm uppercase tracking-wide font-medium cursor-pointer"
          onClick={() => handleSort('freeBikes')}
        >
          <span className="inline-flex flex-row items-center">
            Free Bikes
            <ArrowDownUp className="ml-2 w-4 h-4" />
          </span>
        </th>
        <th
          className="w-1/3 px-4 py-2 border-b-2 border-white text-sm uppercase tracking-wide font-medium cursor-pointer"
          onClick={() => handleSort('emptySlots')}
        >
          <span className="inline-flex flex-row items-center justify-start">
            Empty Slots
            <ArrowDownUp className="ml-2 w-4 h-4" />
          </span>
        </th>
      </tr>
    </thead>
  );
};

export default StationsTableHeader;
