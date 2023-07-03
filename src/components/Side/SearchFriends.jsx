import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "./FriendCard"

const SearchFriends = () => {

    // const [ friends, setFriends ] = useContext(UserContext)
    // const { user, setUser } = useContext(UserContext)




    return (
        <div>
            <div className="search-bar">
                <form>
                    <input type="text" id='search' placeholder='Search Friends'/>
                    <button type='submit' className='submit-button'>Search</button>
                </form>
            </div>

            {/* { search ? <div className="search-result"> 

            </div> : null } */}

            {/* <ul className="friends-list">
                {props.friend.results.map((friend) => (
                   <FriendCard key={friend.id} icon={friend.icon} displayName={friend.displayName}/> 
                ))}
            </ul> */}
        </div>
    )
}

export default SearchFriends