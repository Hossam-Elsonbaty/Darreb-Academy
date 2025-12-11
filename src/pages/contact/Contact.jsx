import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";

const Contact = () => {
  return (
    <div className="px-4 md:px-15 lg:px-30 xl:px-40">
      <DynamicHero
        links={{
          en: ["Home", "Contact"],

          ar: ["الرئيسية", " تواصل معنا"],
        }}
        authorImg={authorImg}
      />
    </div>
  );
};

export default Contact;
