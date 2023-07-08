import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../App";
import { useParams } from "react-router-dom";

const ProfileById = () => {
  const { id } = useParams();

  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/get/${id}`);
        setSelectedUser({ ...response.data });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-4 lg:mt-12 pb-10 lg:pb-0">
      <h1 className="text-white text-lg lg:text-4xl">
        {selectedUser.displayname}'s Profile
      </h1>
      <div className="flex justify-center items-center mt-2 lg:mt-12 h-10 p-8 w-10 lg:h-40 lg:w-40 bg-blue-500 rounded-full">
        <h1 className="text-4xl lg:text-7xl">
          {selectedUser?.displayname.charAt(0).toUpperCase()}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-4 lg:mt-12 text-sm lg:text-2xl gap-x-8 gap-y-1 lg:gap-y-4">
        <h3 className="font-bold lg:font-normal lg:text-right">
          Display Name:
        </h3>
        <p className="flex items-center">{selectedUser?.displayname}</p>
        <h3 className="font-bold lg:font-normal lg:text-right">Email:</h3>
        <p>{selectedUser?.email}</p>
        <h3 className="font-bold lg:font-normal lg:text-right">Created:</h3>
        <p>
          {moment(selectedUser?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>
    </div>
  );
};

export default ProfileById;
