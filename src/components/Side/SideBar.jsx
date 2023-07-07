import ChatList from "./ChatList";
import Friends from "./Friends";

const SideBar = () => {
  return (
    <div className="flex flex-row lg:flex-col pb-0 p-3 lg:p-5 justify-start items-center lg:w-3/12 rounded-lg bg-slate-500 dark:bg-slate-800">
      <div className="side-bar overflow-auto w-full">
        <Friends />
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
