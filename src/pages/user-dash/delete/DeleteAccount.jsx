import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const {lang} = useLanguage()
  const handleDelete = () => {
    console.log("Account Deleted");
    setOpen(false);
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-8">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        {lang === "en" ? "Delete Account" : "حذف الحساب"}
      </h2>

      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
        {lang === "en"
          ? "This action is permanent and cannot be undone."
          : "هذه العملية دائمة ولا يمكن التراجع عنها."}
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {lang === "en"
          ? "Once you delete your account, all your data will be permanently removed."
          : "بمجرد حذف حسابك، سيتم إزالة جميع بياناتك بشكل دائم."}
      </p>

      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        {lang === "en" ? "Delete My Account" : "حذف حسابي"}
      </button>

      {/* You can add a modal or confirmation dialog for delete confirmation here */}
      {open && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-center mb-4">
              {lang === "en" ? "Are you sure?" : "هل أنت متأكد؟"}
            </h3>
            <p className="text-sm text-center mb-4">
              {lang === "en"
                ? "Once you confirm, your account will be permanently deleted."
                : "بمجرد تأكيدك، سيتم حذف حسابك بشكل دائم."}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                {lang === "en" ? "Cancel" : "إلغاء"}
              </button>
              <button
                onClick={() => {/* Handle account deletion logic here */}}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {lang === "en" ? "Confirm" : "تأكيد"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
