import { useState } from 'react'

const UpdateEmailModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    const [newEmail, setNewEmail] = useState('')
    const [error, setError] = useState('')
  
    const handleInputChange = (event) => {
        setNewEmail(event.target.value)
        setError('')
    }

    const handleConfirm = () => {
      if(newEmail === '') {
        setError('You must input a new email.')
      } else if (!newEmail.includes("@")) {
        setError('You must input a valid email.')
      } else{
        onConfirm(newEmail)
        setNewEmail('')
        setError('')
      }
    }


    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-slate-500 p-8 rounded-md">
          <h3 className="text-xl text-black font-semibold mb-4">Please input a new email:</h3>
          <input 
            type="text" 
            placeholder="New Email..." 
            value={newEmail}
            onChange={handleInputChange}
            className="w-full rounded-md mb-4 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-700 text-white"
          />
          {error && <p className="text-black text-sm mb-4">{error}</p>}

          <div className="flex justify-end">
            <button className="px-4 py-2 mr-4 text-white bg-red-600 rounded-lg hover:bg-red-400" onClick={onCancel}>
              Cancel
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-400" onClick={handleConfirm}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpdateEmailModal;