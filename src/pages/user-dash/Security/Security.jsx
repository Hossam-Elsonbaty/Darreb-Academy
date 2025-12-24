import { useForm } from "react-hook-form";
import {useState, useEffect, useContext} from "react";
import ToasterContext from "../../../context/ToasterContext";
import api from "../../../api/axios";
import axios from "axios";
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

  return (
    <div className="bg-white border border-[rgba(48,146,85,0.2)] rounded p-8 ">
      <h2 className="text-2xl font-semibold mb-1 text-center">Account</h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Edit your account settings and change your password here.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-b border-[#ddd] pb-5">
          <h4 className="text-sm font-semibold mb-3">Email:</h4>
          <input
            type="email"
            placeholder="Email"
            disabled
            className={inputClass}
            {...register("email")}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Old Password:</h4>
          <input
            type="password"
            placeholder="Old password"
            className={inputClass}
            {...register("oldPassword", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">New Password:</h4>
          <input
            type="password"
            placeholder="newPassword"
            className={inputClass}
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
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
          <h4 className="text-sm font-semibold mb-3">Confirm Password:</h4>
          <input
            type="password"
            placeholder="Confirm Password"
            className={inputClass}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
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
          change password
        </button>
      </form>
    </div>
  );
}
