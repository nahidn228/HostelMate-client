import { FaHome, FaList, FaUsers } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import {
  MdEmail,
  MdFastfood,
  MdOutlineRestaurantMenu,
  MdRateReview,
  MdRestaurant,
  MdUpcoming,
} from "react-icons/md";
import { RiHome7Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <RiHome7Fill />
                  My Profile (Admin)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-meal">
                  <MdRestaurant /> Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMeals">
                  <GiHotMeal /> All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allReviews">
                  <MdRateReview /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serveMeals">
                  <MdFastfood /> Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingMeals">
                  <MdUpcoming /> Upcoming Meals
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <RiHome7Fill />
                  My Profile (user)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mealRequest">
                  <FaCartPlus /> Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReviews">
                  <MdRateReview /> My Reviews
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Shared NavLinks */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/meals">
              <MdOutlineRestaurantMenu /> Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdEmail /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
