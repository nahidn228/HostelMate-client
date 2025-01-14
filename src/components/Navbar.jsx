import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { AuthContext } from "../providers/AuthProvider";
import HostelMateIcon from "./HostelMateIcon";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar max-w-screen-xl  shadow-sm  mx-auto fixed z-10 bg-white/60  backdrop-blur-xl font-semibold">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <HostelMateIcon />
          <span className="font-bold text-black text-xl">HostelMate</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Meals</Link>
          </li>
          <li>
            <Link to="/jobs">Upcoming Meals</Link>
          </li>
          {/* notification */}
          <li>
            <Link className=" ">
              <div className="indicator">
               <IoNotifications className='text-xl' />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </Link>
          </li>

          {!user && (
            <li>
              <Link to="/login">Join Us</Link>
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
                <Link to="/dashboard" className="justify-between">
                  Dashboard
                </Link>
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
