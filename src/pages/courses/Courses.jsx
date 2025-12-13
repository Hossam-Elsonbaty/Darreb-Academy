import { FiSearch } from "react-icons/fi";
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import i18n from "../../i18n";
import shape14 from "../../assets/images/shape14.webp";
import googlePlay from "../../assets/images/google-play.webp";
import appstore from "../../assets/images/app-store.webp";

import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CourseCard from "../../common/dynamic-components/CourseCard";
const Courses = () => {
   const { lang } = useLanguage();
    const { t } = useTranslation();
    const {  cards } = t("courses", { returnObjects: true });
  
    const [cate, setCate] = useState(
      `${lang === "en" ? "UX/UI Design" : "تصميم UX/UI"}`
    );
    const [searchTerm, setSearchTerm] = useState("");
  
    // Filter cards based on category and search term
    const filteredCards = cards.filter((c) => {
      const matchesCategory = c.category.toLowerCase() === cate.toLowerCase();
      const matchesSearch = c.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  
    useEffect(() => {
      setCate(lang === "en" ? "UX/UI Design" : "تصميم UX/UI");
    }, [lang]);
  return (<>
  <div >
    
      <DynamicHero
        links={{
          en: ["Home", "Courses"],

          ar: ["الرئيسية", " الكورسات"],
        }}
       authorImg={authorImg}
      />
    
    <div className="bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
     


        <div className="flex justify-evenly mt-16 bg-lightGreen py-10 px-15 rounded-xl" >
          {/* <button type="button" class="text-white bg-green-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            All Courses</button> */}
            <button className="btn1"> {lang === "en" ? "All Courses" : "كل الكورسات"}</button>
            <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
               {lang === "en" ? "Collections" : "المجموعات"}</button>
            <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
             {lang === "en" ? "Wishlist" : "قائمة الرغبات"}</button>
            <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
               {lang === "en" ? "Archived" : "المؤرشف"}</button>

 <div className="border rounded border-main/40 px-3 py-1 flex justify-between items-center mt-20 md:mt-0 gap-2">
                <input
                  className="w-full py-3 outline-0"
                  placeholder={
                    lang === "en" ? "Search for courses" : "ابحث عن كورسات"
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search"
                />
                <span className="bg-main inline-flex items-center justify-center rounded p-3">
                  <FiSearch className="text-white" size={20} />
                </span>
        </div >

        </div>
      

         {/* Cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((c) => (
            <div key={c.id}>
              <CourseCard c={c} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500 text-xl">
            {lang === "en"
              ? "No courses found matching your search"
              : "لم يتم العثور على كورسات مطابقة لبحثك"}
          </div>
        )}
      </div>
     
    </div>
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
  </div>
          </>
  );
};

export default Courses;
