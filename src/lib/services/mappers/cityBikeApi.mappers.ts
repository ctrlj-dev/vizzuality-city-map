import { Network, NetWorksResponse } from '@/lib/types';

const networksResponseToNetworks = (
  response: NetWorksResponse
): Network[] | [] => {
  if (!response) {
    return [];
  }
  return response.networks.map(network => ({
    company: network.company,
    id: network.id,
    location: network.location,
    name: network.name,
  }));
};

export { networksResponseToNetworks };
