import DeleteAccountModal from "../Modals/DeleteAccountModal";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import moment from 'moment'
import axios from 'axios'
import { BASE_URL } from "../../globals";
import { useNavigate } from 'react-router-dom'


const Profile = () => {

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = async ({ currentUser }) => {
    let userDeleted = currentUser.displayname
    let userEmail = currentUser.email

    try {
      const deleteUser = await axios.delete(`${BASE_URL}/users/delete/${userEmail}`)
      alert(`${userDeleted}'s account has been deleted.`)
      setIsLoggedIn(false)
      setCurrentUser(null)
      navigate('/login')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-white text-4xl">My Profile</h1>
      <div className="flex justify-center items-center mt-12 p-12 h-40 w-40 bg-blue-500 rounded-full">
        <h1 className="text-7xl">{currentUser.displayname.charAt(0).toUpperCase()}</h1>
      </div>
      <div className="grid grid-cols-2 mt-12 text-2xl gap-x-8 gap-y-4">
        <h3 className="text-right">Display Name:</h3>
        <p>{currentUser.displayname}</p>
        <h3 className="text-right">Email:</h3>
        <p>{currentUser.email}</p>
        <h3 className="text-right">Created:</h3>
        <p>{moment(currentUser.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
        <button className="bg-red-700 py-2 px-6 rounded-lg mt-20 hover:bg-red-900" onClick={handleOpenModal}>Delete Account</button>
        <DeleteAccountModal isOpen={isModalOpen} onCancel={handleCloseModal} onConfirm={() => handleDelete({ currentUser })} />
    </div>
  )
}

export default Profile;
