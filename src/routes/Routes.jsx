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
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import UserHome from "../pages/dashboard/Users/UserHome";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //Admin Route

      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      //User Route
      {
        path: "userHome",
        element: <UserHome />,
      },
    ],
  },
]);

export default router;
