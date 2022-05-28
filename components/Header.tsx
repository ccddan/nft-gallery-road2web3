import Image from 'next/image';
import polygonImage from './../public/assets/polygon-logo-full.svg';

interface HeaderProps {
  onCheckbox: (e: any) => void;
  onChange: (e: any) => void;
  onSearch: () => void;
}

export const Header = (props: HeaderProps) => {
  const { onCheckbox, onChange, onSearch } = props;
  return (
    <header className="px-0 md:px-1">
      <div className="mx-auto max-w-screen-xl pt-0 md:px-0 lg:px-8">
        <div className="mt-0 text-center md:text-left">
          <h1 className="title text-2xl font-bold text-gray-900 sm:text-3xl">
            NFT Gallery
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Retrieve all your NFTs with a single click 🤩🤯
            <br />
            By wallet or by collection 🌈
          </p>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-center gap-4 md:mt-1 md:flex-row md:items-end md:justify-end">
          <div className="flex flex-row-reverse items-center md:flex-row">
            <label
              htmlFor="remember-me"
              className="mb-[10px] block px-2 text-sm text-gray-900"
            >
              {' '}
              Is Collection{' '}
            </label>
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="mb-[10px] h-4 w-4 rounded border-gray-300 text-indigo-600 focus:outline-none focus:ring focus:ring-violet-400"
              onChange={onCheckbox}
            />
          </div>

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
                onChange={onChange}
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
            className="hidden h-8 w-px rounded-full bg-gray-200 md:block"
          ></span>

          <div className="mt-6 block shrink-0">
            <Image className="object-cover" src={polygonImage} alt="Polygon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
