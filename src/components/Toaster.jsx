import { useContext } from "react";
import ToasterContext from "../context/ToasterContext";

const Toaster = () => {
  const { showModal, setShowModal, modalType, modalMessage } = useContext(ToasterContext);
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 min-w-full">
      <div className="bg-white p-6 rounded-lg w-96 text-center">
        <h2
          className={`text-xl font-bold mb-3 ${
            modalType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {modalType === "success" ? "Success" : "Error"}
        </h2>
        <p className="mb-4">{modalMessage}</p>
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-main text-white rounded bg-green-500"
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default Toaster;