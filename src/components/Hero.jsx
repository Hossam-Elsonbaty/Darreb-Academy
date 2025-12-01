import { useTranslation } from "react-i18next";
import heroImg from "../assets/images/hero-img.png";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const hero = t("hero", { returnObjects: true });

  return (
    <section className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* TEXT SIDE */}
          <div className="flex flex-col gap-6 lg:gap-10  lg:order-1 text-center lg:text-start">
            <span className="text-main text-lg md:text-xl font-medium">
              {hero.subTitle}
            </span>

            <h1 className="text-3xl md:text-5xl font-semibold leading-17">
              {i18n.language === "ar" ? (
                <>
                  تعلم الان من <br />
                  اى مكان وابنى <br />
                  <span className="text-main">مستقبلك المشرق</span>
                </>
              ) : (
                <>
                  Now learning from <br />
                  anywhere, and <br />
                  build your <span className="text-main">bright career.</span>
                </>
              )}
            </h1>

            <p className="text-gray max-w-md mx-auto lg:mx-0 text-base md:text-lg">
              {hero.desc}
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="btn1">{hero.btn}</button>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className=" lg:order-2 flex items-start h-screen">
            <img src={heroImg} alt="Hero" className="w-full  object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
