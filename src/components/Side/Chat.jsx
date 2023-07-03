const chat = (props) => {
    console.log(props)
    const lastMessage = messages[messages.length - 1]
    return (
      <ul className="chat" id={props.users} key={props.users}>
        <h3>{props.users}</h3>
        <h5>{props.messages[lastMessage]}</h5>
      </ul>
    )
    }

  export default chat