import Image from 'next/image';

const NetworksHeader = () => {
  return (
    <header>
      <Image
        className="mb-6"
        src="/brand.svg"
        width={135}
        height={28}
        alt="Cycle map rider logo"
      />
      <h1 className="text-3xl font-semibold text-primary-800 leading-10 mb-4">
        Discover bike networks
      </h1>
      <p className="text-zinc-500 text-sm">
        Discover bicycle stations worldwide with our user-friendly app. Locate
        nearby bike-sharing options and get real-time availability updates to
        enjoy eco-friendly transportation.
      </p>
    </header>
  );
};

export default NetworksHeader;
