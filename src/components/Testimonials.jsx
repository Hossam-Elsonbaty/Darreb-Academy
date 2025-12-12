import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import SectionTitle from "../common/dynamic-components/SectionTitle";
import testimonialImg1 from "../assets/images/author-06.jpg";
import testimonialImg2 from "../assets/images/author-07.jpg";
import testimonialImg3 from "../assets/images/author-11.jpg";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Rating } from "@mui/material";

const images = [testimonialImg1, testimonialImg2, testimonialImg3];

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = t("testimonials", { returnObjects: true });
  const { lang } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const useCoverflow = windowWidth >= 1024;
  const slidesCount = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;

  return (
    <div className="py-20 px-4 md:px-15 lg:px-30 xl:px-40">
      <p className="text-main mb-5 text-center font-medium text-2xl">
        {lang === "en" ? "Student Testimonial" : "راى الطالب"}
      </p>
      <SectionTitle
        status="center"
        title={
          lang === "en" ? (
            <h2 className="text-4xl font-medium capitalize text-center">
              Feedback From <span className="text-main">Students</span>
            </h2>
          ) : (
            <h2 className="text-4xl font-medium text-center">
              اراء <span className="text-main">الطلاب</span>
            </h2>
          )
        }
      />

      {/* Slider - Conditional Coverflow */}
      <div
        className="mt-12"
        style={{ paddingTop: "20px" }}
      >
        <Swiper
          key={`${lang}-${windowWidth}`}
          effect={useCoverflow ? "coverflow" : "slide"}
          grabCursor={true}
          centeredSlides={useCoverflow || slidesCount === 1}
          slidesPerView={slidesCount}
          spaceBetween={windowWidth < 768 ? 20 : 30}
          loop={true}
          initialSlide={useCoverflow ? 1 : 0}
          loopedSlides={useCoverflow ? testimonials.length : undefined}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={
            useCoverflow
              ? {
                  rotate: 20,
                  stretch: 0,
                  depth: 150,
                  modifier: 1.5,
                  slideShadows: true,
                }
              : undefined
          }
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="testimonials-swiper pb-12"
        >
          {testimonials.map((testi, index) => (
            <SwiperSlide key={`${testi.id}-${index}`}>
              <div className="bg-white shadow-lg rounded-xl p-6 text-center h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 mx-2">
                <div>
                  <img
                    src={images[index % images.length]}
                    alt={testi.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-2 border-main/20"
                  />
                  <div className="flex justify-center mb-3">
                    <Rating
                      name="read-only"
                      value={testi.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-20">
                    {testi.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testi.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testi.job}, USA</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
