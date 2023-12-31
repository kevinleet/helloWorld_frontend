import { Configuration, OpenAIApi } from "openai";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

// const config = new Configuration({
//   apiKey: "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",
// });

// const openai = new OpenAIApi(config);

// const runPrompt = async () => {
//   const prompt = "explain what useEffect() does";

//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: prompt,
//     max_tokens: 2048,
//     temperature: 1,
//   });

//   console.log(response.data);
// };

// runPrompt();

const ChatGPT = (props) => {
  const { latestMessage, handleClick, isSelected, receiver, chatid } = props;
  const {
    currentUser,
    setCurrentUser,
    currentChat,
    setCurrentChat,
    chatGPT_id,
    setChatGPT_id,
  } = useContext(UserContext);

  return (
    <div
      onClick={() => {
        handleClick(chatid);
      }}
      className={`${
        isSelected ? "bg-white bg-opacity-10" : '"text-white"'
      } border border-indigo-600 mt-3 rounded-lg  hover:bg-white hover:bg-opacity-10 transform hover:scale-120 hover:rounded-lg transition-all duration-300`}
      id="chatgpt"
    >
      {/* <h3 className="p-2 text-2xl text-left text-base font-bold overflow-ellipsis overflow-hidden whitespace-nowrap tracking-wide"> */}
      <span className="p-2 text-2xl text-left text-base font-bold overflow-ellipsis overflow-hidden whitespace-nowrap tracking-wide">
        helloWorld.ai
      </span>
      <span className="ml-auto float-right p-1 text-xs">
        {/* {getTimeAgo(latestMessage?.updatedAt)} */}
      </span>

      {/* <p className="text-sm p-2">{getTimeAgo(latestMessage.updatedAt)}</p> */}

      {latestMessage ? (
        <>
          <h5 className="text-md p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide">
            {latestMessage.sender.displayname}: {latestMessage.content}
          </h5>
        </>
      ) : (
        <h5 className="text-md p-2 overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide text-center">
          Your Personal AI Assistant
        </h5>
      )}
    </div>
  );
};

export default ChatGPT;
