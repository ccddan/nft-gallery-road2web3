import Alert from '../components/Alert';
import Empty from '../components/Empty';
import Head from 'next/head';
import { Header } from './../components/Header';
import Image from 'next/image';
import NFTCard from '../components/NFTCard';
import type { NextPage } from 'next';
import config from '../config';
import { useState } from 'react';

const Home: NextPage = () => {
  const [alert, setAlert] = useState('');
  const [address, setAddress] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [NFTs, setNFTs] = useState<any>([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async (pageKey = '') => {
    let endpoint = 'getNFTs/';
    console.log('fetching nfts for wallet:', endpoint);
    const baseURL = `${config.rpcUrl}/${endpoint}`;
    const pagination = pageKey ? `&pageKey=${pageKey}` : '';
    var requestOptions = {
      method: 'GET',
    };

    const fetchURL = `${baseURL}?owner=${address}${pagination}`;
    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );

    if (nfts && nfts.ownedNfts.length) {
      console.log('nfts:', nfts);
      if (pageKey) setNFTs([...nfts.ownedNfts, ...NFTs]);
      else setNFTs(nfts.ownedNfts);
      setNextPage(nfts.pageKey || '');
    } else {
      setAlert('This address did not return any NFT');
    }
  };

  const fetchNFTsForCollection = async (startToken = '') => {
    let endpoint = 'getNFTsForCollection/';
    console.log('fetching nfts for collection:', endpoint);
    const pagination = startToken ? `&startToken=${startToken}` : '';

    var requestOptions = {
      method: 'GET',
    };
    const baseURL = `${config.rpcUrl}/${endpoint}`;
    const fetchURL = `${baseURL}?contractAddress=${address}&withMetadata=${'true'}${pagination}`;
    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );
    if (nfts && nfts.nfts.length) {
      console.log('NFTs in collection:', nfts);
      if (startToken) setNFTs([...nfts.nfts, ...NFTs]);
      else setNFTs(nfts.nfts);

      setNextPage(nfts.nextToken || '');
    } else {
      setAlert('This address did not return any NFT');
    }
  };

  const search = () => {
    console.log('Fetching NFTs...');
    if (!address.length) {
      setAlert('Your should specify the address of a wallet or a collection');
      return;
    }
    if (!address.startsWith('0x') || address.length != 42) {
      setAlert('This address is not valid, try with another one');
      return;
    }

    fetchForCollection ? fetchNFTsForCollection(nextPage) : fetchNFTs(nextPage);
  };

  return (
    <>
      <Head>
        <title>NFT Gallery - Alchemy NFT API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!alert && (
        <Alert
          message={alert}
          onClose={() => {
            setAlert('');
          }}
        ></Alert>
      )}

      <div className="m-0 w-full overflow-hidden bg-gray-50 p-4 md:p-5">
        <div className="container m-auto">
          <Header
            onCheckbox={(e) => {
              setFetchForCollection(e.target.checked);
              setNextPage('');
              setNFTs([]);
            }}
            onChange={(e) => {
              setAddress(e.target.value.trim());
            }}
            onSearch={search}
          />
        </div>
      </div>

      <div className="container m-auto mt-10 mb-20 min-h-screen overflow-hidden">
        {!NFTs.length && <Empty />}
        <div className="container my-5 flex items-start px-4 align-top md:px-0">
          {!!NFTs.length && (
            <p className="mt-2">
              Total NFTs: <b>{NFTs.length}</b>
            </p>
          )}
          {!!nextPage && (
            <button
              className="group relative ml-10 inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-violet-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-violet-500"
              onClick={search}
            >
              <span className="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:ml-4">
                Load More
              </span>
            </button>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 md:px-0 xl:grid-cols-5">
          {NFTs.length > 0 &&
            NFTs.map((nft: any, idx: number) => {
              return <NFTCard key={idx} nft={nft}></NFTCard>;
            })}
        </div>
      </div>
      <footer className="flex h-24 w-full items-center justify-center border-t text-gray-400">
        © 2022 Road to Web3 by
        <a className="ml-5 pt-2" href="https://www.alchemy.com/">
          <Image
            src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/6088f4c7c34ad61ab10cdf72_horizontal-logo-onecolor-neutral-alchemy.svg"
            alt="Alchemy"
            width={100}
            height={20}
          />
        </a>
      </footer>
    </>
  );
};

export default Home;
