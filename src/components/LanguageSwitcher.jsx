import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const dropDownRef = useRef();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    document.body.style.fontFamily =
      lang === "ar" ? "Cairo" : "Montserrat Variable";
    toggleDropdown();
  };

  const toggleDropdown = () => {
    dropDownRef.current.classList.toggle("scale-y-100");
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <FaGlobe className="cursor-pointer text-main text-xl mt-1.5 me-2" />
      </button>

      <div
        ref={dropDownRef}
        className="origin-top scale-y-0 shadow-sm p-3 flex flex-col w-[120px] absolute -start-12 top-8 gap-1 duration-500 overflow-hidden z-30"
      >
        <button
          className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
          onClick={() => changeLang("en")}
        >
          English
        </button>
        <button
          className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
          onClick={() => changeLang("ar")}
        >
          العربية
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;

