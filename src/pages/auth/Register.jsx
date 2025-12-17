
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import React from 'react'
import { useForm } from "react-hook-form"
import { useLanguage } from "../../hooks/useLanguage";
import loginimg from "../../assets/images/login.png";
import titleLine from "../../assets/images/shape11.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register (){
  // const onSubmit = (data) => console.log(data)
  const onSubmit = async (data) => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  if (data.password !== data.confirmPassword) {
    alert("Password and Confirm Password must be the same");
    return;
  }

  try {
    // 2️⃣ نبعت request للـ register
    const response = await axios.post(
      "https://darreb-academy-backend.vercel.app/api/auth/register",
      {
        fullName: data.name,   
        email: data.email,
        password: data.password,
      }
    );

    // 3️⃣ لو الباك رجع 201
    if (response.status === 201) {
      navigate("/signin");
    }

  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message || "Something went wrong, try again"
    );
  }
};

  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div >
      <DynamicHero
        links={{
          en: ["Home", "Register"],

          ar: ["الرئيسية", "انشاء حساب"],
        }}
        authorImg={authorImg}
      />
    <div className="w-full min-h-screen bg-white py-20 px-6 flex justify-center items-center">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl items-center relative">

        {/* IMAGE SIDE */}
        <div className="relative flex justify-center items-center">
          <img
            src={loginimg}
            alt="Register"
            className="max-w-xs md:max-w-sm relative z-10"
          />
        </div>

        {/* FORM SIDE */}
        <div className="w-full max-w-md mx-auto">

          {/* TITLE */}
          {lang === "en" ? (
            <h2
              className="
                text-[30px] font-medium 
                mb-0 leading-[1.4] pb-2.5
                capitalize relative
                -translate-y-4 inline-block
              "
            >
              Registration{" "}
              <span className="text-[#309255] relative inline-block">
                Now
                <img
                  src={titleLine}
                  className="
                    absolute 
                    left-1/2 -translate-x-1/2 
                    -bottom-2
                    w-[120px] 
                  "
                  alt="underline"
                />
              </span>
            </h2>
          ) : (
            <h2
              className="
                text-[30px] font-medium 
                mb-0 leading-[1.4] pb-2.5
                capitalize relative
                -translate-y-4 inline-block
              "
            >
              سجل{" "}
              <span className="text-[#309255] relative inline-block">
                الان
                <img
                  src={titleLine}
                  className="
                    absolute 
                    left-1/2 -translate-x-1/2 
                    -bottom-2
                    w-[120px]
                  "
                  alt="underline"
                />
              </span>
            </h2>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      
            <div>
              <input
                type="text"
                placeholder="Name"
                className="
                  w-full h-[60px] px-6 
                  text-[15px] text-[#52565b] 
                  border border-[rgba(48,146,85,0.2)] 
                  rounded-[10px] bg-white 
                  transition-all duration-300 
                  focus:border-main focus:outline-none
                "
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

      
            <div>
              <input
                type="email"
                placeholder="Email"
                className="
                  w-full h-[60px] px-6 
                  text-[15px] text-[#52565b] 
                  border border-[rgba(48,146,85,0.2)] 
                  rounded-[10px] bg-white 
                  transition-all duration-300 
                  focus:border-main focus:outline-none
                "
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="
                  w-full h-[60px] px-6 
                  text-[15px] text-[#52565b] 
                  border border-[rgba(48,146,85,0.2)] 
                  rounded-[10px] bg-white 
                  transition-all duration-300 
                  focus:border-main focus:outline-none
                "
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="
                  w-full h-[60px] px-6 
                  text-[15px] text-[#52565b] 
                  border border-[rgba(48,146,85,0.2)] 
                  rounded-[10px] bg-white 
                  transition-all duration-300 
                  focus:border-main focus:outline-none
                "
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                   validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={password && confirmPassword && password !== confirmPassword}
              className="
                w-full bg-[#309255] text-white py-3 rounded-lg 
                text-lg font-medium hover:bg-[#2a7f49] 
                transition-all duration-300 cursor-pointer
              "
            >
              Create an account
            </button>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="
                w-full 
                bg-[#e7f8ee] 
                text-[#309255] 
                border border-[rgba(48,146,85,0.2)]
                py-3 
                rounded-lg 
                text-lg font-medium
                hover:bg-[#309255] hover:text-white 
                transition-all duration-300 cursor-pointer
              "
            >
              Sign up with Google
            </button>

          </form>
        </div>
      </div>
    </div>    </div>
  );
};

