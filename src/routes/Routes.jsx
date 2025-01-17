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
import AddMeal from "../pages/dashboard/Admin/AddMeal";
import AdminHome from "../pages/dashboard/Admin/AdminHome";
import AllMeal from "../pages/dashboard/Admin/AllMeal";
import AllReviews from "../pages/dashboard/Admin/AllReviews";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import ServeMeal from "../pages/dashboard/Admin/ServeMeal";
import UpcomingMealAdmin from "../pages/dashboard/Admin/UpcomingMealAdmin";
import MyReviews from "../pages/dashboard/Users/MyReviews";
import PaymentHistory from "../pages/dashboard/Users/PaymentHistory";
import RequestedMeal from "../pages/dashboard/Users/RequestedMeal";
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
        path: "/upcoming",
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
      {
        path: "myAdminProfile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allMeals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allReviews",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllReviews />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "serveMeals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ServeMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upcomingMeals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpcomingMealAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      //User Route
      {
        path: "userProfile",
        element: <UserHome />,
      },
      {
        path: "mealRequest",
        element: <RequestedMeal />,
      },
      {
        path: "myReviews",
        element: <MyReviews />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
]);

export default router;
