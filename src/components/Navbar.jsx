import { useContext } from "react";
import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "./../hooks/useAdmin";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  return (
    <div className="navbar shadow-sm  mx-auto  bg-white   font-semibold">
      <div className="navbar-start ">
        <div className="dropdown  lg:hidden">
          <div tabIndex={0} className="items-center gap-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>

            <Link to="/" className="flex gap-2 items-center">
              <span className="font-bold text-black text-xl">
                {" "}
                <Typewriter
                  words={["HostelMate"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </span>
            </Link>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-black"
          >
            <div className="lg:hidden ">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/meals">Meals</Link>
              </li>
              <li>
                <Link to="/upcomingMeals">Upcoming Meals</Link>
              </li>
            </div>
          </ul>
        </div>
        <div className=" hidden lg:flex">
          <Link to="/" className="flex gap-2 items-center">
            {/* <HostelMateIcon /> */}
            <img
              src="https://img.icons8.com/?size=100&id=zpM2C9OxTBQZ&format=png&color=000000"
              alt="HostelMateIcon"
              className="w-14"
            />
            <span className="font-bold  text-xl  text-blue-900">
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
          </Link>
        </div>
      </div>
      <div className="flex-none navbar-end">
        <ul className="menu menu-horizontal px-1">
          <div className="lg:flex hidden ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/meals">Meals</NavLink>
            </li>
            <li>
              <NavLink to="/upcoming">Upcoming Meals</NavLink>
            </li>
            {/* notification */}
            <li>
              <Link className=" ">
                <div className="indicator">
                  <IoNotifications className="text-xl" />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </Link>
            </li>
          </div>

          {!user && (
            <li>
              <NavLink to="/login">Join Us</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={`dashboard/${isAdmin ? "myAdminProfile" : "userProfile"}`}
                  className="justify-between"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
