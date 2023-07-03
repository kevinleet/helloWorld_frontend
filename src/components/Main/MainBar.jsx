import AddFriend from "./AddFriend";
import ChatWindow from "./ChatWindow";
import Profile from "./Profile"
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from 'react-router-dom'

const MainBar = ({ defaultActivePage, activePage }) => {

  console.log(defaultActivePage)

  return (
    <div className="w-full">
      <ChakraProvider>
        <ChatWindow />
        {/* {activePage === 'chat' ? <ChatWindow /> : null}
        {activePage === 'addfriend' ? <AddFriend /> : null}
        {activePage === 'profile' ? <Profile /> : null} */}
      </ChakraProvider>
    </div>
  );
};

export default MainBar;
