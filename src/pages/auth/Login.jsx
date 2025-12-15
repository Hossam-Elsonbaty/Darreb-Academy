import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import React from "react";
import { useForm } from "react-hook-form";
import loginimg from "../../assets/images/login.png";
import titleLine from "../../assets/images/shape11.png";
import { useLanguage } from "../../hooks/useLanguage";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  const { lang } = useLanguage();

  return (
    <div>
      <DynamicHero
        links={{
          en: ["Home", "Login"],

          ar: ["الرئيسية", " تسجيل الدخول"],
        }}
        authorImg={authorImg}
      />
      <div className="w-full min-h-screen bg-white py-20 px-6 flex justify-center items-center">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl items-center relative">
          <div className="relative flex justify-center items-center">
            <img
              src={loginimg}
              alt="login"
              className="max-w-xs md:max-w-sm relative z-10"
            />
          </div>

          <div className="w-full max-w-md mx-auto">

            {lang === "en" ? (
              <h2
                className="
                  text-[30px] font-medium 
                  mb-0 leading-[1.4] pb-2.5
                  capitalize relative
                  -translate-y-4 inline-block
                "
              >
                Login{" "}
                <span className="text-[#309255] relative inline-block">
                  Now
                  <img
                    src={titleLine}
                    alt="underline"
                    className="
                      absolute 
                      left-1/2 -translate-x-1/2
                      -bottom-2
                      w-[120px]
                    "
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
                    alt="underline"
                    className="
                      absolute 
                      left-1/2 -translate-x-1/2
                      -bottom-2
                      w-[120px]
                    "
                  />
                </span>
              </h2>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
                )}
              </div>

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

              <button
                type="submit"
                className="
                  w-full bg-[#309255] text-white py-3 rounded-lg 
                  text-lg font-medium hover:bg-[#2a7f49] 
                  transition-all duration-300 cursor-pointer
                "
              >
                Login
              </button>

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
                Login with Google
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
