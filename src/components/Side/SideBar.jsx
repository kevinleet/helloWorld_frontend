import ChatList from "./ChatList";
import SearchFriends from "./SearchFriends";

const SideBar = () => {
  return (
    <div className="flex flex-col p-5 justify-start items-center w-3/12 rounded-lg bg-slate-800">
      <div className="side-bar overflow-auto w-full">
        <SearchFriends />
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
