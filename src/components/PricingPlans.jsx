import { useContext } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { AuthContext } from "./../providers/AuthProvider";

const plans = [
  {
    id: 100,
    planName: "Silver",
    name: (
      <div className="flex gap-2 items-center">
        <p>Silver</p>{" "}
        <span className="text-[#B4B4B4]">
          {" "}
          <HiCheckBadge />
        </span>
      </div>
    ),
    price: "$100/month",
    features: [
      { text: "Breakfast and Dinner included", included: true },
      { text: "Vegetarian options available", included: true },
      { text: "Access to weekly special meals", included: false },
      { text: "Custom meal preferences", included: false },
    ],
  },
  {
    id: 150,
    planName: "Gold",
    name: (
      <div className="flex gap-2 items-center">
        <p>Gold</p>{" "}
        <span className="text-[#E3C674]">
          {" "}
          <HiCheckBadge />
        </span>
      </div>
    ),
    price: "$150/month",
    features: [
      { text: "Breakfast, Lunch, and Dinner included", included: true },
      {
        text: "Vegetarian and Non-Vegetarian options available",
        included: true,
      },
      { text: "Access to weekly special meals", included: true },
      { text: "Custom meal preferences", included: false },
    ],
    highlight: true,
  },
  {
    id: 220,
    planName: "Platinum",
    name: (
      <div className="flex gap-2 items-center">
        <p>Platinum</p>{" "}
        <span className="text-[#BABBC8]">
          {" "}
          <HiCheckBadge />
        </span>
      </div>
    ),
    price: "$220/month",
    features: [
      {
        text: "All meals included (Breakfast, Lunch, Dinner, Snacks)",
        included: true,
      },
      {
        text: "Vegetarian and Non-Vegetarian options available",
        included: true,
      },
      { text: "Access to weekly special meals", included: true },
      { text: "Custom meal preferences", included: true },
    ],
  },
];

const PricingPlans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handlePlans = async (plan) => {
    console.log(plan.id);
    const planData = {
      name: plan.planName,
      price: plan.id,
      email: user?.email,
      time: new Date(),
    };

    try {
      const { data } = axiosSecure.post("/carts", planData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-black py-10 px-8 max-w-screen-xl mx-auto">
      <div data-aos="fade-up" className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Select Your Plan</h1>
        <p className="text-gray-600 mt-4">
          No hidden fees, equipment rentals, or installation appointments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        {plans.map((plan, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className={`relative flex flex-col p-6 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
              plan.highlight
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                : "bg-white text-black"
            }`}
          >
            {/* Highlight Badge */}
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                Featured
              </div>
            )}

            {/* Card Content */}
            <div className="flex-grow">
              {/* Plan Name */}
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {plan.name}
              </h2>

              {/* Plan Features */}
              <ul className="mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 mb-3 text-sm"
                  >
                    {feature.included ? (
                      <FaCheck
                        className={`text-green-500 ${
                          plan.highlight ? "text-green-300" : ""
                        }`}
                      />
                    ) : (
                      <FaTimes
                        className={`text-red-500 ${
                          plan.highlight ? "text-red-300" : ""
                        }`}
                      />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* Plan Price */}
              <p className="text-3xl font-extrabold mb-6">{plan.price}</p>
            </div>

            {/* Select Plan Button */}
            <Link
              to="/dashboard/payment"
              onClick={() => handlePlans(plan)}
              className={`w-full btn py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? "bg-white text-blue-600 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Select Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
