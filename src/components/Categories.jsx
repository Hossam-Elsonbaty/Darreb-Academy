import { FiSearch } from "react-icons/fi";
import SectionTitle from "../common/dynamic-components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "../common/dynamic-components/CourseCard";

const Categories = () => {
  const { lang } = useLanguage();
  const { t } = useTranslation();
  const { title, cards } = t("courses", { returnObjects: true });

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
                جميع <span className="text-[#309255]">كورسات</span> داررب اكاديمي
              </h2>
            )
          }
        />

        <div className="border rounded border-[#ddd] px-3 py-1 flex justify-between items-center mt-20 md:mt-0 gap-2">
          <input
            className="w-full py-3 outline-0"
            placeholder={
              lang === "en" ? "Search for courses" : "ابحث عن كورسات"
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
          />
          <span className="bg-[#309255] inline-flex items-center justify-center rounded p-3">
            <FiSearch className="text-white" size={20} />
          </span>
        </div>
      </div>
      {/* Swiper Categories */}
      <div className="relative mt-16 bg-[#eefbf3] py-10 px-15">
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
          {title.map((cat) => (
            <SwiperSlide key={cat}>
              <div
                className={`p-3 rounded w-full bg-white text-lg text-center duration-300 cursor-pointer hover:text-[#309255] hover:border-main border border-[#ddd] ${
                  cate === cat.toLowerCase() && "text-[#309255] border-main"
                }`}
                onClick={() => setCate(cat.toLowerCase())}
              >
                {cat}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
  );
};

export default Categories;
