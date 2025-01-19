import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewFooter from "../components/NewFooter";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <NewFooter />
    </div>
  );
};

export default Main;
