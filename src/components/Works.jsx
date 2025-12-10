import React from "react";
import SectionTitle from "../common/dynamic-components/SectionTitle";
import { useLanguage } from "../hooks/useLanguage";
import icon1 from "../assets/images/transparency.png";
import icon2 from "../assets/images/exam.png";
import icon3 from "../assets/images/achieve.png";
import { useTranslation } from "react-i18next";

const Works = () => {
  const { lang } = useLanguage();
  const { t } = useTranslation();

  let work = t("work", { returnObjects: true });
  const workImgs = [icon1, icon2, icon3];
  return (
    <div className="bg-white py-20 px-4 md:px-15 lg:px-30 xl:px-40">
      <SectionTitle
        status="center"
        title={
          lang === "en" ? (
            <h2 className="text-4xl font-medium capitalize text-center">
              how it <span className="text-main">work ?</span>
            </h2>
          ) : (
            <h2 className="text-4xl font-medium text-center">
              كيف <span className="text-main">تعمل ؟</span>
            </h2>
          )
        }
      />

      <div className="py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {work.map((w) => (
          <div className="bg-lightGreen p-4  rounded flex flex-col gap-5 hover:-translate-y-3  shadow-md border-t-0 duration-400 hover:border-t-2 border-main" key={w.id}>
            <img src={workImgs[w.id - 1]} alt="icon" width={50} />
            <h3 className="text-main text-2xl font-medium">{w.title}</h3>
            <p className="text-dark">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
