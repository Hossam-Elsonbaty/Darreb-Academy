import React from "react";
import slider1 from "../assets/images/slider-1.png";
import slider2 from "../assets/images/about.webp";
import slider3 from "../assets/images/courses-details.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { Autoplay, EffectCube } from "swiper/modules";
import "swiper/css/effect-cube";

const images = [slider1, slider2, slider3];

const Header = () => {
  const { t, i18n } = useTranslation();
  const hero = t("hero", { returnObjects: true });

  return (
    <div className="mt-10">
      <Swiper
        key={i18n.language}
        effect={"cube"}
        modules={[Autoplay, EffectCube]}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="h-[60vh] w-[90vw] md:w-[60vw]  mx-auto"
      >
        {hero.map((h, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <img
                src={images[index]}
                alt={h.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bg-dark/70 flex flex-col justify-center items-center gap-3 top-0 start-0 h-full w-full p-5">
                <h2 className="text-lg md:text-3xl font-semibold md:leading-13 text-white text-center">
                  {h.title}
                </h2>
                <p className="text-xl text-gray md:w-80  text-center">
                  {h.desc}
                </p>
                <button>{h.btn}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
