import {
  Network,
  NetWorksResponse,
  Station,
  StationList,
  StationResponse,
  StationsListResponse,
} from '@/lib/types';

const networksResponseToNetworks = (
  response: NetWorksResponse
): Network[] | [] => {
  if (!response) {
    return [];
  }
  return response.networks.map(({ company, id, location, name }) => ({
    company: company,
    id: id,
    location: location,
    name: name,
  }));
};

const stationNotFound = {
  id: '0',
  company: [''],
  location: {
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
  },
  name: 'Station not found',
  stations: [],
};

const stationsListReponseToStationsList = (
  response: StationResponse[]
): Station[] => {
  if (!response) {
    return [];
  }
  return response.map(
    ({ empty_slots, free_bikes, id, latitude, longitude, name }) => ({
      emptySlots: empty_slots,
      freeBikes: free_bikes,
      id: id,
      latitude: latitude,
      longitude: longitude,
      name: name,
    })
  );
};

const stationsResponseToStations = (
  response: StationsListResponse
): StationList => {
  if (!response) {
    return stationNotFound;
  }

  const { id, company, location, name, stations } = response.network || {};

  return {
    id: id,
    company: company,
    location: location,
    name: name,
    stations: stationsListReponseToStationsList(stations),
  };
};

export {
  networksResponseToNetworks,
  stationNotFound,
  stationsResponseToStations,
};
