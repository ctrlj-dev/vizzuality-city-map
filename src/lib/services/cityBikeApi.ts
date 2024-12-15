import { config } from '../config';
import { StationDetails, StationsDetailsResponse } from '../types';
import { Network, NetWorksResponse } from '../types/networks';
import {
  networksResponseToNetworks,
  stationNotFound,
  stationsResponseToStations,
} from './mappers/cityBikeApi.mappers';

const API_BASE_URL = config.apiBaseUrl;

async function getNetworks(): Promise<Network[]> {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch networks: ${response.status} ${response.statusText}`
      );
    }

    const jsonData: NetWorksResponse = await response.json();

    if (!Array.isArray(jsonData.networks)) {
      throw new Error('Invalid response format: networks is not an array');
    }

    return networksResponseToNetworks(jsonData);
  } catch (err) {
    console.error('Error fetching networks:', err);
    return [];
  }
}

async function getStations(id: string): Promise<StationDetails> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch stations: ${response.status} ${response.statusText}`
      );
    }

    const jsonData: StationsDetailsResponse = await response.json();
    return stationsResponseToStations(jsonData);
  } catch (err) {
    console.error('Error fetching stations:', err);
    return stationNotFound;
  }
}

export { getNetworks, getStations };
