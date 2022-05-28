import Alert from '../components/Alert';
import Empty from '../components/Empty';
import Head from 'next/head';
import { Header } from './../components/Header';
import Image from 'next/image';
import NFTCard from '../components/NFTCard';
import type { NextPage } from 'next';
import config from '../config';
import data from './../public/assets/data.json';
import { useState } from 'react';

const Home: NextPage = () => {
  const [alert, setAlert] = useState('');
  const [address, setAddress] = useState('');
  const [NFTs, setNFTs] = useState<any>([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log('fetching nfts');
    const baseURL = `${config.rpcUrl}/getNFTs/`;
    var requestOptions = {
      method: 'GET',
    };

    const fetchURL = `${baseURL}?owner=${address}`;
    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());

    if (nfts && nfts.ownedNfts.length) {
      console.log('nfts:', nfts);
      setNFTs(nfts.ownedNfts);
    } else {
      setAlert('This address did not return any NFT');
    }
  };

  const fetchNFTsForCollection = async () => {
    var requestOptions = {
      method: 'GET',
    };
    const baseURL = `${config.rpcUrl}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${address}&withMetadata=${'true'}`;
    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    );
    if (nfts && nfts.nfts.length) {
      console.log('NFTs in collection:', nfts);
      setNFTs(nfts.nfts);
    } else {
      setAlert('This address did not return any NFT');
    }
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
            }}
            onChange={(e) => {
              setAddress(e.target.value.trim());
            }}
            onSearch={() => {
              console.log('Fetching NFTs...');
              if (!address.length) {
                setAlert(
                  'Your should specify the address of a wallet or a collection'
                );
                return;
              }
              if (!address.startsWith('0x') || address.length != 42) {
                setAlert('This address is not valid, try with another one');
                return;
              }
              fetchForCollection ? fetchNFTsForCollection() : fetchNFTs();
            }}
          />
        </div>
      </div>

      <div className="container m-auto mt-10 mb-20 min-h-screen overflow-hidden">
        {!NFTs.length && <Empty />}
        <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-5 xl:grid-cols-5">
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
