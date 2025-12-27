import React from "react";

const ConfirmDeletePopup = ({ show, onConfirm, onCancel }) => {
  if (!show) return null; // Don't render if the modal is not visible

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h3 className="text-lg font-semibold">Are you sure you want to remove this course?</h3>
        <div className="flex justify-between mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
