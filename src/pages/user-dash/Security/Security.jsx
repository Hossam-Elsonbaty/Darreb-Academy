import { useForm } from "react-hook-form";

export default function Security() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const inputClass = `
    w-full px-4 py-2
    text-[15px] text-[#52565b]
    border border-[rgba(48,146,85,0.2)]
    rounded-[10px] bg-white
    transition-all duration-300
    focus:border-main focus:outline-none
  `;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white border border-[rgba(48,146,85,0.2)] rounded p-8 ">
      <h2 className="text-2xl font-semibold mb-1 text-center">Account</h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Edit your account settings and change your password here.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Email:</h4>

          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <hr />

        {/* Password */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Password:</h4>
          <input
            type="password"
            placeholder="Password"
            className={inputClass}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Re Password:</h4>
          <input
            type="password"
            placeholder="Confirm Password"
            className={inputClass}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <hr />

        {/* Save */}
        <button
          type="submit"
          className="bg-main text-white px-6 py-2 rounded-[10px] hover:bg-main/90 transition"
        >
          change password
        </button>
      </form>
    </div>
  );
}
