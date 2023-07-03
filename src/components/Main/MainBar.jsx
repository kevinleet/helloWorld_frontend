import AddFriend from "./AddFriend";
import ChatWindow from "./ChatWindow";
import { ChakraProvider } from "@chakra-ui/react";

const MainBar = () => {
  return (
    <div className="w-full">
      {/* <AddFriend /> */}
      <ChakraProvider>
        <ChatWindow />
      </ChakraProvider>
    </div>
  );
};

export default MainBar;
