import NavBar from "./Nav/NavBar";
import SideBar from "./Side/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-auto w-[1200px] h-[700px] bg-slate-900">
      <NavBar />
      <SideBar />

      <div className="flex justify-center w-8/12 bg-slate-900 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
