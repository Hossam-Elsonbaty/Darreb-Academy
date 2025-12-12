import { useTranslation } from "react-i18next";
import googleApp from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-main py-20 px-4 md:px-15 lg:px-30 xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* right */}
        <div>
          <p className="text-white text-2xl font-medium">{t("banner.desc")}</p>
          <h2 className="mt-4 text-white font-medium  text-3xl max-w-110 leading-12">
            {t("banner.title")}
          </h2>
        </div>
        {/* left */}
        <div className="flex flex-wrap gap-4 items-center justify-end ">
          <button className="w-[180px] h-[60px] cursor-pointer">
            <img
              src={googleApp}
              alt="google app"
              className="w-full h-full object-fill rounded"
            />
          </button>
          <button className="w-[180px] h-[60px] cursor-pointer">
            <img
              src={appStore}
              alt="app store"
              className="w-full h-full object-fill rounded "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
