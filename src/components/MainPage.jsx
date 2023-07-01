import NavBar from "./Nav/NavBar";
import SideBar from "./Side/SideBar";
import MainBar from "./Main/MainBar";

const MainPage = () => {
  return (
    <div className="flex flex-auto min-w-[1200px] min-h-[700px] border border-slate-900 rounded-lg bg-slate-900">
      {/* <div className="flex justify-between items-center border border-red-500 w-2/12"> */}
        <NavBar />
      {/* </div> */}

      <div className="flex justify-center items-center border border-green-500 w-4/12">
        <SideBar />
      </div>

      <div className="flex justify-center items-center border border-blue-500 w-6/12">
        <MainBar />
      </div>
    </div>
  );
};

export default MainPage;
