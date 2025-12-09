import React from "react";
import { useForm } from "react-hook-form";
import loginshape from "../../assets/images/shape-3.png";
import loginimg from "../../assets/images/login.png"

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
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

          <h2 className="relative text-4xl font-semibold mb-6 leading-tight">

            Login Now <span className="text-main relative">

              {/* underline shape */}
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 
                bg-cover bg-center w-[120px] h-3 hidden sm:block"
                style={{ backgroundImage: `url(${loginshape})` }}
              ></span>
            </span>
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 px-4 py-3 w-full rounded focus:ring-2 focus:ring-main"
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

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 px-4 py-3 w-full rounded focus:ring-2 focus:ring-main"
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
              className="w-full bg-main text-white py-3 rounded text-lg font-medium hover:bg-[#267846] transition cursor-pointer"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full border border-main text-main py-3 rounded text-lg font-medium hover:bg-main hover:text-white transition cursor-pointer"
            >
              Login with Google
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
