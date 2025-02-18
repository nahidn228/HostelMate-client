import { Outlet } from "react-router-dom";
import NewFooter from "../components/NewFooter";
import NewNavbar from "../components/NewNavbar";

const Main = () => {
  return (
    <div className="">
      {/* Navbar */}
      <NewNavbar />
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
