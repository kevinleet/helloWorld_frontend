const FriendCard = (props) => {
    console.log('props:', props)
    return (
    <div class="flex overflow-x-auto">
        <div class="flex-shrink-0">
            <ul className="friends-list flex whitespace-nowrap" id={props.friendsList} key={props.friendsList}>
                <li className='inline-block mr-4'>
                    <div className='flex items-center'>
                        <h3 className='bg-sky-400 mr-2'>{props.friendsList.content.displayname.charAt(0)}</h3>
                        <p className=''>{props.friendsList.content.displayname}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default FriendCard