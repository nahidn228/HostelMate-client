import { Link } from "react-router-dom";

const NewFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 shadow-sm border-t mt-8">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About Section */}
        <div className="flex flex-col items-start">
          <div className="flex gap-2 items-center">
            {/* <HostelMateIcon /> */}
            <img
              src="https://img.icons8.com/?size=100&id=zpM2C9OxTBQZ&format=png&color=000000"
              alt="HostelMateIcon"
              className="w-14"
            />
            <span className="font-bold text-black text-xl">HostelMate</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            HostelMate simplifies hostel life by offering a seamless platform to
            manage meals, schedules, and much more. Stay connected and organized
            with ease.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-gray-900">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/upcomingMeals" className="hover:text-gray-900">
                Upcoming Meals
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-900">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Us
          </h4>
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
          </ul>
        </div>
      </div>

      <div className="border-t py-4 mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} HostelMate. All rights reserved.
      </div>
    </footer>
  );
};

export default NewFooter;
