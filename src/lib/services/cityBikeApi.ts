import { config } from '../config';
import { Network, NetWorksResponse } from '../types/networks';
import { networksResponseToNetworks } from './mappers/cityBikeApi.mappers';

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

export { getNetworks };
