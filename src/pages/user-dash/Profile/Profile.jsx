import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import ToasterContext from "../../../context/ToasterContext";
import { useLanguage } from "../../../hooks/useLanguage";

export default function Profile() {
  const { register, handleSubmit, watch,setValue  } = useForm();
  const headlineValue = watch("headline", "");
  const [userData,setUserData] = useState();
  const {setShowModal, setModalType, setModalMessage} = useContext(ToasterContext)
  const data = JSON.parse(localStorage.getItem('userData'));
  const {lang} = useLanguage();
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
      
      <h2 className="text-2xl font-semibold mb-1 text-center">{lang === "en" ? "Public profile" : "الملف الشخصي العام"}</h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        {lang === "en" ? "Add information about yourself" : "أضف معلومات عن نفسك"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basics */}
        <div>
          <h4 className="text-sm font-semibold mb-3 ">{lang === "en" ? "Basics:" : "الأساسيات:"}</h4>

          <div className="space-y-4">
            <input
              type="text"
              placeholder={lang === "en" ? "Full Name" : "الاسم الكامل"}
              className={inputClass}
              {...register("fullName", { required: true })}
            />

            <div className="relative">
              <input
                type="text"
                placeholder={lang === "en" ? "Headline" : "العنوان"}
                maxLength={60}
                className={inputClass}
                {...register("headline")}
              />
            </div>

            <p className="text-xs text-gray-500">
              {lang === "en" ? 'Add a professional headline like, "Instructor at Udemy".' : "أضف عنوانًا احترافيًا مثل، \"مدرب في Udemy\"."}
            </p>
          </div>
        </div>

        {/* Biography */}
        <div>
          <h4 className="text-sm font-semibold mb-2">{lang === "en" ? "Biography" : "السيرة الذاتية"}</h4>

          <div className="border border-[rgba(48,146,85,0.2)] rounded-t px-2 py-1 text-sm text-gray-600">
            <span className="font-bold mr-2">B</span>
            <span className="italic">I</span>
          </div>

          <textarea
            rows="4"
            placeholder={lang === "en" ? "Biography" : "السيرة الذاتية"}
            className={`
              w-full px-3 py-2
              border border-[rgba(48,146,85,0.2)]
              rounded-b
              focus:border-main focus:outline-none
            `}
            {...register("bio")}
          />

          <p className="text-xs text-gray-500 mt-1">
            {lang === "en" ? "Links and coupon codes are not permitted." : "لا يُسمح بإضافة روابط أو رموز خصم."}
          </p>
        </div>
        {/* Save */}
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
