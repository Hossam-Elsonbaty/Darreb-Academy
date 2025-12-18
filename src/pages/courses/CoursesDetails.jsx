import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import imgDetail from "../../assets/images/courses-details.webp";
// import courseImg1 from "../../assets/images/courses-01.jpg";
// import courseImg2 from "../../assets/images/courses-02.jpg";
// import courseImg3 from "../../assets/images/courses-03.jpg";
// import courseImg4 from "../../assets/images/courses-04.jpg";
// import courseImg5 from "../../assets/images/courses-05.jpg";
// import courseImg6 from "../../assets/images/courses-06.jpg";
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
import axios from "axios";
import { useEffect, useState } from "react";
// const coursesImages = [
//   courseImg1,
//   courseImg2,
//   courseImg3,
//   courseImg4,
//   courseImg5,
//   courseImg6,
// ];
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
  console.log("Course ID:", id);
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [course, setCourse] = useState(null);
 useEffect(() => {
  axios
    .get(`https://darreb-academy-backend.vercel.app/api/courses/${id}`)
    .then((response) => {
      setCourse(response.data);
    })
    .catch((error) => {
      console.error("Error fetching course:", error);
    });
}, [id]);


  if (!course) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  return (
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
            <img src={course.thumbnail || imgDetail} className="rounded-lg" />
            {/* <h1 className="text-3xl  py-3">{course.title}:{course.description} {lang === "en" ? "Description" : "وصف"}</h1> */}
            <h1 className="text-3xl py-2">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
            {/* section2 */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <img
                  src={profileImages[Math.floor(Math.random() * 6)]}
                  className="w-10 h-10 rounded-full"
                  alt="Author"
                />
                <span className="text-gray-700 font-medium">
                  {course.instructor?.fullName}
                </span>
                <span className="text-green-300 font-medium">
                  {course.totalEnrollments}{" "}
                  {lang === "en" ? "Enrolled Students" : "طالب مسجل"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-700">
                  {course.rating}
                </span>{" "}
                <Rating
                  value={Number(course.rating || 0)}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <span>({course.totalRatings} Rating)</span>
              </div>
            </div>{" "}
            {/* end of section 2 */}
            {/* sec 3 */}
            <div className="flex justify-evenly  bg-[#eefbf3] my-5 py-3 px-10 rounded-xl">
              <button className="btn1">
                {" "}
                {lang === "en" ? "Description" : "الوصف"}
              </button>
              <button className="p-3 rounded-lg bg-white text-md text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
                {lang === "en" ? "Instructor" : "المدربين"}
              </button>
              <button className="p-3  rounded-lg bg-white text-md text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
                {lang === "en" ? "Reviews" : "التقييمات"}
              </button>
            </div>
            {/* sec4 */}
            <div>
              <div>
                <h1 className="text-2xl  py-3">
                  {" "}
                  {lang === "en" ? "Description:" : "الوصف"}
                </h1>
                <p>
                  {lang === "en" ? course.description : course.description_ar}
                </p>
              </div>
              <div>
                <h1 className="text-2xl  py-3">
                  {lang === "en" ? " Curriculum:" : "المقرر"}
                </h1>
                {course.chapters && course.chapters.length > 0 ? (
                  <ul className="list-disc ps-5 space-y-2">
                    {course.chapters.map((item) => (
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
                <h1 className="text-2xl  py-3">
                  {lang === "en" ? " Certificate:" : "الشهادة"}
                </h1>
                <p>
                  {lang === "en"
                    ? "Certificate available after completion"
                    : "شهادة متاحة بعد إتمام الدورة"}
                </p>
              </div>
            </div>
          </div>
          {/* right side */}

          <div className="lg:w-1/3 w-full flex flex-col gap-6">
            {/* Course Info Card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 top-28 ">
              {/* Price */}
              <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
                ${course.price}
              </h2>

              {/* Info List */}
              <div className="flex flex-col divide-y">
                <InfoRow
                  icon={<CiUser />}
                  label={lang === "en" ? "Instructor" : "المدرب"}
                  value={course.instructor?.fullName}
                />
                <InfoRow
                  icon={<CiClock1 />}
                  label={lang === "en" ? "Duration" : "المدة"}
                  value={course.totalDuration}
                />
                <InfoRow
                  icon={<IoBookOutline />}
                  label={lang === "en" ? "Lectures" : "المحاضرات"}
                  value={course.totalLectures}
                />
                <InfoRow
                  icon={<CiBookmark />}
                  label={lang === "en" ? "Level" : "المستوي"}
                  value={course.level}
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
                <button className="btn1 w-full mt-8 text-center  ">
                  {lang === "en" ? " Enroll Now" : "سجل الان"}
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
    </>
  );
};

export default CourseDetails;
