import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="flex flex-col justify-end items-center border border-red-500 w-2/12">
      <div className="h-2/3 flex flex-col justify-between items-center mb-6">
        <div className="flex flex-col justify-center items-center">
          <Link to="/chat" className="mb-4 px-4 py-4 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Chat Window</Link>
          <Link to="/addfriend" className="px-4 py-4 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Friend</Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/login" className="mb-4 px-4 py-4 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log Out</Link>
          <Link to="/profile" className="px-4 py-4 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Profile</Link>
        </div>
      </div>
      
    </div>
  )
};

export default NavBar;
