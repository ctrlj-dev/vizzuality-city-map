'use client';
import { Network } from '@/lib/types/networks';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

type NetworksContextValue = {
  networks: Network[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setNetworks: Dispatch<SetStateAction<Network[]>>;
};

export const NetworksContext = createContext<NetworksContextValue>(
  {} as NetworksContextValue
);

type NetworksWrapperProps = PropsWithChildren & {
  initialNetworks: Network[];
};

export const NetworksWrapper: FC<NetworksWrapperProps> = ({
  initialNetworks,
  children,
}) => {
  const [networks, setNetworks] = useState<Network[]>(initialNetworks);
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <NetworksContext.Provider
      value={{
        networks,
        setNetworks,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
};

export default NetworksContext;
