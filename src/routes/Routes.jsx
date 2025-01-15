import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import AllMeals from "../pages/AllMeals";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MealDetails from "../pages/MealDetails";
import UpcomingMeals from "../pages/UpcomingMeals";
import ManageUsers from "../pages/dashboard/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/meals",
        element: <AllMeals />,
      },
      {
        path: "/upcomingMeals",
        element: <UpcomingMeals />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/meal/:id",
        element: <MealDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [

      //Admin Route
      
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);

export default router;
