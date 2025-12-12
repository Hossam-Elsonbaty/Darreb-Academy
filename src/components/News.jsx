import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";

const News = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  return (
    <div>
      <p className="text-main mb-5 text-center font-medium text-2xl">
        {lang === "en" ? "Latest News" : "اخر الاخبار"}
      </p>
      <SectionTitle
        status="center"
        title={
          lang === "en" ? (
            <h2 className="text-4xl font-medium capitalize text-center">
              Educational Tips & <span className="text-main">Tricks</span>
            </h2>
          ) : (
            <h2 className="text-4xl font-medium text-center">
              نصائح تعليمية <span className="text-main">و حيل</span>
            </h2>
          )
        }
      />
    </div>
  );
};

export default News;
