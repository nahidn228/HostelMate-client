import bgimg from "../assets/images/fullImg.jpg";

import { FaShip, FaSpa, FaSwimmer, FaUmbrellaBeach } from "react-icons/fa";
import { GiDivingHelmet } from "react-icons/gi";
import { MdFitnessCenter, MdMeetingRoom, MdSurfing } from "react-icons/md";

const OurAmenities = () => {
  const services = [
    { icon: <FaSwimmer />, title: "Swimming Pool" },
    { icon: <FaSpa />, title: "Spa & Massage" },
    { icon: <MdSurfing />, title: "Surfing Lessons" },
    { icon: <GiDivingHelmet />, title: "Diving & Snorkeling" },
    { icon: <MdFitnessCenter />, title: "Gym & Yoga" },
    { icon: <FaShip />, title: "Boat Tours" },
    { icon: <MdMeetingRoom />, title: "Conference Room" },
    { icon: <FaUmbrellaBeach />, title: "Private Beach" },
  ];
  return (
    <div
      className="w-full bg-center bg-cover h-[28rem] "
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      <div className="flex items-center justify-items-start  max-w-screen-xl mx-auto  h-full bg-gray-900/50 relative">
        <div className="w-3/5 hidden lg:flex"></div>
        <div className=" bg-[#3F9CC1]/50  backdrop-blur-sm w-full  lg:w-2/5  space-y-5 h-full p-8 pt-14 px-10 ">
          <h1 className="text-xl font-normal text-white lg:text-3xl">
            Our Amenities
          </h1>
          <p className="text-base font-normal text-white lg:text-lg">
            The hotel is arranged on three floors without a lift. On the ground
            floor, apart from the reception, there is a comfortable lounge where
            you can sit and drink tea.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center  transition duration-300"
              >
                <div className=" text-white mr-4">
                  {service.icon}
                </div>
                <h3 className=" text-white font-semibold">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAmenities;
