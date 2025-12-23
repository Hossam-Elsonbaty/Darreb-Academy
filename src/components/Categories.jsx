import { FiSearch } from "react-icons/fi";
import SectionTitle from "../common/dynamic-components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "../common/dynamic-components/CourseCard";
import { fetchCourses } from "../Store/Slices/coursesSlice";
import { fetchCategories } from "../Store/Slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const { lang } = useLanguage();
  // const { t } = useTranslation();
  const [cate, setCate] = useState(0);
  // const { title, cards } = t("courses", { returnObjects: true });

  // const [cate, setCate] = useState(
  //   `${lang === "en" ? "UX/UI Design" : "تصميم UX/UI"}`
  // );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const { categories } = useSelector((state) => state.categories);
  // Dispatch the fetchCourses action on component mount
  useEffect(() => {
    console.log(courses);
    
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);
  // Filter cards based on category and search term
  const filteredCourses = (courses || []).filter((c) => {
    const matchesCategory =
      cate === 0 || String(c.category?._id) === String(cate);

    const matchesSearch = c.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // useEffect(() => {
  //   setCate(lang === "en" ? "UX/UI Design" : "تصميم UX/UI");
  // }, [lang]);
  return (
    <div className="bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
        <SectionTitle
          title={
            lang === "en" ? (
              <h2 className="text-4xl font-medium capitalize">
                all <span className="text-[#309255]">courses</span> of edule
              </h2>
            ) : (
              <h2 className="text-4xl font-medium">
                جميع <span className="text-[#309255]">كورسات</span> داررب
                اكاديمي
              </h2>
            )
          }
        />

        <div className="border rounded-2xl border-[#ddd] px-3 py-1 flex  justify-between items-center mt-20 md:mt-0 gap-2">
          <input
            className="w-full py-3 outline-0"
            placeholder={
              lang === "en" ? "Search for courses" : "ابحث عن كورسات"
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
          <span className="bg-[#309255] inline-flex items-center justify-center rounded p-3">
            <FiSearch className="text-white" size={20} />
          </span>
        </div>
      </div>
      {/* Swiper Categories */}
      <div className="relative mt-16 rounded-2xl  bg-[#eefbf3] py-10 px-15">
        {/* Custom arrows */}
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#309255] text-white ms-2 me-2  rounded-full shadow cursor-pointer w-[30px] h-[30px] hidden md:block">
          ‹
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#309255] text-white  rounded-full shadow cursor-pointer  ms-2 me-2 w-[30px] h-[30px] hidden md:block">
          ›
        </button>

        <Swiper
          key={lang}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 15 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {categories?.map((cat) => (
            <SwiperSlide key={cat._id}>
              <div
                className={`p-3 rounded-2xl w-full bg-white text-lg text-center duration-300 cursor-pointer hover:text-[#309255] hover:border-main border border-[#ddd] ${
                  cate === cat._id && "text-[#309255] border-main"
                }`}
                onClick={() => setCate(cat._id)}
              >
                {lang === "en" ? cat.name : cat.name_ar}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
          {lang === "en"
            ? "Error fetching courses!"
            : "حدث خطأ أثناء جلب الكورسات!"}
        </div>
      )}
      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((c) => (
            <div key={c._id}>
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
  );
};

export default Categories;
