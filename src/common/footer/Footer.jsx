import { useTranslation } from "react-i18next";
import shape8 from "../../assets/images/shape8.webp";
import logo from "../../assets/images/logo.webp";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialSkype } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <section className="relative flex flex-col lg:flex-row p-20 bg-lightGreen justify-center gap-40">
        {/* Left Column */}
        <div >
          <img
            src={shape8}
            alt="Shape"
            className="absolute left-24 top-10 w-16 md:w-20 z-0 animate-float-vertical"
          />
          <ul className="space-y-6">
            <img src={logo} alt="logo" />

            <li className="font-medium text-2xl">
              {i18n.language === "ar" ? "شارع الكاريبي" : "Caribbean Ct"}
            </li>

            <li className="text-main font-light">
              {i18n.language === "ar"
                ? "هايماركت، فيرجينيا (VA)"
                : "Haymarket, Virginia (VA)."}
            </li>

            <li className="flex gap-3 items-center">
              <MdOutlineMail className="text-main" />
              <span className="text-gray-500">
                {i18n.language === "ar"
                  ? "address@gmail.com"
                  : "address@gmail.com"}
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <BsTelephone className="text-main" />
              <span className="text-gray-500">
                {i18n.language === "ar" ? "(970) 262-1413" : "(970) 262-1413"}
              </span>
            </li>

            <li className="flex gap-5 li text-2xl text-gray">
              <p>
                <SlSocialFacebook />
              </p>
              <p>
                <TfiTwitter />
              </p>
              <p>
                <SlSocialSkype />
              </p>
              <p>
                <FaInstagram />
              </p>
            </li>
          </ul>
        </div>

        {/* Middle Column - Categories */}
        <div className="">
          <ul className="space-y-5 ul">
            <li className="font-medium text-2xl">
              {i18n.language === "ar" ? "التصنيفات" : "Category"}
            </li>

            <li className="text-gray">
              {i18n.language === "ar"
                ? "الكتابة الإبداعية"
                : "Creative Writing"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "الأفلام والفيديو" : "Film & Video"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "التصميم الجرافيكي" : "Graphic Design"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "تصميم UI/UX" : "UI/UX Design"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "تحليل الأعمال" : "Business Analytics"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "التسويق" : "Marketing"}
            </li>
          </ul>
        </div>

        {/* Right Column - Quick Links */}
        <div className="">
          <ul className="space-y-5 ul">
            <li className="font-medium text-2xl">
              {i18n.language === "ar" ? "روابط سريعة" : "Quick Links"}
            </li>

            <li className="text-gray">
              {i18n.language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "المناقشة" : "Discussion"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar"
                ? "الشروط والأحكام"
                : "Terms & Conditions"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar" ? "دعم العملاء" : "Customer Support"}
            </li>
            <li className="text-gray">
              {i18n.language === "ar"
                ? "الأسئلة الشائعة للدورات"
                : "Course FAQ’s"}
            </li>
          </ul>
        </div>

        {/* Last Column - Subscribe */}
        <div className="max-w-[300px]">
          <ul className="space-y-5">
            <li className="font-medium text-2xl">
              {i18n.language === "ar" ? "اشترك" : "Subscribe"}
            </li>

            <li className="text-gray">
              {i18n.language === "ar"
                ? "لوريم إيبسوم هو ببساطة نص شكلي يُستخدم في صناعة الطباعة والنشر."
                : "Lorem Ipsum has been them an industry printer took a galley make book."}
            </li>

            <input
              placeholder={
                i18n.language === "ar" ? "أدخل بريدك الإلكتروني" : "Email here"
              }
              className="border w-full border-gray-400 rounded-2xl p-3 bg-white"
            />

            <div className="flex justify-center lg:justify-start">
              <button className="btn1">
                {i18n.language === "ar" ? "اشترك الآن" : "Subscribe Now"}
              </button>
            </div>
          </ul>
        </div>
      </section>
      <footer className="bg-dark text-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Left Text */}
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()}
            <span className="text-main font-medium"> Edule </span>
            {i18n.language === "ar"
              ? "جميع الحقوق محفوظة."
              : "All Rights Reserved."}
          </p>

          {/* Footer Links */}
          <ul className="flex gap-5 text-sm md:ml-auto">
            <li className="hover:text-main cursor-pointer">
              {i18n.language === "ar" ? "الخصوصية" : "Privacy"}
            </li>
            <li className="hover:text-main cursor-pointer">
              {i18n.language === "ar" ? "الشروط" : "Terms"}
            </li>
            <li className="hover:text-main cursor-pointer">
              {i18n.language === "ar" ? "الدعم" : "Support"}
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
