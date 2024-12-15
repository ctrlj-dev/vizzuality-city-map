import { StationsView } from '@/components/stations';
import { Suspense } from 'react';

type StationsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StationsPage({ params }: StationsPageProps) {
  const id = (await params).id;
  return (
    <Suspense>
      <StationsView id={id} />
    </Suspense>
  );
}
