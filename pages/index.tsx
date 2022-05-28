import Head from 'next/head';
import Image from 'next/image';
import NFTCard from '../components/NFTCard';
import type { NextPage } from 'next';
import config from '../config';
import { useState } from 'react';

const Home: NextPage = () => {
  const [wallet, setWalletAddress] = useState('');
  const [collection, setCollectionAddress] = useState('');
  const [NFTs, setNFTs] = useState<any>([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log('fetching nfts');
    const baseURL = `${config.rpcUrl}/getNFTs/`;
    var requestOptions = {
      method: 'GET',
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log('fetching nfts for collection owned by address');
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log('nfts:', nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET',
      };
      const baseURL = `${config.rpcUrl}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log('NFTs in collection:', nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NFT Gallery - Alchemy NFT API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex w-full flex-col items-center justify-center gap-y-2">
          <input
            type="text"
            placeholder="Add your wallet address"
            onChange={(e) => {
              setWalletAddress(e.target.value.trim());
            }}
            disabled={fetchForCollection}
          ></input>
          <input
            type="text"
            placeholder="Add the collection address"
            onChange={(e) => {
              setCollectionAddress(e.target.value.trim());
            }}
          ></input>
          <label className="text-gray-600 ">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => {
                setFetchForCollection(e.target.checked);
              }}
            ></input>
            Fetch for collection
          </label>
          <fieldset
            disabled={wallet.length != 42 || !wallet.startsWith('0x')}
            className="w-1/5"
          >
            <button
              className="mt-3 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500"
              // onClick={() =>
              //   fetchForCollection ? fetchNFTsForCollection() : fetchNFTs()
              // }
            >
              Let's go!{' '}
            </button>
          </fieldset>
        </div>
      </main>

      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {NFTs.length > 0 &&
          NFTs.map((nft: any, idx: number) => {
            return <NFTCard key={idx} nft={nft}></NFTCard>;
          })}
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
    </div>
  );
};

export default Home;
