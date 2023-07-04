const DeleteAccountModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-slate-500 p-8 rounded-md">
          <h3 className="text-xl text-black font-semibold mb-4">Are you sure you want to delete your account?</h3>
          <div className="flex justify-end">
            <button className="px-4 py-2 mr-4 text-white bg-red-600 rounded-lg hover:bg-red-400" onClick={onCancel}>
              Cancel
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-400" onClick={onConfirm}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteAccountModal;