/* eslint-disable react/prop-types */
const SimpleCard = ({ image, title, price }) => {
  return (
    <div className=" card rounded-none">
      <figure>
        <img className='object-cover' src={image} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="text-2xl font-light">{title}</h2>
        <p className="tex-xs font-light">
          $ <span className="text-xl">{price}</span> / per night
        </p>
      </div>
    </div>
  );
};

export default SimpleCard;
