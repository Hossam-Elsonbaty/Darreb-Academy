import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../hooks/useLanguage";
import titleLine from "../../assets/images/shape11.png";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import Banner from "../../common/Banner";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("success"); 
const [modalMessage, setModalMessage] = useState("");
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { lang } = useLanguage();
    const onSubmit = (data) => {
    console.log(data);
    axios.post("https://darreb-academy-backend.vercel.app/api/contact-us/create-email",{
      name:data.name,
      email:data.email,
      subject: data.subject,
      message: data.message,
    }).then(() => {
    setModalType("success");
    setModalMessage(
      lang === "en"
        ? "Message sent successfully"
        : "تم إرسال الرسالة بنجاح"
    );
    setShowModal(true);
  })
  .catch((err) => {
    console.error("Error sending message:", err);
    setModalType("error");
    setModalMessage(
      lang === "en"
        ? "Something went wrong, try again"
        : "حصل خطأ، حاول مرة أخرى"
    );
    setShowModal(true);
  });

    
  };
  

  return (
    <>
      {/* HERO */}
      <div className="px-4 md:px-15 lg:px-30 xl:px-40">
        <DynamicHero
          links={{
            en: ["Home", "Contact"],
            ar: ["الرئيسية", "تواصل معنا"],
          }}
          authorImg={authorImg}
        />
      </div>

 <section className="w-full bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-4">

          {/* CARD */}
          <div className="border border-[rgba(48,146,85,0.2)] rounded-[30px] bg-white overflow-hidden px-6 md:px-10 py-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">

              {/* LEFT SIDE */}
              <div className="w-full md:w-[42%] bg-[#e9f8ef] px-8 py-12 flex flex-col gap-8 rounded-3xl justify-center">

                {/* Item 1 */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white flex items-center justify-center group hover:bg-[#309255] transition">
                    <IoCallOutline className="text-[#309255] text-2xl group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone No.</p>
                    <p className="text-lg font-medium text-[#212832]">
                      (88) 193 326 867
                    </p>
                  </div>
                </div>

                <hr className="border-[#cfeedd]" />

                {/* Item 2 */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white flex items-center justify-center group hover:bg-[#309255] transition">
                    <MdOutlineMailOutline className="text-[#309255] text-2xl group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Email Address.
                    </p>
                    <p className="text-lg font-medium text-[#212832]">
                      edule100@gmail.com
                    </p>
                  </div>
                </div>

                <hr className="border-[#cfeedd]" />

                {/* Item 3 */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white flex items-center justify-center group hover:bg-[#309255] transition">
                    <PiMapPinLight className="text-[#309255] text-2xl group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Office Address.
                    </p>
                    <p className="text-lg font-medium text-[#212832]">
                      Talga, Alabama, USA
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full md:w-[58%] px-6 py-8 md:px-10 md:py-10">

                {/* TITLE */}
                <div className="text-center mb-10">
                  <h2 className="text-[28px] font-medium leading-[1.4] inline-block relative">
                    {lang === "en" ? "Get in Touch " : "تواصل "}
                    <span className="text-[#309255] relative inline-block">
                      {lang === "en" ? "With Us" : "معنا"}
                      <img
                        src={titleLine}
                        alt="underline"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[120px]"
                      />
                    </span>
                  </h2>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <input
                    type="text"
                    placeholder={lang === "en" ? "Name" : "الاسم"}
                    className="
                      w-full h-[60px] px-6 
                      text-[15px] text-[#52565b] 
                      border border-[rgba(48,146,85,0.2)] 
                      rounded-[10px] bg-white 
                      transition-all duration-300 
                      focus:border-main focus:outline-none
                    "
                    {...register("name", {
                      required:
                        lang === "en"
                          ? "Name is required"
                          : "الاسم مطلوب",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}

                  {/* email */}
                  <input
                    type="email"
                    placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
                    className="
                      w-full h-[60px] px-6 
                      text-[15px] text-[#52565b] 
                      border border-[rgba(48,146,85,0.2)] 
                      rounded-[10px] bg-white 
                      transition-all duration-300 
                      focus:border-main focus:outline-none
                    "
                    {...register("email", {
                      required:
                        lang === "en"
                          ? "Email is required"
                          : "البريد الإلكتروني مطلوب",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message:
                          lang === "en"
                            ? "Invalid email address"
                            : "البريد الإلكتروني غير صحيح",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}

                  {/* subject */}
                  <input
                    type="text"
                    placeholder={lang === "en" ? "Subject" : "الموضوع"}
                    className="
                      w-full h-[60px] px-6 
                      text-[15px] text-[#52565b] 
                      border border-[rgba(48,146,85,0.2)] 
                      rounded-[10px] bg-white 
                      transition-all duration-300 
                      focus:border-main focus:outline-none
                    "
                    {...register("subject", {
                      required:
                        lang === "en"
                          ? "Subject is required"
                          : "الموضوع مطلوب",
                    })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}

                  {/* TEXTAREA */}
                  <textarea
                    placeholder={lang === "en" ? "Message" : "الرسالة"}
                    className="
                      w-full h-40 px-6 py-4
                      text-[15px] text-[#52565b]
                      border border-[rgba(48,146,85,0.2)]
                      rounded-[10px] bg-white
                      transition-all duration-300
                      focus:border-main focus:outline-none
                      resize-none
                    "
                    {...register("message", {
                      required: lang === "en"
                        ? "Message is required"
                        : "الرسالة مطلوبة",

                      minLength: {
                        value: 20,
                        message: lang === "en"
                          ? "Message must be at least 20 characters"
                          : "الرسالة يجب ألا تقل عن 20 حرف",
                      },

                      maxLength: {
                        value: 265,
                        message: lang === "en"
                          ? "Message must not exceed 265 characters"
                          : "الرسالة يجب ألا تزيد عن 265 حرف",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#309255] text-white py-4 rounded-lg text-lg font-medium hover:bg-[#2a7f49] transition cursor-pointer"
                  >
                    {lang === "en" ? "Send Message" : "إرسال الرسالة"}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
        <Banner/>



        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">

      {/* Icon */}
      <div className="flex justify-center mb-4">
        {modalType === "success" ? (
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Message */}
      <p className="text-center text-gray-700 text-lg mb-6">
        {modalMessage}
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(false)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition
            ${modalType === "success"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"}`}
        >
          {lang === "en" ? "OK" : "حسناً"}
        </button>
      </div>
    </div>
  </div>
)}

    </>

  );
};

export default Contact;

