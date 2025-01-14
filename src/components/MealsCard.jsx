/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";

import "@smastrom/react-rating/style.css";

const MealsCard = ({ meal }) => {
  const { _id, mealImage, title, rating, price } = meal || {};

  return (
    <>
      <Link to={`/meal/${_id}`}>
        <div className=" group  ml-4">
          <div className="rounded-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            {/* Meal mealImage */}
            <img
              src={mealImage}
              alt={title}
              className="w-full h-64 object-cover rounded-xl "
            />

            {/* "Hover" Text */}
            <div className="absolute inset-0 flex justify-center items-center text-black text-6xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black  bg-opacity-75 ">
              <div className="absolute bg-gray-800 backdrop-blur-xl bg-opacity-35  top-3 left-3   text-2xl font-medium uppercase  px-2 py-1 text-black rounded">
                <p className="flex items-center gap-1"></p>
              </div>
              <div className="absolute top-3 right-3 bg-gray-800 backdrop-blur-xl bg-opacity-35 text-sm font-medium uppercase text-white px-2 py-1 rounded flex gap-1 items-center">
                <span className="text-yellow-400 font-bold">
                  <GoStarFill />
                </span>
                {rating}
              </div>
              <button className="btn btn-outline btn-accent">Details</button>
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-4 flex flex-col space-y-4 ">
            <h2 className="text-2xl font-light text-black truncate group-hover:text-blue-500">
              {title}
            </h2>
            <div className="flex justify-between items-center text-sm text-black">
              <p className="tex-xs font-light">
                $ <span className="text-xl">{price}</span>
              </p>
              <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MealsCard;
