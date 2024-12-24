import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/useWindowDimensions.hook';

const CardSkeleton = () => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <div
      className={cn(
        'flex flex-col relative gap-8 border rounded-lg p-4 shadow cursor-pointer',
        windowWidth! > 740 ? 'w-[100%] h-[45vh]' : 'w-[100%] h-[45vh]',
      )}
    >
      <Skeleton className="h-[61%] w-[100%] rounded-xl" />
      <div className="space-y-2 w-[100%]">
        <Skeleton className="h-4 w-[17%]" />
        <div className="flex gap-2 space-between w-[100%]">
          <Skeleton className="h-4 w-[15%]" />
          <Skeleton className="h-4 w-[10%]" />
          <Skeleton className="h-4 w-[10%]" />
        </div>
        <div className="flex flex-wrap gap-2 space-around w-[100%]">
          <Skeleton className="h-4 w-[25%]" />
          <Skeleton className="h-4 w-[35%]" />
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[30%]" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
