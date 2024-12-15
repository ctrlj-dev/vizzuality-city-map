'use client';
import { Station } from '@/lib/types';
import {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useReducer,
} from 'react';

type SortBy = 'freeBikes' | 'emptySlots' | null;

export type StationsState = {
  stations: Station[];
  currentPage: number;
  sortBy: SortBy;
  isAscending: boolean;
};

export type StationsAPI = {
  handleSetStations: (Stations: Station[]) => void;
  handleSetPage: (page: number) => void;
  handleSort: (column: 'freeBikes' | 'emptySlots') => void;
};

export const StationsStateContext = createContext<StationsState>(
  {} as StationsState
);
export const StationsAPIContext = createContext<StationsAPI>({} as StationsAPI);

StationsStateContext.displayName = 'StationsStateContext';
StationsAPIContext.displayName = 'StationsApiContext';

enum StationsActionType {
  SET_STATIONS = 'SET_STATIONS',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_SORT = 'SET_SORT',
}

type StationsAction =
  | { type: StationsActionType.SET_STATIONS; payload: Station[] }
  | { type: StationsActionType.SET_CURRENT_PAGE; payload: number }
  | {
      type: StationsActionType.SET_SORT;
      payload: { sortBy: SortBy; isAscending: boolean };
    };

const StationsReducer = (
  state: StationsState,
  action: StationsAction
): StationsState => {
  switch (action.type) {
    case StationsActionType.SET_STATIONS:
      return {
        ...state,
        stations: action.payload,
        currentPage: 1,
      };
    case StationsActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case StationsActionType.SET_SORT:
      const { sortBy, isAscending } = action.payload;
      return {
        ...state,
        sortBy,
        isAscending,
      };
    default:
      return state;
  }
};

type StationsWrapperProps = PropsWithChildren & {
  initialStations: Station[];
};

export const StationsWrapper: FC<StationsWrapperProps> = ({
  initialStations,
  children,
}) => {
  const [state, dispatch] = useReducer(StationsReducer, {
    stations: initialStations,
    currentPage: 1,
    sortBy: null,
    isAscending: true,
  });

  const api: StationsAPI = useMemo(() => {
    return {
      handleSetStations(stations: Station[]) {
        dispatch({
          type: StationsActionType.SET_STATIONS,
          payload: stations,
        });
      },
      handleSetPage(number: number) {
        dispatch({
          type: StationsActionType.SET_CURRENT_PAGE,
          payload: number,
        });
      },
      handleSort(column: 'freeBikes' | 'emptySlots') {
        const isAscending = state.sortBy === column ? !state.isAscending : true;
        dispatch({
          type: StationsActionType.SET_SORT,
          payload: { sortBy: column, isAscending },
        });
      },
    };
  }, [state.sortBy, state.isAscending]);

  return (
    <StationsAPIContext.Provider value={api}>
      <StationsStateContext.Provider value={state}>
        {children}
      </StationsStateContext.Provider>
    </StationsAPIContext.Provider>
  );
};
