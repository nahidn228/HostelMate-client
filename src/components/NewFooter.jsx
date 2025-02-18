import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";

const NewFooter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please type a valid email address!",
      });
      return;
    }

    Swal.fire({
      title: "Thank you for Subscribe!",
      icon: "success",
      draggable: true,
    });
    e.target.reset();
  };
  return (
    <footer className="bg-[#142943] text-white shadow-sm border-t mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About Section */}
        <div className="flex flex-col items-start">
          <div className="flex gap-2 items-center">
            {/* <HostelMateIcon /> */}
            <img
              src="https://img.icons8.com/?size=100&id=zpM2C9OxTBQZ&format=png&color=000000"
              alt="HostelMateIcon"
              className="w-14"
            />
            <span className="font-bold text-white text-xl">
              <Typewriter
                words={["HostelMate"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={150}
                deleteSpeed={150}
                delaySpeed={1000}
              />
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            HostelMate simplifies hostel life by offering a seamless platform to
            manage meals, schedules, and much more. Stay connected and organized
            with ease.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-semibold  mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-blue-500">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/upcomingMeals" className="hover:text-blue-500">
                Upcoming Meals
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h4 className="text-lg font-semibold  mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@hostelmate.com"
                className="hover:text-gray-900"
              >
                support@hostelmate.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+123456789" className="hover:text-gray-900">
                +1 234 567 89
              </a>
            </li>
            <li>Address: 123 Hostel Street, City, Country</li>
            {/* Email Subscription */}
            <div className="mt-6">
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  name="email"
                  className="flex-1 p-2 border text-black border-blue-300 rounded-l-lg focus:ring focus:ring-blue-800"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
                >
                  <SiMinutemailer />
                </button>
              </form>
            </div>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 mt-8 text-center text-sm text-white">
        © {new Date().getFullYear()} HostelMate. All rights reserved.
      </div>
    </footer>
  );
};

export default NewFooter;
