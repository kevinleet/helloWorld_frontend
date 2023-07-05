import { useState, useEffect } from "react";
import moment from 'moment'
import axios from 'axios'
import { BASE_URL } from "../../globals";
import { useParams } from 'react-router-dom'


const ProfileById = () => {

  const { id } = useParams()

  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    const getUser = async() => {
      const response = await axios.get(`${BASE_URL}/users/get/${id}`)
      setSelectedUser({ ...response.data })
    }
    getUser()
  }, [])

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-white text-4xl">{selectedUser.displayname}'s Profile</h1>
      <div className="flex justify-center items-center mt-12 p-12 h-40 w-40 bg-blue-500 rounded-full">
        <h1 className="text-7xl">{selectedUser?.displayname}</h1>
      </div>
      <div className="grid grid-cols-2 items-center mt-12 text-2xl gap-x-8 gap-y-4">
        <h3 className="text-right">Display Name:</h3>
        <p className="flex items-center">{selectedUser?.displayname}</p>
        <h3 className="text-right">Email:</h3>
        <p>{selectedUser?.email}</p>
        <h3 className="text-right">Created:</h3>
        <p>{moment(selectedUser?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
    </div>
  )
}

export default ProfileById;