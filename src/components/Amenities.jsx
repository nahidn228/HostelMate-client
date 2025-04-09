import { FaShip, FaSpa, FaSwimmer, FaUmbrellaBeach } from "react-icons/fa";
import { GiDivingHelmet } from "react-icons/gi";
import { MdFitnessCenter, MdMeetingRoom, MdSurfing } from "react-icons/md";
import bgimg from "../assets/images/fullImg.jpg";
const Amenities = () => {
  const amenities = [
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
    <div className="relative max-w-screen-xl mx-auto ">
      {/* Background Image */}
      <div
        className="h-[32rem] bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-end rounded-md">
          {/* Amenities Card */}
          <div className="bg-blue-600/70 text-white p-8 mx-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Amenities</h2>
            <p className="text-sm mb-6">
              The hotel is arranged on three floors without a lift. On the
              ground floor, apart from the reception, there is a comfortable
              lounge where you can sit and drink tea.
            </p>
            <ul className="grid grid-cols-2 gap-4">
              {amenities.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="text-xl mr-3">{item.icon}</div>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
