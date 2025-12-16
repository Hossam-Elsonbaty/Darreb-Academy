import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";

const CourseCate = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const links = t("enroll.links", { returnObjects: true });
  const content = t("enroll.content", { returnObjects: true });
  
  const [active, setActive] = useState(links[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update active state when language changes
  useEffect(() => {
    setActive(links[0]);
  }, [lang]);

  const handleContent = (linkName) => {
    if (linkName !== active) {
      setIsAnimating(true);
      setTimeout(() => {
        setActive(linkName);
        setIsAnimating(false);
      }, 150);
    }
  };


  const currentContent = content.find((c) => c.role === active);

  return (
    <div className="w-full">
      {/* Buttons Section */}
      <div className="bg-[#eefbf3] p-6 rounded-lg gap-3 flex items-center flex-wrap shadow-sm">
        {links.map((link, index) => (
          <button
            onClick={() => handleContent(link)}
            key={link}
            className={`
              px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 font-medium text-base
              relative overflow-hidden
              ${
                active === link
                  ? "bg-[#309255] text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-main hover:text-[#309255] hover:shadow-md"
              }
            `}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {/* Active indicator */}
            {active === link && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-50"></span>
            )}
            {link}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-6 border-2 border-main rounded-lg overflow-hidden shadow-sm">
        <div
          className={`
            p-6 bg-white transition-all duration-300
            ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
          `}
        >
          {currentContent ? (
            <div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-[#309255] mb-4 pb-3 border-b-2 border-gray-100">
                {active}
              </h3>
              
              {/* Content */}
              <div className="text-gray-700 text-lg leading-relaxed">
                {currentContent.title}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <svg
                className="w-16 h-16 mx-auto mb-3 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg">No content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCate;