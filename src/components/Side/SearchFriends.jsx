import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "./FriendCard";
import { BASE_URL } from "../../globals";

const SearchFriends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      const getAllFriends = async () => {
        try {
          let response = await axios.get(
            `${BASE_URL}/users/get/friends/${currentUser._id}`
          );
          setFriends(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllFriends();
    }
  }, []);

  return (
    <div>
      <div className="search-bar">
        <form>
          <input type="text" id="search" placeholder="Search Friends" />
          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
      </div>

      {/* { search ? <div className="search-result"> 

            </div> : null } */}

      <div className="friends-list w-full">
        <ul>
          {friends?.map((friend) => (
            <FriendCard
              key={friend.friendsList}
              friendsList={friend.friendList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchFriends;
