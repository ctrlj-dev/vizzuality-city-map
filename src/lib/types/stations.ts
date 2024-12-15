import { Location } from './networks';

type Extra = {
  number: number;
  reviews: number;
  score: number;
  status: string;
  uid: string;
};

export type StationResponse = {
  empty_slots: number;
  extra: Extra;
  free_bikes: number;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  timestamp: string;
};

type StationDetailResponse = {
  company: string[];
  href: string;
  id: string;
  location: Location;
  name: string;
  source: string;
  stations: StationResponse[];
};

export type StationsListResponse = {
  network: StationDetailResponse;
};

export type Station = {
  emptySlots: number;
  freeBikes: number;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
};

export type StationList = {
  id: string;
  company: string[];
  location: Location;
  name: string;
  stations: Station[];
};
