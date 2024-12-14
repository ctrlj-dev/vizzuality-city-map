export type Country = {
  code: string;
  name: string;
};

export type Location = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

type License = {
  name: string;
  url: string;
};

export type Network = {
  company: string[];
  id: string;
  location: Location;
  name: string;
};

type NetworkResponse = {
  company: string[];
  href: string;
  id: string;
  location: Location;
  name: string;
  source?: string;
  gbfs_href?: string;
  ebikes?: boolean;
  license?: License;
};

export type NetWorksResponse = {
  networks: NetworkResponse[];
};