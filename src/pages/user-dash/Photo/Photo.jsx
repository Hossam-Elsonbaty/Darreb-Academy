import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiUploadCloud } from "react-icons/fi";

export default function Photo() {
  const [fileName, setFileName] = useState("No file selected");
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white p-6 rounded border border-[rgba(48,146,85,0.2)] ">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-1">
        Photo
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Add a nice photo of yourself for your profile.
      </p>

      {/* Image preview */}
      <p className="text-sm font-medium mb-2">Image preview</p>

      <div className="w-full h-[250px] border border-[rgba(48,146,85,0.2)] flex items-center justify-center mb-6">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <FaRegCircleUser className="text-[150px] text-gray-400" />
        )}
      </div>

      {/* Upload */}
      <p className="text-sm font-medium mb-2">Add / Change Image</p>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={fileName}
          disabled
          className="
            flex-1
            h-[60px] px-6
            text-[15px] text-[#52565b]
            border border-[rgba(48,146,85,0.2)]
            rounded-[10px] bg-gray-100
            focus:outline-none
          "
        />

        <label
          className="
            flex items-center gap-2
            h-[60px] px-5
            bg-main text-white
            rounded-[10px]
            cursor-pointer
            transition-all duration-300
            hover:bg-main/90
          "
        >
          <FiUploadCloud size={18} />
          Upload image
          <input
            type="file"
            onChange={handleImage}
            className="hidden"
          />
        </label>
      </div>

      {/* Save */}
      <button
        className="
          bg-main text-white
          px-6 py-2
          rounded-[10px]
          transition-all duration-300
          hover:bg-main/90
        "
      >
        Save
      </button>
    </div>
  );
}
