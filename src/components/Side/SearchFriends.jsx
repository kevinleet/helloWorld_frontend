import { UserContext } from "../../App"
import { useNavigate, useEffect, useState } from "react"
import FriendCard from "./FriendCard"

const SearchFriends = ({ formState, handleChange }) => {

    // let navigate = useNavigate()
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        // navigate('')
    }

    return (
        <div>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    {/* <input type="text" id='search' onChange={handleChange} value={formState.search} placeholder='Search Friends'/> */}
                    <button type='submit' className='submit-button'>Search</button>
                </form>
            </div>

            {/* { search ? <div className="search-result"> */}

            {/* </div> : null } */}

            {/* <ul className="friends-list">
                {props.friend.results.map((friend) => (
                   <FriendCard key={friend.id} icon={friend.icon} displayName={friend.displayName}/> 
                ))}
            </ul> */}
        </div>
    )
}

export default SearchFriends