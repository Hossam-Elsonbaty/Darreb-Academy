// import { FaRegCircleUser } from "react-icons/fa6";
// import { FiUploadCloud } from "react-icons/fi";
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../../api/axios";
// import ToasterContext from "../../../context/ToasterContext";

// export default function Photo() {
//   const { register, handleSubmit, watch} = useForm();
//   const [preview, setPreview] = useState(null);
//   const userData = JSON.parse(localStorage.getItem("userData")) 
//   const user_id = userData?._id;
//   const file = watch("profilePic")
//   const handleImage = (e) => {
//     setPreview(URL.createObjectURL(file));
//   };
//   const onSubmit = (data)=> {
//     console.log(user_id);
//     console.log(data);
//     // try{
//     //   const response = api.put(`/users/profile-pic/${user_id}`)
//     //   console.log(response.data);
//     // }
//     // catch(err){
//     //   console.log(err);
//     // }
//   }
//   return (
//     <div className="bg-white p-6 rounded border border-[rgba(48,146,85,0.2)] ">
//       <h2 className="text-xl font-semibold text-center mb-1">
//         Photo
//       </h2>
//       <p className="text-sm text-gray-500 text-center mb-6">
//         Add a nice photo of yourself for your profile.
//       </p>
//       <p className="text-sm font-medium mb-2">Image preview</p>
//       <div className="w-full h-[250px] border border-[rgba(48,146,85,0.2)] flex items-center justify-center mb-6">
//         <img
//           src={file? URL.createObjectURL(file) : userData.profilePic}
//           alt="preview"
//           className="w-full h-full object-contain"
//         />
//       </div>
//       <p className="text-sm font-medium mb-2">Add / Change Image</p>
//       <form className="flex gap-3 mb-6 flex-col" onSubmit={handleSubmit(onSubmit)}>
//         <span
//           className="
//             flex items-center gap-2
//             h-[60px] px-5
//             bg-[#ddd] text-white
//             rounded-[10px]
//             cursor-pointer
//             transition-all duration-300
//             hover:bg-main/90 w-full
//           "
//         >
//           <input
//             className="text-black w-full"
//             type="file"
//             {...register("profilePic", { required: true })}
//           />
//         </span>
//         <button
//           className="
//             bg-[#309255] text-white
//             px-6 py-2
//             rounded-[10px]
//             transition-all duration-300
//             hover:bg-main/90 w-fit
//           "
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }
import { useEffect, useState,useContext } from "react";
import { useForm } from "react-hook-form";
import ToasterContext from "../../../context/ToasterContext";
import axios from "axios";
import { useLanguage } from "../../../hooks/useLanguage";

export default function Photo() {
  const { register, handleSubmit } = useForm();
  const {lang} = useLanguage()
  const token = localStorage.getItem("token");
  const {setShowModal, setModalType, setModalMessage} = useContext(ToasterContext)
  const [preview, setPreview] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const user_id = userData?._id;
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("profilePic", data.profilePic[0]);
    try {
      const response = await axios.put(`https://darreb-academy-backend.vercel.app/api/users/update-pic/${user_id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        },
      });
      console.log(response.data);
      setModalType("success");
      setModalMessage("User Updated Successfully");
      setShowModal(true);
      localStorage.setItem("userData",JSON.stringify(response.data.data))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white p-6 rounded border border-[rgba(48,146,85,0.2)] ">
      <h2 className="text-xl font-semibold text-center mb-1">{lang === "en" ? "Photo" : "الصورة"}</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        {lang === "en"
      ? "Add a nice photo of yourself for your profile."
      : "أضف صورة جميلة لنفسك لملفك الشخصي."}
      </p>
      <p className="text-sm font-medium mb-2">{lang === "en" ? "Image preview" : "معاينة الصورة"}</p>
      <div className="w-full h-[250px] border border-[rgba(48,146,85,0.2)] flex items-center justify-center mb-6">
        <img
          src={preview ? preview : userData.profilePic} 
          alt="preview"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-sm font-medium mb-2">{lang === "en" ? "Add / Change Image" : "إضافة / تغيير الصورة"}</p>
      <form className="flex gap-3 mb-6 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <span
          className="
            flex items-center gap-2
            h-[60px] px-5
            bg-[#ddd] text-white
            rounded-[10px]
            cursor-pointer
            transition-all duration-300
            hover:bg-main/90 w-full
          "
        >
          <input
            className="text-black w-full"
            type="file"
            {...register("profilePic", { required: true })}
            onChange={handleImage}
          />
        </span>
        <button
          type="submit"
          className="bg-[#309255] text-white px-6 py-2 rounded-[10px] hover:bg-main/90 transition"
        >
          {lang === "en" ? "Save" : "حفظ"}
        </button>
      </form>
    </div>
  );
}
