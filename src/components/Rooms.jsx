import Swal from "sweetalert2";
import image1 from "../assets/images/classic-double-room-.jpg";
import image2 from "../assets/images/comfort-triple-room.jpg";
import image from "../assets/images/superior-double-room.jpg";
import SimpleCard from "./SimpleCard";

const Rooms = () => {
  const handleDetails = () => {
    Swal.fire({
      title: `This Feature will  Coming Soon`,
      showClass: {
        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
      },
      hideClass: {
        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
      },
    });
  };
  return (
    <>
      <div className="w-11/12 md:max-w-screen-xl mx-auto flex items-center justify-between py-10">
        <div className="text-base font-normal">
          <div className="divider w-2/5 divider-neutral p-2"></div>
          <p className="text-sm font-medium uppercase">
            RAISING COMFORT TO THE HIGHEST LEVEL
          </p>
          <h4 className=" text-2xl lg:text-4xl font-semibold">
            Rooms & Suites
          </h4>
        </div>
        <button
          onClick={handleDetails}
          className="btn btn-outline rounded-full md:px-8 hover:bg-[#142943] mt-4"
        >
          View All
        </button>
      </div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3  gap-12 ">
        <SimpleCard image={image} title={"Superior Double Room"} price={129} />
        <SimpleCard image={image1} title={"Superior Double Room"} price={129} />
        <SimpleCard image={image2} title={"Superior Double Room"} price={129} />
      </div>
    </>
  );
};

export default Rooms;
