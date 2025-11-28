import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useLanguage } from "../hooks/useLanguage";
import "swiper/css/effect-coverflow";

import brand1 from "../assets/images/brand-01.png";
import brand2 from "../assets/images/brand-02.png";
import brand3 from "../assets/images/brand-03.png";
import brand4 from "../assets/images/brand-04.png";
import brand5 from "../assets/images/brand-05.png";
import brand6 from "../assets/images/brand-06.png";
import { useTranslation } from "react-i18next";

const images = [brand1, brand2, brand3, brand4, brand5, brand6];

const Brands = () => {
  const { lang } = useLanguage();
  const { i18n } = useTranslation();

  return (
    <div className="bg-lightGreen p-5 mt-20">
      <h2 className="text-center text-lg md:text-2xl text-main font-semibold mb-8 ">
        {lang === "ar" ? "افضل الداعمين لدرب" : "Best Supporters of Darrbe"}
      </h2>

      <Swiper
        key={i18n.language}
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={img}
              alt={`brand-${index}`}
              className="w-28 h-auto object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
