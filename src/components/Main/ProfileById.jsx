import DeleteAccountModal from "../Modals/DeleteAccountModal";
import UpdateDisplayNameModal from "../Modals/UpdateDisplayNameModal";
import { UserContext, BASE_URL } from "../../App";
import { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileById = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDisplayNameModalOpen, setIsDisplayNameModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async ({ currentUser }) => {
    let userDeleted = currentUser.displayname;
    let userEmail = currentUser.email;

    try {
      const deleteUser = await axios.delete(
        `${BASE_URL}/api/users/delete/${userEmail}`
      );
      alert(`${userDeleted}'s account has been deleted.`);
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDisplayNameModal = () => {
    setIsDisplayNameModalOpen(true);
  };

  const handleCloseDisplayNameModal = () => {
    setIsDisplayNameModalOpen(false);
  };

  const handleUpdate = async (newDisplayName) => {
    let userToUpdate = currentUser.email;
    console.log(newDisplayName);

    try {
      const updateDisplayName = await axios.put(
        `${BASE_URL}/api/users/update/${userToUpdate}`,
        {
          newDisplayName: newDisplayName,
        }
      );
      setCurrentUser((prevUser) => ({
        ...prevUser,
        displayname: newDisplayName,
      }));
      handleCloseDisplayNameModal();
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-white text-4xl">My Profile</h1>
      <div className="flex justify-center items-center mt-12 p-12 h-40 w-40 bg-blue-500 rounded-full">
        <h1 className="text-7xl">
          {currentUser?.displayname.charAt(0).toUpperCase()}
        </h1>
      </div>
      <div className="grid grid-cols-2 items-center mt-12 text-2xl gap-x-8 gap-y-4">
        <h3 className="text-right">Display Name:</h3>
        <p className="flex items-center">
          {currentUser?.displayname}
          <span
            className="text-sm ml-8 px-3 py-0.25 rounded-xl shadow-sm ring-1 ring-inset ring-gray-500 hover:cursor-pointer hover:ring-blue-500"
            onClick={handleOpenDisplayNameModal}
          >
            Update
          </span>
        </p>
        <h3 className="text-right">Email:</h3>
        <p>{currentUser?.email}</p>
        <h3 className="text-right">Created:</h3>
        <p>
          {moment(currentUser?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>
      <button
        className="bg-red-700 py-2 px-6 rounded-lg mt-20 hover:bg-red-900"
        onClick={handleOpenDeleteModal}
      >
        Delete Account
      </button>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCloseDeleteModal}
        onConfirm={() => handleDelete({ currentUser })}
      />
      <UpdateDisplayNameModal
        isOpen={isDisplayNameModalOpen}
        onCancel={handleCloseDisplayNameModal}
        onConfirm={handleUpdate}
      />
    </div>
  );
};

export default ProfileById;
