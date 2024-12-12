'use client';
import { Network } from '@/lib/types/networks';
import { useSearchParams } from 'next/navigation';

import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

export type NetworksFilters = {
  search?: string;
  country?: string;
};

type NetworksState = {
  networks: Network[];
  loading: boolean;
  currentPage: number;
  filters: NetworksFilters;
};

type NetworksAPI = {
  handleSetNetworks: (networks: Network[]) => void;
  handleSetFilters: (filters: NetworksFilters) => void;
  handleSetPage: (page: number) => void;
};

export const NetworkStateContext = createContext<NetworksState>(
  {} as NetworksState
);
export const NetworkAPIContext = createContext<NetworksAPI>({} as NetworksAPI);

NetworkStateContext.displayName = 'NetworkStateContext';
NetworkAPIContext.displayName = 'NetworkApiContext';

enum NetworksActionType {
  SET_NETWORKS = 'SET_NETWORKS',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_FILTERS = 'SET_FILTERS',
}

type NetworksAction =
  | { type: NetworksActionType.SET_NETWORKS; payload: Network[] }
  | { type: NetworksActionType.SET_CURRENT_PAGE; payload: number }
  | { type: NetworksActionType.SET_FILTERS; payload: NetworksFilters };

const networksReducer = (
  state: NetworksState,
  action: NetworksAction
): NetworksState => {
  switch (action.type) {
    case NetworksActionType.SET_NETWORKS:
      return {
        ...state,
        networks: action.payload,
        loading: false,
        currentPage: 1,
      };
    case NetworksActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case NetworksActionType.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
        loading: false,
        currentPage: 1,
      };
    default:
      return state;
  }
};

type NetworksWrapperProps = PropsWithChildren & {
  initialNetworks: Network[];
};

export const NetworksWrapper: FC<NetworksWrapperProps> = ({
  initialNetworks,
  children,
}) => {
  const [state, dispatch] = useReducer(networksReducer, {
    networks: initialNetworks,
    loading: true,
    currentPage: 1,
    filters: {},
  });
  const params = useSearchParams();
  const filteredNetworksRef = useRef(state.networks);

  const api: NetworksAPI = useMemo(() => {
    return {
      handleSetNetworks(networks: Network[]) {
        dispatch({
          type: NetworksActionType.SET_NETWORKS,
          payload: networks,
        });
      },
      handleSetFilters(filters: NetworksFilters) {
        dispatch({ type: NetworksActionType.SET_FILTERS, payload: filters });
      },
      handleSetPage(number: number) {
        dispatch({
          type: NetworksActionType.SET_CURRENT_PAGE,
          payload: number,
        });
      },
    };
  }, []);

  useEffect(() => {
    const country = params.get('country');
    const search = params.get('search');
    const filters = {
      ...(search && { search }),
      ...(country && { country }),
    };
    if (filters) {
      api.handleSetFilters(filters);
    }
  }, []);

  useEffect(() => {
    let networks = filteredNetworksRef.current;
    if (state.filters.country) {
      const country = state.filters.country;
      networks = filteredNetworksRef.current.filter(
        network => network.location.country === country
      );
    }
    if (state.filters.search) {
      const search = state.filters.search.toLowerCase();
      networks = networks.filter(network => {
        const nameMatch = network.name.toLowerCase().includes(search);

        const companyMatch = network.company.some(company =>
          company.toLowerCase().includes(search)
        );

        return nameMatch || companyMatch;
      });
    }
    api.handleSetNetworks(networks);
  }, [state.filters]);

  return (
    <NetworkAPIContext.Provider value={api}>
      <NetworkStateContext.Provider value={state}>
        {children}
      </NetworkStateContext.Provider>
    </NetworkAPIContext.Provider>
  );
};
