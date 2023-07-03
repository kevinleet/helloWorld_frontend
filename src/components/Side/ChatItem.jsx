const ChatItem = (props) => {
  console.log("props", props);
  return (
    <ul className="text-white border mt-3" id={props.users} key={props.users}>
      <h3>
        {props.users.map((user) => (
          <p>{user.displayname}</p>
        ))}
      </h3>
      <br />
      <h5>{props.latestMessage.content}</h5>
    </ul>
  );
};

export default ChatItem;
