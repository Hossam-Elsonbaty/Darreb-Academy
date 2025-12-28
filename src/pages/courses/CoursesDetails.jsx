import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import profile1 from "../../assets/images/author-01.jpg";
import profile2 from "../../assets/images/author-02.jpg";
import profile3 from "../../assets/images/author03.jpg";
import profile4 from "../../assets/images/author-04.jpg";
import profile5 from "../../assets/images/author-05.jpg";
import profile6 from "../../assets/images/author-06.jpg";
import { useLanguage } from "../../hooks/useLanguage";
import shape14 from "../../assets/images/shape14.webp";
import googlePlay from "../../assets/images/google-play.webp";
import appstore from "../../assets/images/app-store.webp";
import i18n from "../../i18n";
import { Rating } from "@mui/material";
import { CiUser, CiClock1, CiBookmark, CiGlobe, CiMedal } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
// import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../api/axios";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../components/Loader";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Pagination } from "swiper/modules";
import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";

const profileImages = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
];
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-4 text-sm">
    <div className="flex items-center gap-2 text-black">
      <span className="text-green-600 text-lg">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="font-medium text-gray-500">{value}</span>
  </div>
);
const ShareIcon = ({ icon }) => (
  <button
    className="w-10 h-10 rounded-lg border flex items-center justify-center
    text-gray-600 hover:bg-green-600 hover:text-white transition"
  >
    {icon}
  </button>
);

const CourseDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems, isCartLoading } = useCart();
  const isInCart =Array.isArray(cartItems?.items) && cartItems.items.some((item) => item.course?._id === id);
  const [isAdding, setIsAdding] = useState(false);
  console.log("Course ID:", id);
  // const { t } = useTranslation();
  const { lang } = useLanguage();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // success | error
  const [modalMessage, setModalMessage] = useState("");
  const isLoading = useSelector(state=>state.loader.isLoading);
    useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isInCart) return;
    setIsAdding(true);
    try {
      await addToCart(id);
    } finally {
      setIsAdding(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const fetchReviews = useCallback(async () => {
    try {
      setIsReviewsLoading(true);
      const res = await api.get(`/reviews/course/${id}`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Fetch reviews error:", err.response?.data);
    } finally {
      setIsReviewsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchReviews();
  }, [id, fetchReviews]);

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((response) => {
        console.log(response.data);
        console.log(isLoading)
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id]);

  // if (!course) {
  //   return <Loader/>;
  // }

  const tabClass = (tabName) =>
    `p-3 rounded-lg text-md border-lightGreen border cursor-pointer
   ${
     activeTab === tabName
       ? "bg-green-700 text-white"
       : "bg-white text-black hover:bg-green-700 hover:text-white"
   }`;

  const onSubmitReview = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalType("error");
      setModalMessage(
        lang === "en" ? "Please login first" : "من فضلك سجل الدخول أولاً"
      );
      setShowModal(true);
      return;
    }
    try {
      await api.post("/reviews", {
        courseId: id,
        comment: data.comment,
        rating: Number(data.rating),
      });
      setModalType("success");
      setModalMessage(
        lang === "en"
          ? "Review submitted successfully"
          : "تم إرسال التقييم بنجاح"
      );
      setShowModal(true);
      reset();
      setIsReviewModalOpen(false);
      fetchReviews();
    } catch (err) {
      console.log("Submit review error:", err.response?.data);
      setModalType("error");
      setModalMessage(err.response?.data.message);
      setShowModal(true);
    }
  };

  return (
    <>
      {
        isLoading?
        <Loader/>
        :
        <>
          <DynamicHero
            links={{
              en: ["Home", "CoursesDetails"],
    
              ar: ["الرئيسية", " تفاصيل الكورس"],
            }}
            authorImg={authorImg}
          />
          <div className=" bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* left side */}
              <div className="lg:w-2/3 w-full">
                <img src={course?.thumbnail} className="rounded-lg" />
                <h1 className="text-3xl py-2">{course?.title}</h1>
                <p className="text-gray-600">{course?.description}</p>
                {/* section2 */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImages[Math.floor(Math.random() * 6)]}
                      className="w-10 h-10 rounded-full"
                      alt="Author"
                    />
                    <span className="text-gray-700 font-medium md:text-lg text-xs">
                      {course?.instructor?.fullName}
                    </span>
                    <span className="text-green-300 font-medium md:text-lg text-xs">
                      {course?.totalEnrollments}{" "}
                      {lang === "en" ? "Enrolled Students" : "طالب مسجل"}
                    </span>
                  </div>
    
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700 md:text-lg text-xs">
                      {course?.rating}
                    </span>{" "}
                    <Rating
                      value={Number(course?.rating || 0)}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <span className="md:text-lg text-xs">({course?.totalRatings} Rating)</span>
                  </div>
                </div>{" "}
                {/* end of section 2 */}
                {/* sec 3 */}
                <div className="flex justify-evenly  bg-[#eefbf3] my-5 py-3 px-10 rounded-xl">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={tabClass("description")}
                  >
                    {lang === "en" ? "Description" : "الوصف"}
                  </button>
                  {/* <button className="p-3 rounded-lg bg-white text-md text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
                    {lang === "en" ? "Instructor" : "المدربين"}
                  </button>  */}
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={tabClass("reviews")}
                  >
                    {lang === "en" ? "Reviews" : "التقييمات"}
                  </button>
                </div>
                {/* TAB CONTENT */}
                {activeTab === "description" && (
                  <div>
                    <div>
                      <h1 className="text-2xl py-3">
                        {lang === "en" ? "Description:" : "الوصف"}
                      </h1>
                      <p>
                        {lang === "en" ? course?.description : course?.description_ar}
                      </p>
                    </div>
    
                    <div>
                      <h1 className="text-2xl py-3">
                        {lang === "en" ? "Curriculum:" : "المقرر"}
                      </h1>
    
                      {course?.chapters && course?.chapters.length > 0 ? (
                        <ul className="list-disc ps-5 space-y-2">
                          {course?.chapters.map((item) => (
                            <li key={item._id}>
                              {lang === "en"
                                ? item.chapter.title
                                : item.chapter.title_ar}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>
                          {lang === "en"
                            ? "No curriculum available"
                            : "لا يوجد محتوى للدورة"}
                        </p>
                      )}
                    </div>
    
                    <div>
                      <h1 className="text-2xl py-3">
                        {lang === "en" ? "Certificate:" : "الشهادة"}
                      </h1>
                      <p>
                        {lang === "en"
                          ? "Certificate available after completion"
                          : "شهادة متاحة بعد إتمام الدورة"}
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <>
                    {isReviewsLoading ? (
                      <p className="text-center text-gray-500">
                        {lang === "en"
                          ? "Loading reviews..."
                          : "جاري تحميل التقييمات..."}
                      </p>
                    ) : reviews.length === 0 ? (
                      <p className="text-center text-gray-500">
                        {lang === "en" ? "No reviews yet" : "لا يوجد تقييمات بعد"}
                      </p>
                    ) : (
                      <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        slidesPerView={1}
                        className="reviews-swiper"
                      >
                        {reviews?.map((review) => (
                          <SwiperSlide key={review._id}>
                            <div className="border border-green-200 rounded-3xl p-8 bg-white">
                              <div className="flex items-center gap-4 mb-4">
                                <img
                                  src={profileImages[Math.floor(Math.random() * 6)]}
                                  className="w-20 h-20 rounded-full"
                                />
                                <div>
                                  <p className="font-semibold text-lg">
                                    {review.user?.fullName || "User"}
                                  </p>
    
                                  <Rating
                                    value={review.rating}
                                    readOnly
                                    size="medium"
                                  />
                                </div>
                              </div>
    
                              <p className="text-gray-600 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                    <div className="flex justify-center mt-8">
                      <button
                        className="btn1"
                        onClick={() => setIsReviewModalOpen(true)}
                      >
                        {lang === "en" ? "Write A Review" : "اكتب تقييم"}
                      </button>
                    </div>
    
                    {isReviewModalOpen && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        {/* Modal Box */}
                        <div
                          className="bg-white rounded-lg p-6 w-full max-w-md relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close */}
                          <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
                            onClick={() => setIsReviewModalOpen(false)}
                          >
                            ✕
                          </button>
    
                          <h3 className="text-xl font-semibold mb-4">
                            {lang === "en" ? "Write a Review" : "اكتب تقييم"}
                          </h3>
    
                          <textarea
                            className={`w-full border border-green-200 rounded-lg p-4 resize-none focus:outline-none 
        ${errors.comment ? "border-red-500" : "border-gray-300"}
      `}
                            rows={5}
                            placeholder={
                              lang === "en"
                                ? "Write your comment..."
                                : "اكتب تعليقك..."
                            }
                            {...register("comment", {
                              required:
                                lang === "en"
                                  ? "Comment is required"
                                  : "التعليق مطلوب",
                              minLength: {
                                value: 10,
                                message:
                                  lang === "en"
                                    ? "Comment must be at least 10 characters"
                                    : "التعليق يجب ألا يقل عن 10 حروف",
                              },
                            })}
                          />
    
                          {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.comment.message}
                            </p>
                          )}
    
                          <div className="flex justify-center mb-4">
                            <Controller
                              name="rating"
                              control={control}
                              rules={{
                                validate: (value) =>
                                  value > 0 ||
                                  (lang === "en"
                                    ? "Rating is required"
                                    : "التقييم مطلوب"),
                              }}
                              render={({ field }) => (
                                <Rating
                                  {...field}
                                  value={field.value}
                                  onChange={(_, value) => field.onChange(value)}
                                />
                              )}
                            />
    
                            {errors.rating && (
                              <p className="text-red-500 text-sm mt-1 text-center">
                                {errors.rating.message}
                              </p>
                            )}
                          </div>
    
                          <button
                            className="btn1 w-full"
                            onClick={handleSubmit(onSubmitReview)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? lang === "en"
                                ? "Submitting..."
                                : "جاري الإرسال..."
                              : lang === "en"
                              ? "Submit Review"
                              : "إرسال التقييم"}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
    
              {/* right side */}
    
              <div className="lg:w-1/3 w-full flex flex-col gap-6">
                {/* Course Info Card */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 top-28 ">
                  {/* Price */}
                  <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
                    ${course?.price}
                  </h2>
    
                  {/* Info List */}
                  <div className="flex flex-col divide-y">
                    <InfoRow
                      icon={<CiUser />}
                      label={lang === "en" ? "Instructor" : "المدرب"}
                      value={course?.instructor?.fullName}
                    />
                    <InfoRow
                      icon={<CiClock1 />}
                      label={lang === "en" ? "Duration" : "المدة"}
                      value={course?.totalDuration}
                    />
                    <InfoRow
                      icon={<IoBookOutline />}
                      label={lang === "en" ? "Lectures" : "المحاضرات"}
                      value={course?.totalLectures}
                    />
                    <InfoRow
                      icon={<CiBookmark />}
                      label={lang === "en" ? "Level" : "المستوي"}
                      value={course?.level}
                    />
                    <InfoRow
                      icon={<CiGlobe />}
                      label={lang === "en" ? "Language" : "اللغة"}
                      value={lang}
                    />
                    <InfoRow
                      icon={<CiMedal />}
                      label={lang === "en" ? "Certificate" : "الشهادة"}
                      value={lang === "en" ? "Yes" : "نعم"}
                    />
                  </div>
    
                  {/* Enroll Button */}
                  <div className="flex justify-center">
                    <button
                      disabled={isInCart || isCartLoading || isAdding}
                      onClick={(e) => {
                        console.log("Cart clicked");
                        handleAddToCart(e);
                      }}
                      className="btn1 w-full mt-8 text-center  "
                    >
                      {lang === "en" ? " Add To Cart " : " أضف إلى العربه"}
                    </button>
                  </div>
                </div>
    
                {/* Share Course */}
                <div className="bg-white p-6 ">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    {lang === "en" ? "Share Course:" : "شارك الكورس"}
                  </h3>
    
                  <div className="flex gap-3">
                    <ShareIcon icon={<FaFacebookF />} />
    
                    <ShareIcon icon={<FaLinkedinIn />} />
                    <ShareIcon icon={<FaTwitter />} />
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <section className="bg-[#309255] text-white p-10 flex lg:flex-row flex-col relative overflow-hidden">
            <div className="app-shape-1 z-0"></div>
            <div className="app-shape-2 z-1"></div>
            <div className="app-shape-3 z-2"></div>
            <div className="flex flex-col lg:ps-10 z-10">
              {i18n.language === "ar" ? (
                <>
                  <p className="font-medium text-2xl mb-5">جاهز للبدء؟ </p>
                  <h1 className="text-3xl font-medium">
                    قم بتحميل تطبيقك على الهاتف.
                  </h1>
                  <h1 className="text-3xl font-medium">لبدء هذه الدورة بسهولة.</h1>
                </>
              ) : (
                <>
                  <p className="font-medium text-2xl mb-5">Ready To Start ?</p>
                  <h1 className="text-3xl font-medium">
                    Download Your Mobile App.
                  </h1>
                  <h1 className="text-3xl font-medium">
                    For easy to start this course.
                  </h1>
                </>
              )}
            </div>
            <img
              src={shape14}
              alt="shape"
              className="animate-float-horizontal mx-20"
            ></img>
            <div className="flex gap-3 justify-center items-center ps-10">
              <button className="bg-white px-4 py-2 rounded-lg shadow shadow-gray-50 hover:scale-105 transition-transform flex items-center gap-2">
                <img src={googlePlay} alt="Google Play" className="h-8 md:h-10" />
              </button>
              <button className="bg-white px-4 py-2 rounded-lg shadow shadow-gray-50 hover:scale-105 transition-transform flex items-center gap-2">
                <img src={appstore} alt="Google Play" className="h-8 md:h-10" />
              </button>
            </div>
          </section>
    
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {modalType === "success" ? (
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
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
                ${
                  modalType === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                  >
                    {lang === "en" ? "OK" : "حسناً"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

      }
    </>
  );
};

export default CourseDetails;
