export const NFTCard = (props: any) => {
  const { nft } = props;
  console.log('processing NFT:', nft);
  const defaultImage =
    'https://assets-global.website-files.com/5f973c970bea5548ad4287ef/6088f4c7c34ad61ab10cdf72_horizontal-logo-onecolor-neutral-alchemy.svg';

  const mediaUrl =
    nft && nft.media && nft.media.length > 0 && nft.media[0].gateway
      ? nft.media[0].gateway
      : defaultImage;
  return (
    <div className="flex w-1/4 flex-col ">
      <div className="rounded-md">
        {!mediaUrl.endsWith('.mp4') && (
          <img
            className="h-128 w-full rounded-t-md object-cover"
            src={mediaUrl}
          ></img>
        )}
        {!!mediaUrl.endsWith('.mp4') && (
          <video className="clip w-full shadow-lg" autoPlay loop controls muted>
            <source src={mediaUrl} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-md bg-slate-100 px-2 py-3 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            Id: {nft.id && nft.id.tokenId ? nft.id.tokenId : 'Undefined'}
          </p>
          <p className="text-gray-600">
            {nft.contract ? nft.contract.address : 'Undefined'}
          </p>
        </div>

        <div className="mt-2 flex-grow">
          <p className="text-gray-600">{nft.description || 'Undefined'}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
