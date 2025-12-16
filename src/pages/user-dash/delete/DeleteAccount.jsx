import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log("Account Deleted");
    setOpen(false);
  };

  return (
    <>
      
      <div className="bg-white border border-gray-300 rounded p-8 ">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Delete Account
        </h2>

        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          This action is permanent and cannot be undone.
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Once you delete your account, all your data will be permanently removed.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Delete My Account
        </button>
      </div>

      
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="text-red-600 font-semibold">
          Confirm Account Deletion
        </DialogTitle>

        <DialogContent>
          <p className="text-sm text-gray-600 mt-2">
            Are you absolutely sure you want to delete your account?
            This action cannot be undone.
          </p>
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
