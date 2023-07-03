const FriendCard = (props) => {
    return (
        <ul className="friends-list" id={props.first} key={props.first}>
            {/* <img src={props.icon}/> */}
            {/* we shouldnt use a unique image for each user because it could get messy, so we need to make a default image to go here */}
            <h3>{props.displayName}</h3>
        </ul>
    )
}

export default FriendCard