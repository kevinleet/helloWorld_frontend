const ChatItem = (props) => {
  console.log(props);
  const lastMessage = props.messages[props.messages.length - 1];
  return (
    <ul className="text-white border mt-3" id={props.users} key={props.users}>
      <h3>
        {props.users.map((user) => (
          <p>{user.displayname}</p>
        ))}
      </h3>
      <br />
      <h5>{lastMessage}</h5>
    </ul>
  );
};

export default ChatItem;
