import { useTranslation } from "react-i18next";
import SectionTitle from "../common/dynamic-components/SectionTitle";
import { useLanguage } from "../hooks/useLanguage";
import CourseCard from "../common/dynamic-components/CourseCard";

const News = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const news = t("news", { returnObjects: true });
  return (
    <div className="py-20 px-4 md:px-15 lg:px-30 xl:px-40 bg-white">
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

      {/* Cards */}
      <div className="mt-25 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {news.map((c) => (
          <div key={c.id}>
            <CourseCard c={c} status="news" />
       
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
