// import { FiSearch } from "react-icons/fi";
// import DynamicHero from "../../common/dynamic-components/DynamicHero";
// import authorImg from "../../assets/images/author-11.jpg";
// // import i18n from "../../i18n";
// // import shape14 from "../../assets/images/shape14.webp";
// // import googlePlay from "../../assets/images/google-play.webp";
// // import appstore from "../../assets/images/app-store.webp";

// import { useLanguage } from "../../hooks/useLanguage";
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import CourseCard from "../../common/dynamic-components/CourseCard";
// import Banner from "../../common/Banner";
// const Courses = () => {
//   const { lang } = useLanguage();
//   const { t } = useTranslation();
//   const { cards } = t("courses", { returnObjects: true });

//   const [cate, setCate] = useState(
//     `${lang === "en" ? "UX/UI Design" : "تصميم UX/UI"}`
//   );
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter cards based on category and search term
//   const filteredCards = cards.filter((c) => {
//     const matchesCategory = c.category.toLowerCase() === cate.toLowerCase();
//     const matchesSearch = c.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   useEffect(() => {
//     setCate(lang === "en" ? "UX/UI Design" : "تصميم UX/UI");
//   }, [lang]);
//   return (
//     <>
//       <div>
//         <DynamicHero
//           links={{
//             en: ["Home", "Courses"],

//             ar: ["الرئيسية", " الكورسات"],
//           }}
//           authorImg={authorImg}
//         />

//         <div className="bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
//           <div className="flex justify-evenly mt-16 bg-[#eefbf3] py-10 px-15 rounded-xl">
//             {/* <button type="button" class="text-white bg-green-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
//             All Courses</button> */}
//             <button className="btn1">
//               {lang === "en" ? "All Courses" : "كل الكورسات"}
//             </button>
//             <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
//               {lang === "en" ? "Collections" : "المجموعات"}
//             </button>
//             <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
//               {lang === "en" ? "Wishlist" : "قائمة الرغبات"}
//             </button>
//             <button className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-lightGreen border">
//               {lang === "en" ? "Archived" : "المؤرشف"}
//             </button>

//             <div className="border rounded border-main/40 px-3 py-1 flex justify-between items-center mt-20 md:mt-0 gap-2">
//               <input
//                 className="w-full py-3 outline-0"
//                 placeholder={
//                   lang === "en" ? "Search for courses" : "ابحث عن كورسات"
//                 }
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 type="search"
//               />
//               <span className="bg-[#309255] inline-flex items-center justify-center rounded p-3">
//                 <FiSearch className="text-white" size={20} />
//               </span>
//             </div>
//           </div>
//           {/* Cards */}
//           <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
//             {filteredCards.length > 0 ? (
//               filteredCards.map((c) => (
//                 <div key={c.id}>
//                   <CourseCard c={c} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-10 text-gray-500 text-xl">
//                 {lang === "en"
//                   ? "No courses found matching your search"
//                   : "لم يتم العثور على كورسات مطابقة لبحثك"}
//               </div>
//             )}
//           </div>
//         </div>

//         <Banner />
//       </div>
//     </>
//   );
// };

// export default Courses;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Store/Slices/coursesSlice"; // Adjust the path as necessary
import { FiSearch } from "react-icons/fi";
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import CourseCard from "../../common/dynamic-components/CourseCard";
import Banner from "../../common/Banner";
import { useLanguage } from "../../hooks/useLanguage";
// import { useTranslation } from "react-i18next";
import authorImg from "../../assets/images/author-11.jpg";
import { fetchCategories } from "../../Store/Slices/categoriesSlice";

const Courses = () => {
  const { lang } = useLanguage();
  const [cate, setCate] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const { categories } = useSelector((state) => state.categories);
  // Dispatch the fetchCourses action on component mount
  useEffect(() => {

    dispatch(fetchCourses());
    dispatch(fetchCategories());
    console.log(courses);
    console.log(categories);
  }, [dispatch]);
  // Filter courses based on the selected category and search term
  const filteredCourses = courses?.filter((c) => {
    const matchesCategory = cate === 0 || c.category?._id == cate;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div>
      <DynamicHero authorImg={authorImg} links={{ en: ["Home", "Courses"], ar: ["الرئيسية", " الكورسات"] }} />

      <div className="bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
        <div className="flex justify-evenly mt-16 bg-[#eefbf3] py-10 px-15 rounded-xl">
          <button className="btn1" onClick={() => setCate(0)}>
            {lang === "en" ? "All Courses" : "كل الكورسات"}
          </button>
          {
            categories?.map(cat =>
              <button onClick={() => setCate(cat._id)} key={cat._id} className="p-3 rounded-lg bg-white text-lg text-center duration-300 cursor-pointer hover:text-white hover:bg-green-700 border-[#ddd] border">
                {lang === "en" ? cat.name : cat.name_ar}
              </button>
            )
          }
          <div className="border rounded border-[#ddd] px-3 py-1 flex justify-between items-center mt-20 md:mt-0 gap-2">
            <input
              className="w-full py-3 outline-0"
              placeholder={lang === "en" ? "Search for courses" : "ابحث عن كورسات"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
            />
            <span className="bg-[#309255] inline-flex items-center justify-center rounded p-3">
              <FiSearch className="text-white" size={20} />
            </span>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-5 text-xl text-gray-500">
            {lang === "en" ? "Loading courses..." : "جاري تحميل الكورسات..."}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-5 text-xl text-red-500">
            {lang === "en" ? "Error fetching courses!" : "حدث خطأ أثناء جلب الكورسات!"}
          </div>
        )}

        {/* Courses Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {
            filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <div key={c._id}>
                  <CourseCard c={c} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-xl">
                {lang === "en" ? "No courses found matching your search" : "لم يتم العثور على كورسات مطابقة لبحثك"}
              </div>
            )

          }
          {/* {cate != 0 ?
          filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <div key={c._id}>
                <CourseCard c={c} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-xl">
              {lang === "en" ? "No courses found matching your search" : "لم يتم العثور على كورسات مطابقة لبحثك"}
            </div>
          )
          :
          courses.length > 0 ? (
            courses.map((c) => (
              <div key={c._id}>
                <CourseCard c={c} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-xl">
              {lang === "en" ? "No courses found matching your search" : "لم يتم العثور على كورسات مطابقة لبحثك"}
            </div>
          )} */}

        </div>
      </div>

      <Banner />
    </div>
  );
};

export default Courses;

