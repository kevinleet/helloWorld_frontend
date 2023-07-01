const FriendCard = (props) => {
    return (
        <ul className="friends-list" id={props.first} key={props.first}>
            <img src={props.icon}/>
            <h3>{props.displayName}</h3>
        </ul>
    )
}

export default FriendCard