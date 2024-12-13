import { NetworksView } from '@/components/networks';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <NetworksView />
    </Suspense>
  );
}
