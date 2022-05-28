import Image from 'next/image';
import polygonImage from './../public/assets/polygon-logo-full.svg';

interface HeaderProps {
  onSearch: () => void;
}

export const Header = (props: HeaderProps) => {
  const { onSearch } = props;
  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-0 py-8 lg:px-8">
        <div className="mt-0">
          <h1 className="title text-2xl font-bold text-gray-900 sm:text-3xl">
            NFT Gallery
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Retrieve all your NFTs with a single click 🤩🤯
            <br />
            By wallet or by collection 🌈
          </p>
        </div>
        <div className="flex items-end justify-end gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <label className="sr-only" htmlFor="search">
                {' '}
                Search{' '}
              </label>

              <input
                className="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm focus:outline-none focus:ring focus:ring-violet-400"
                id="search"
                type="search"
                placeholder="Address: 0x..."
              />

              <button
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full  bg-pink-100 p-2 text-gray-600 transition hover:text-gray-700"
                type="button"
                aria-label="Submit Search"
                onClick={onSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="block h-6 w-px rounded-full bg-gray-200"
          ></span>

          <a href="" className="block shrink-0">
            <Image className="object-cover" src={polygonImage} alt="Polygon" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
