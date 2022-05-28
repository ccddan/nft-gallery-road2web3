export const NFTCard = (props: any) => {
  const { nft } = props;
  const defaultImage =
    'https://assets-global.website-files.com/5f973c970bea5548ad4287ef/6088f4c7c34ad61ab10cdf72_horizontal-logo-onecolor-neutral-alchemy.svg';

  const mediaUrl =
    nft && nft.media && nft.media.length > 0 && nft.media[0].gateway
      ? nft.media[0].gateway
      : defaultImage;
  const title = nft.title || 'Undefined';
  const tokenId = parseInt(nft.id && nft.id.tokenId ? nft.id.tokenId : '', 16);
  const address = nft.contract ? nft.contract.address : 'Undefined';
  const description = nft.description || 'Undefined';

  return (
    <div className="block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
      {!mediaUrl.endsWith('.mp4') && (
        <img
          className="hover:animate h-56 w-full object-cover transition-all ease-in hover:scale-110"
          src={mediaUrl}
        ></img>
      )}
      {!!mediaUrl.endsWith('.mp4') && (
        <video
          className="clip h-56 w-full object-cover shadow-lg"
          autoPlay
          loop
          controls
          muted
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      )}

      <div className="p-6">
        <h5 className="text-xl font-bold">
          #{tokenId} - {title}
        </h5>

        <p className="mt-2 text-sm text-gray-500">{description}</p>

        <div className="cursor mt-4 inline-block max-w-full overflow-clip text-ellipsis pb-1 font-medium text-blue-600">
          Addr: {address}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
