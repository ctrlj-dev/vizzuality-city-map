'use client';

import { ArrowLeftIcon, BriefcaseBusinessIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { StationsStateContext } from './StationsContext';

const StationsHeader = () => {
  const { stations } = useContext(StationsStateContext);
  return (
    <header className="relative">
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-primary-800 to-transparent"></div>
      <Image
        tabIndex={-1}
        alt="Couple with bycicles background"
        src={'/img/couple-with-bikes-min.jpg'}
        quality={100}
        fill
        sizes="100vw"
        className="-z-0 absolute object-cover"
      />
      <div className="relative flex flex-col items-start p-10 z-20">
        <Link
          tabIndex={0}
          role="link"
          className="flex items-center bg-white w-10 h-10 rounded-full py-1 px-2 mb-10"
          href="/"
          shallow
        >
          <span>
            <ArrowLeftIcon className="text-secondary-400" />
          </span>
        </Link>
        <h1
          tabIndex={0}
          className="text-white font-bold text-3xl leading-8 mb-2"
        >
          {stations.name}
        </h1>
        <div className="text-toreabay-100 text-base">
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="w-4 text-white h-4 shrink-0" />
            <h2 tabIndex={0} className="text-sm text-white leading-7">
              {stations.location?.city},{stations.location?.country}
            </h2>
          </div>
          <div className="flex text-white  items-center gap-2">
            <BriefcaseBusinessIcon className="w-4 h-4 shrink-0" />
            <p tabIndex={0} className="leading-5">
              {stations.company?.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StationsHeader;
