import cardImg1 from "../assets/images/welcome-1-902x1024.jpg";
import cardImg2 from "../assets/images/welcome-2-1024x705.jpg";

const LongCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-20">
      {/* Photo */}
      <div className="w-1/2 relative">
        <img
          className="w-4/6 min-h-full shadow-xl object-cover"
          src={cardImg1}
          alt=""
        />
        <img
          className="absolute bottom-0 h-1/2 right-16 w-2/4 shadow-xl"
          src={cardImg2}
          alt=""
        />
      </div>
      {/* content */}
      <div className="w-1/2 space-y-4">
        <div className="divider w-1/4 divider-success p-2"></div>
        <p className="text-sm font-medium uppercase">
          RAISING COMFORT TO THE HIGHEST LEVEL
        </p>
        <h4 className=" text-2xl lg:text-4xl font-semibold">
          Welcome to HostelMate{" "}
        </h4>
        <div className="ml-4 lg:ml-12 text-base font-normal">
          <p>
            The Hotel Luviana is the right choice for visitors who are searching
            for a combination of charm and a convenient position from where to
            explore surroundings.
          </p>{" "}
          <br />
          <p>
            The rooms are arranged on the first, second and third floors. On the
            top floor, there is also a charming terrace or solarium available
            for the use of guests, from where you can enjoy the view.
          </p>
          <button className="btn btn-outline rounded-full md:px-8 hover:bg-green-600 mt-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
