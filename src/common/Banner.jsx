import { useTranslation } from "react-i18next";
import googlePlay from "../assets/images/google-play.png";
import appstore from "../assets/images/app-store.png";
import shape14 from "../assets/images/shape14.webp";

const Banner = () => {
  const {  i18n } = useTranslation();
  return (
        <section className="bg-main text-white py-20 px-10 flex lg:flex-row flex-col relative overflow-hidden">
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
                <h1 className="text-3xl font-medium">
                  لبدء هذه الدورة بسهولة.
                </h1>
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
  );
};

export default Banner;
