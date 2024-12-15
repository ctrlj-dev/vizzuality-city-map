import {
  Network,
  NetWorksResponse,
  Station,
  StationDetails,
  StationResponse,
  StationsDetailsResponse,
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

const StationsDetailsReponseToStationsDetails = (
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
  response: StationsDetailsResponse
): StationDetails => {
  if (!response) {
    return stationNotFound;
  }

  const { id, company, location, name, stations } = response.network || {};

  return {
    id: id,
    company: company,
    location: location,
    name: name,
    stations: StationsDetailsReponseToStationsDetails(stations),
  };
};

export {
  networksResponseToNetworks,
  stationNotFound,
  stationsResponseToStations,
};
