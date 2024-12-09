import { Map } from '../ui/Map';

const NetworkView = () => {
  return (
    <main className="grid grid-cols-[551px_auto] w-screen h-screen">
      <aside className="relative flex flex-col gap-4 h-full overflow-y-scroll p-10">
        <h1 className="text-3xl font-semibold text-toreabay-800 leading-10">
          Discover bike networks
        </h1>
      </aside>
      <Map />
    </main>
  );
};

export default NetworkView;
