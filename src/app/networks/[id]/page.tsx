import { StationsView } from '@/components/stations';
import { getStations } from '@/lib/services/cityBikeApi';
import { Suspense } from 'react';

type StationsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: StationsPageProps) {
  const id = (await params).id;

  const stationDetails = await getStations(id);
  const { name, location } = stationDetails;

  return {
    title: `${name} stations - ${location}`,
    description: `Explore the ${name} stations located in ${location}`,
    openGraph: {
      title: `${name} stations`,
      description: `Discover ${name} stations in ${location}.`,
      url: `/stations/${id}`,
      siteName: 'Your Platform',
      type: 'website',
    },
  };
}

export default async function StationsPage({ params }: StationsPageProps) {
  const id = (await params).id;
  return (
    <Suspense>
      <StationsView id={id} />
    </Suspense>
  );
}
