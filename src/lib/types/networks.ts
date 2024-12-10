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

export type License = {
  name: string;
  url: string;
};

export type Network = {
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
  networks: Network[];
};
