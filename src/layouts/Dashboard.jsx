import { BsCart2 } from "react-icons/bs";
import { GiOpenedFoodCan } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { IoHomeOutline, IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { TbBowlSpoon, TbUsers } from "react-icons/tb";
import { TfiEmail, TfiWrite } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import DashboardNavbar from "../pages/dashboard/DashboardNavbar";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-72 min-h-screen bg-[#142943] text-white">
        <div className="flex gap-2 items-center justify-center p-2 mt-4">
          {/* <HostelMateIcon /> */}
          <img
            src="https://img.icons8.com/?size=100&id=zpM2C9OxTBQZ&format=png&color=000000"
            alt="HostelMateIcon"
            className="w-14"
          />
          <span className="font-bold text-white text-lg md:text-xl">
            HostelMate
          </span>
        </div>
        <div className="divider divider-neutral"></div>
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/overview">
                  <IoHomeOutline />
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAdminProfile">
                  <IoHomeOutline />
                  My Profile (Admin)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <TbUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-meal">
                  <IoRestaurantOutline /> Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMeals">
                  <MdOutlineFastfood /> All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allReviews">
                  <TfiWrite /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/serveMeals">
                  <TbBowlSpoon /> Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingMeals">
                  <GiOpenedFoodCan /> Upcoming Meals
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile">
                  <IoHomeOutline />
                  My Profile (user)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mealRequest">
                  <BsCart2 /> Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReviews">
                  <TfiWrite /> My Reviews
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <GrHistory /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Shared NavLink */}
          <div className="divider divider-neutral"></div>
          <li>
            <NavLink to="/">
              <IoHomeOutline /> Home Page
            </NavLink>
          </li>
          <li>
            <NavLink to="/meals">
              <IoRestaurantOutline /> All Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <TfiEmail /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 ">
        <DashboardNavbar />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
