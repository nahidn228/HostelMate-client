import { useContext } from "react";
import { Link } from "react-router-dom";

import { FaHome, FaUser } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import HostelMateIcon from "./HostelMateIcon";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar max-w-screen-xl  shadow-sm  mx-auto fixed z-10 bg-white/40  backdrop-blur-xl">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
        
          <HostelMateIcon />
          <span className="font-bold">HostelMate</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">All Jobs</Link>
          </li>

          {!user && (
            <li>
              <Link to="/login">Login</Link>
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
                <Link to="/add-job" className="justify-between">
                  Add Job
                </Link>
              </li>
              <li>
                <Link to="/my-posted-jobs">My Posted Jobs</Link>
              </li>
              <li>
                <Link to="/my-bids">My Bids</Link>
              </li>
              <li>
                <Link to="/bid-requests">Bid Requests</Link>
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
