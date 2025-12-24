import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import ToasterContext from "../../../context/ToasterContext";

export default function Profile() {
  const { register, handleSubmit, watch,setValue  } = useForm();
  const headlineValue = watch("headline", "");
  const [userData,setUserData] = useState();
  const {setShowModal, setModalType, setModalMessage} = useContext(ToasterContext)
  const data = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    setUserData(data);    
    if (data) {
      setValue("fullName", data.fullName);
      setValue("headline", data.headline || "");
      setValue("bio", data.bio || "");
    }
  }, [setValue]);
  const inputClass = `
    w-full px-4 py-2
    text-[15px] text-[#52565b]
    border border-[rgba(48,146,85,0.2)]
    rounded-[10px] bg-white
    transition-all duration-300
    focus:border-main focus:outline-none
  `;

  const onSubmit = async(data) => {
    try{
      const response = await api.put(`/users/${userData._id}`,{
        fullName:data.fullName
      })
      console.log(response.data);
      setUserData(response.data.data);
      setModalType("success");
      setModalMessage("User Updated Successfully");
      setShowModal(true);
      localStorage.setItem("userData",JSON.stringify(response.data.data))
    }
    catch(err){
      console.log(err);
    }
  };
  return (

    <div className="bg-white border border-[rgba(48,146,85,0.2)] rounded p-8 ">
      
      <h2 className="text-2xl font-semibold mb-1 text-center">Public profile</h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Add information about yourself
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basics */}
        <div>
          <h4 className="text-sm font-semibold mb-3 ">Basics:</h4>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className={inputClass}
              {...register("fullName", { required: true })}
            />

            <div className="relative">
              <input
                type="text"
                placeholder="Headline"
                maxLength={60}
                className={inputClass}
                {...register("headline")}
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">
                {headlineValue.length}/60
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Add a professional headline like, "Instructor at Udemy".
            </p>
          </div>
        </div>

        {/* Biography */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Biography</h4>

          <div className="border border-[rgba(48,146,85,0.2)] rounded-t px-2 py-1 text-sm text-gray-600">
            <span className="font-bold mr-2">B</span>
            <span className="italic">I</span>
          </div>

          <textarea
            rows="4"
            placeholder="Biography"
            className={`
              w-full px-3 py-2
              border border-[rgba(48,146,85,0.2)]
              rounded-b
              focus:border-main focus:outline-none
            `}
            {...register("bio")}
          />

          <p className="text-xs text-gray-500 mt-1">
            Links and coupon codes are not permitted.
          </p>
        </div>
        {/* Save */}
        <button
          type="submit"
          className="bg-[#309255] text-white px-6 py-2 rounded-[10px] hover:bg-main/90 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
