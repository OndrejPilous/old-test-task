import "./Offer.css";

type SrealityOffer = {
  title: string;
  address: string;
  price: string;
  img: string;
  url: string;
};

const Offer: React.FC<SrealityOffer> = ({
  title,
  address,
  price,
  img,
  url,
}) => {
  return (
    <a href={url}>
      <div className="offer">
        <h3 className="offer-title">{title}</h3>
        <img className="offer-img" src={img} alt={title} />
        <span className="offer-address">{address}</span>
        <span className="offer-price">{price}</span>
      </div>
    </a>
  );
};

export default Offer;
