import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundLoader from "../../assets/lottiFiles/notFound.json";
import { useLanguage } from "../../hooks/useLanguage";

const NotFound = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="flex items-center justify-center flex-col gap-4">
          <div className="w-full max-w-md">
            <Lottie animationData={notFoundLoader} />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {lang === "en" ? "404 - Page Not Found" : "الصفحة غير موجودة"}
            </h1>

            <div className="flex gap-4 justify-center flex-wrap mt-4">
              <Link
                to="/"
                className="py-3 px-8 bg-[#309255] text-white rounded-lg hover:bg-opacity-90 duration-300 inline-block"
              >
                {lang === "en" ? "Go Home" : "العودة للصفحة الرئيسية"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
