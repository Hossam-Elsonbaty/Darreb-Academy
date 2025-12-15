import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import { useTranslation } from "react-i18next";
// import shape5 from "../../assets/images/shape5.webp";
import author03 from "../../assets/images/author03.jpg";
import author05 from "../../assets/images/author-05.jpg";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import author06 from "../../assets/images/author-06.jpg";
import author07 from "../../assets/images/author-07.jpg";
// import shape24 from "../../assets/images/shape24.webp";
import shape19 from "../../assets/images/shape-19.webp";
import shape20 from "../../assets/images/shape-20.webp";
// import shape23 from "../../assets/images/shape23.webp";
import shape8 from "../../assets/images/shape8.webp";
import about from "../../assets/images/about.webp";
// import shape11 from "../../assets/images/shape11.png";
import shape3 from "../../assets/images/shape3.png";
import shape14 from "../../assets/images/shape14.webp";
import googlePlay from "../../assets/images/google-play.webp";
import appstore from "../../assets/images/app-store.webp";
import { LiaCertificateSolid } from "react-icons/lia";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LiaCalendar } from "react-icons/lia";
import { IoMdTrendingUp } from "react-icons/io";
import TeamSection from "../../components/teamSection";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import brand1 from "../../assets/images/brand-01.png";
import brand2 from "../../assets/images/brand-02.png";
import brand3 from "../../assets/images/brand-03.png";
import brand4 from "../../assets/images/brand-04.png";
import brand5 from "../../assets/images/brand-05.png";
import brand6 from "../../assets/images/brand-06.png";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialSkype } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import Footer from "../../common/footer/Footer";

const About = () => {
  const { i18n } = useTranslation();
  const cards = [
    {
      name: { en: "Sara Hassan", ar: "سارة حسن" },
      role: { en: "UI/UX Designer", ar: "مصمم واجهات وتجربة المستخدم" },
      imageUrl: author03,
      rating: 2,
      text: {
        en: "Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.",
        ar: "    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.",
      },
    },
    {
      name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
      role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
      imageUrl: author05,
      rating: 4.2,
      text: {
        en: "Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.",
        ar: "    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.",
      },
    },
    {
      name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
      role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
      imageUrl: author06,
      rating: 3,
      text: {
        en: "Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.",
        ar: "    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.",
      },
    },
    {
      name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
      role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
      imageUrl: author07,
      rating: 3.5,
      text: {
        en: "Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.",
        ar: "    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.",
      },
    },
  ];
  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating); // full stars
    const halfStar = rating - fullStars >= 0.5; // half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={"full" + i} className="text-yellow-400" />);
    if (halfStar)
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<FaRegStar key={"empty" + i} className="text-gray-300" />);

    return stars;
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(cards.length / itemsPerPage);

  // Handlers for swipe
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1)),
    onSwipedRight: () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCards = cards.slice(indexOfFirst, indexOfLast);
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6];
  const [brandPage, setBrandPage] = useState(0);
  const brandsPerPage = 5;

  const brandHandlers = useSwipeable({
    onSwipedLeft: () =>
      setBrandPage((prev) => (prev + brandsPerPage) % brands.length),
    onSwipedRight: () =>
      setBrandPage(
        (prev) => (prev - brandsPerPage + brands.length) % brands.length
      ),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  const currentBrands = Array.from(
    { length: brandsPerPage },
    (_, i) => brands[(brandPage + i) % brands.length]
  );

  return (
    <div className="">
      <DynamicHero
        links={{
          en: ["Home", "About"],

          ar: ["الرئيسية", "من نحن"],
        }}
        authorImg={authorImg}
      />
      {/*================= Page Banner End ==================*/}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="flex flex-col gap-6 justify-center text-center lg:text-start">
              <img
                src={about}
                alt="about"
                className="relative rounded-2xl shadow-lg"
              />
            </div>
            {/* TEXT SIDE */}
            <div className="flex flex-col gap-5 lg:order-1 text-center lg:text-start">
              <span className="text-main text-lg md:text-xl font-medium">
                {i18n.language === "ar" ? (
                  <>مرحبًا بكم في إيدول</>
                ) : (
                  <>Welcome to Edule</>
                )}
              </span>

              <h3 className="text-3xl md:text-4xl font-medium leading-10 lg:leading-14">
                {i18n.language === "ar" ? (
                  <>
                    يمكنك الانضمام إلى
                    <br />
                    إيدول وتطوير مهاراتك <br />
                    <span className="text-main">لمستقبل مشرق </span>
                  </>
                ) : (
                  <>
                    You Can Join With Edule and upgrade your skill for your{" "}
                    <div className="relative inline-block">
                      <span className="text-main">bright future.</span>

                      <img
                        src={shape3}
                        alt="Shape"
                        className="absolute mt-1 h-1 w-44 md:w-54"
                      />
                    </div>
                  </>
                )}
              </h3>

              <p className="text-gray max-w-md mx-auto lg:mx-0 md:text-lg">
                {i18n.language === "ar" ? (
                  <>
                    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ
                    أن تم أخذه وتشويهه
                  </>
                ) : (
                  <>
                    Lorem Ipsum has been the industry's standard dummy text
                    since the when took and scrambled make.
                  </>
                )}
              </p>
              <div className="flex justify-center lg:justify-start">
                <button className="btn1">
                  {i18n.language === "ar" ? (
                    <>ابدأ دورة</>
                  ) : (
                    <> Start A Course</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================= End Second Section ==================*/}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="card group border border-gray-200 rounded-2xl p-8 
                hover:shadow-lg transition hover:border-main"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="circle bg-main/10 w-16 h-16 rounded-full flex items-center justify-center
                      transition group-hover:bg-main"
                  >
                    <LiaChalkboardTeacherSolid className="icon text-emerald-700 text-3xl transition group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {i18n.language === "ar" ? (
                      <>أفضل المدربين</>
                    ) : (
                      <>Top Instructors</>
                    )}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة،
                      وما زال مستخدمًا حتى اليوم.
                    </>
                  ) : (
                    <>
                      {" "}
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled to make type specimen
                      book has survived.
                    </>
                  )}
                </p>

                <p className="text-gray-600 leading-relaxed mt-4">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ أن تم أخذه وتشويهه
                    </>
                  ) : (
                    <>
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled make.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="card group border border-gray-200 rounded-2xl p-8 
                hover:shadow-lg transition hover:border-main"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="circle bg-main/10 w-16 h-16 rounded-full flex items-center justify-center
                      transition group-hover:bg-main"
                  >
                    <LiaCalendar className="icon text-emerald-700 text-3xl transition group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {i18n.language === "ar" ? (
                      <>برنامج محمول</>
                    ) : (
                      <>Portable Program</>
                    )}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة،
                      وما زال مستخدمًا حتى اليوم.
                    </>
                  ) : (
                    <>
                      {" "}
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled to make type specimen
                      book has survived.
                    </>
                  )}
                </p>

                <p className="text-gray-600 leading-relaxed mt-4">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ أن تم أخذه وتشويهه
                    </>
                  ) : (
                    <>
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled make.
                    </>
                  )}
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div
              className="card group border border-gray-200 rounded-2xl p-8 
                hover:shadow-lg transition hover:border-main"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="circle bg-main/10 w-16 h-16 rounded-full flex items-center justify-center
                      transition group-hover:bg-main"
                  >
                    <IoMdTrendingUp className="icon text-emerald-700 text-3xl transition group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {i18n.language === "ar" ? (
                      <>تطوّر سريعًا</>
                    ) : (
                      <>improve Quickly</>
                    )}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة،
                      وما زال مستخدمًا حتى اليوم.
                    </>
                  ) : (
                    <>
                      {" "}
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled to make type specimen
                      book has survived.
                    </>
                  )}
                </p>

                <p className="text-gray-600 leading-relaxed mt-4">
                  {i18n.language === "ar" ? (
                    <>
                      كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة
                      منذ أن تم أخذه وتشويهه
                    </>
                  ) : (
                    <>
                      Lorem Ipsum has been the industry's standard dummy text
                      since the when took and scrambled make.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================= End Cards Section ==================*/}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-lightGreen rounded-2xl p-10">
            <img
              src={shape8}
              alt="Shape"
              className="absolute top-56 w-10 left-20 md:w-12 z-20 rotate-360"
            />
            <img
              src={shape8}
              alt="Shape"
              className="absolute top-20 w-10 right-20 md:w-12 z-20 rotate-360"
            />
            <div className="flex flex-col justify-center ">
              {i18n.language === "ar" ? (
                <>
                  <p className="text-main mb-5 font-medium">كن مدرباً</p>
                  <h1 className="text-3xl font-medium">
                    يمكنك الانضمام إلى Edule لتصبح مدرباً وتشارك خبرتك{" "}
                    <span className="text-main relative">
                      مع المتعلمين؟
                      <img
                        src={shape3}
                        alt="shape"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                      ></img>
                    </span>
                  </h1>
                </>
              ) : (
                <>
                  <p className="text-main mb-5 font-medium">
                    Become A Instructor
                  </p>
                  <h1 className="text-3xl font-medium">
                    You Can Join With Edule as{" "}
                    <span className="text-main relative">
                      a instructor?
                      <img
                        src={shape3}
                        alt="shape"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                      ></img>
                    </span>
                  </h1>
                </>
              )}
            </div>
            <div>
              <svg
                className="animate-float-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="179.000000pt"
                height="103.000000pt"
                viewBox="0 0 179.000000 103.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <metadata>
                  Created by potrace 1.16, written by Peter Selinger 2001-2019
                </metadata>
                <g
                  transform="translate(0.000000,103.000000) scale(0.100000,-0.100000)"
                  fill="#309255"
                  stroke="none"
                >
                  <path d="M1280 1015 c0 -8 3 -15 6 -15 16 0 341 -52 354 -57 8 -3 -34 -18 -95 -34 -505 -133 -949 -364 -1340 -694 -153 -129 -212 -192 -198 -206 9 -9 34 8 102 73 389 370 911 658 1440 794 74 19 135 33 136 32 2 -2 -58 -52 -131 -111 -74 -60 -134 -113 -134 -117 0 -5 4 -11 9 -14 11 -7 364 276 354 284 -7 6 -471 81 -495 80 -5 0 -8 -7 -8 -15z" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className="btn1">
                {i18n.language === "ar" ? (
                  <>أرسل معلوماتك</>
                ) : (
                  <> Drop Information</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*================= End Becoma A instructor Section ==================*/}
      <TeamSection />
      {/*================= End Team Section ==================*/}
      <section className="bg-main text-white p-10 flex lg:flex-row flex-col relative overflow-hidden">
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
      {/*================= End Ready To Strat Section ==================*/}
      <div className="w-full flex flex-col py-12 items-center bg-white">
        <div className="container mx-auto px-4 ">
          {i18n.language === "ar" ? (
            <>
              {" "}
              <h2 className="text-xl text-center mb-8 text-main">
                آراء الطلاب
              </h2>
              <h1 className="text-3xl mb-8 font-bold text-center">
                تقييم من{" "}
                <span className="relative inline-block  text-main">
                  الطلاب
                  <img
                    src={shape3}
                    alt=""
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                  />
                </span>
              </h1>
            </>
          ) : (
            <>
              <h2 className="text-xl text-center mb-8 text-main">
                Student Testimonial
              </h2>
              <h1 className="text-3xl mb-8 font-bold text-center">
                Feedback From{" "}
                <span className="relative inline-block  text-main">
                  Student
                  <img
                    src={shape3}
                    alt=""
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                  />
                </span>
              </h1>
            </>
          )}
        </div>

        <div
          {...handlers}
          className="flex transition-transform duration-500 ease-in-out gap-12 w-full max-w-5xl cursor-grab"
        >
          {currentCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-main shadow-md flex flex-col gap-5 items-center text-center"
            >
              <div className="rounded-full border border-lightGreen p-2 border-main transition-all duration-300">
                <img
                  src={card.imageUrl}
                  alt={i18n.language === "ar" ? card.name.ar : card.name.en}
                  className="w-24 h-24 rounded-full object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
              {/* Rating */}
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex">{renderStars(card.rating)}</div>
                <span className="text-gray-600 font-medium">
                  {card.rating.toFixed(1)}
                </span>
              </div>
              {i18n.language === "ar" ? (
                <>
                  <p>{card.text.ar}</p>
                  <h3 className="text-xl font-semibold">{card.name.ar}</h3>
                  <p className="text-main">{card.role.ar}</p>
                </>
              ) : (
                <>
                  <p className="text-gray text-center">{card.text.en}</p>
                  <h3 className="text-xl font-semibold">{card.name.en}</h3>
                  <p className="text-main">{card.role.en}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div
          className={`flex mt-6 space-x-2 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentPage === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/*================= End Student Testimonial Section ==================*/}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex flex-col gap-8 bg-lightGreen rounded-2xl p-10">
            {i18n.language === "ar" ? (
              <>
                {" "}
                <img
                  src={shape20}
                  alt="Shape"
                  className="absolute top-24 w-10 left-40 md:w-12 z-20 rotate-360"
                />
                <img
                  src={shape19}
                  alt="Shape"
                  className="absolute top-24 w-10 left-100 md:w-12 z-21"
                />
              </>
            ) : (
              <>
                {" "}
                <img
                  src={shape20}
                  alt="Shape"
                  className="absolute top-20 w-10 right-40 md:w-12 z-20 rotate-360"
                />
                <img
                  src={shape19}
                  alt="Shape"
                  className="absolute top-20 w-10 right-100 md:w-12 z-21"
                />
              </>
            )}

            <div>
              {i18n.language === "ar" ? (
                <>
                  <h1 className="text-3xl font-medium">
                    أفضل داعم{" "}
                    <span className="text-main relative">
                      لإيدول
                      <img
                        src={shape3}
                        alt="shape"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                      ></img>
                    </span>
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-medium">
                    Best Supporter Of{" "}
                    <span className="text-main relative">
                      Edule
                      <img
                        src={shape3}
                        alt=""
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
                      />
                    </span>
                  </h1>
                </>
              )}
            </div>
            <div
              {...brandHandlers}
              className="flex justify-center gap-20 overflow-hidden"
            >
              {currentBrands.map((brand, idx) => (
                <img
                  key={idx}
                  src={brand}
                  alt="brand"
                  className="w-20 md:w-24 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/*================= End Best Supporter Section ==================*/}
    </div>
  );
};

export default About;
/*
      <section className="relative bg-lightGreen py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 justify-center text-center lg:text-start">
              <img
                src={shape8}
                alt="Shape"
                className="absolute top-10 w-16 md:w-20 z-20 rotate-360"
              />
              <h1 className=" font-bold leading-snug">
                {i18n.language === "ar" ? (
                  <div className="text-xl md:text-2xl">
                    <div>
                      الرئيسية // <span className="text-main">عنا</span>
                    </div>

                    <div className="mt-4 md:mt-6">
                      <span className="text-3xl md:text-5xl">عن </span>
                      <span className="text-main text-3xl md:text-5xl">
                        درب أكاديمي{" "}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      Home // <span className="text-main">About</span>
                    </div>

                    <div className="mt-4 md:mt-6">
                      <span className="text-3xl md:text-5xl">About </span>
                      <div className="inline-flex flex-col items-center">
                        <span className="text-main text-3xl md:text-5xl">
                          Edule.
                        </span>
                        <img src={shape3} alt="Shape" className=" mt-2" />
                      </div>
                    </div>
                    <img
                      src={shape23}
                      alt="Shape"
                      className=" absolute md:top-60 top-96 w-40 md:w-54  left-2 "
                    />
                  </>
                )}
              </h1>
            </div>
            <img
              src={shape24}
              alt="Shape"
              className=" absolute -top-4 right-3.5 w-36 h-80 md:w-96 z-0 "
            />
            <div className="relative flex justify-center lg:justify-end items-center">
              <img
                src={shape5}
                alt="Shape"
                className="animate-float-horizontal absolute -top-1 mr-0 md:mr-40 "
              />
              <div className="gap-20 flex">
                <div>
                  <div className="relative top-10 w-28 h-28 md:w-36 md:h-36 rounded-full border-2 gap-4 border-emerald-700 flex items-center justify-center">
                    <div className="bg-main w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                      <LiaCertificateSolid className="text-white text-8xl" />
                    </div>
                  </div>
                  <img
                    src={shape11}
                    alt="Shape"
                    className="absolute top-40 left-10  lg:top-44 lg:left-40 rotate-180"
                  />
                </div>
                <img
                  src={author03}
                  alt="about"
                  className="relative rounded-full w-48 h-48 md:w-50 md:h-52 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

*/ 