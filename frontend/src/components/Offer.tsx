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
        <div className="offer-title-wrapper">
          <h3 className="offer-title">{title}</h3>
          <div className="lil-triangle"></div>
        </div>
        <img className="offer-img" src={img} alt={title} />
        <div className="offer-bottom-wrapper">
          <div className="offer-bottom">
            <span className="offer-address">{address}</span>
            <span className="offer-price">{price}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Offer;
