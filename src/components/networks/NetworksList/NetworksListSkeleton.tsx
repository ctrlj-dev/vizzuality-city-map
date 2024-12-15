import { Skeleton } from '@/components/ui/Skeleton';

const NetworksListSkeleton = () => {
  return (
    <div className="flex flex-col my-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col my-4 animate-pulse">
          <Skeleton className="h-6 w-24 rounded-md mb-4" />
          <Skeleton className="h-20 rounded-md w-full" />
        </div>
      ))}
    </div>
  );
};
export default NetworksListSkeleton;
