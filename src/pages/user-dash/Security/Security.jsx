import { useForm } from "react-hook-form";
import {useState, useEffect, useContext} from "react";
import ToasterContext from "../../../context/ToasterContext";
import api from "../../../api/axios";
import axios from "axios";
import { useLanguage } from "../../../hooks/useLanguage";
export default function Security() {
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [userData,setUserData] = useState();
  const {setShowModal, setModalType, setModalMessage} = useContext(ToasterContext);
  const data = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    setUserData(data);    
    if (data) {
      setValue("email", data.email);
    }
  }, [setValue]);
  const newPassword = watch("newPassword");
  const inputClass = `
    w-full px-4 py-2
    text-[15px] text-[#52565b]
    border border-[rgba(48,146,85,0.2)]
    rounded-[10px] bg-white
    transition-all duration-300
    focus:border-main focus:outline-none
  `;

  const onSubmit = async(data) => {
    console.log(data);
    try{
      const response = await api.put(`/users/change-password/${userData._id}`,{
        oldPassword:data.oldPassword,
        newPassword:data.newPassword,
        confirmPassword:data.confirmPassword
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
  const {lang} = useLanguage()
  return (
    <div className="bg-white border border-[rgba(48,146,85,0.2)] rounded p-8 ">
      <h2 className="text-2xl font-semibold mb-1 text-center">{lang === "en" ? "Account" : "الحساب"}</h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        {lang === "en"
      ? "Edit your account settings and change your password here."
      : "قم بتعديل إعدادات حسابك وتغيير كلمة المرور هنا."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-b border-[#ddd] pb-5">
          <h4 className="text-sm font-semibold mb-3">{lang === "en" ? "Email:" : "البريد الإلكتروني:"}</h4>
          <input
            type="email"
            placeholder={lang === "en" ? "Email:" : "البريد الإلكتروني:"}
            disabled
            className={inputClass}
            {...register("email")}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">{lang === "en" ? "Old Password:" : "كلمة المرور القديمة:"}</h4>
          <input
            type="password"
            placeholder={lang === "en" ? "Old Password:" : "كلمة المرور القديمة:"}
            className={inputClass}
            {...register("oldPassword", {
              required: lang === "en" ? "Password is required" : "كلمة المرور مطلوبة",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">{lang === "en" ? "New Password:" : "كلمة المرور الجديدة:"}</h4>
          <input
            type="password"
            placeholder={lang === "en" ? "New Password:" : "كلمة المرور الجديدة:"}
            className={inputClass}
            {...register("newPassword", {
              required: lang === "en" ? "New Password is required" : "كلمة المرور الجديدة مطلوبة",
              minLength: {
                value: 8,
                message:lang === "en"
              ? "Password must be at least 8 characters"
              : "يجب أن تكون كلمة المرور على الأقل 8 أحرف",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="border-b border-[#ddd] pb-5">
          <h4 className="text-sm font-semibold mb-3">{lang === "en" ? "Confirm Password:" : "تأكيد كلمة المرور:"}</h4>
          <input
            type="password"
            placeholder={lang === "en" ? "Confirm Password:" : "تأكيد كلمة المرور:"}
            className={inputClass}
            {...register("confirmPassword", {
              required: lang === "en" ? "Please confirm your password" : "يرجى تأكيد كلمة المرور",
              validate: (value) =>
                value === newPassword || (lang === "en" ? "Passwords do not match" : "كلمات المرور غير متطابقة"),
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#309255] text-white px-6 py-2 rounded-[10px] hover:bg-main/90 transition"
        >
          {lang === "en" ? "Change password" : "تغيير كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
