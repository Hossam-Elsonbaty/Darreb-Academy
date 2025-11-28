import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRef, useState } from "react";
import "./navbar.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../../hooks/useLanguage";

const Navbar = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const links = t("navbar.links", { returnObjects: true });
  const [home, courses, pages, blogs, contact, register, about, login] = links;
  const [open, setOpen] = useState(false);
  const courseRef = useRef();
  const pagesRef = useRef();

  const handleDropDown = (status) => {
    if (status === "courses") {
      courseRef.current.classList.toggle("scale-y-0");
      pagesRef.current.classList.add("scale-y-0");
    } else {
      pagesRef.current.classList.toggle("scale-y-0");
      courseRef.current.classList.add("scale-y-0");
    }
  };

  return (
    <nav className="bg-lightGreen sticky top-0">
      <div className="px-5 md:px-20 py-2 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="logo" width="40" />
            <span className="md:text-2xl text-dark font-semibold">
              {t("navbar.logo")}
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-5 activeLinks">
          <li>
            <NavLink to="/">{home}</NavLink>
          </li>
          <li className="relative">
            <Link
              className="px-3 py-1"
              onClick={() => handleDropDown("courses")}
            >
              {courses}
            </Link>

            <div
              ref={courseRef}
              className="origin-top scale-y-0   shadow-sm p-3 flex flex-col w-[180px] absolute text-start start-0 top-10 gap-1 duration-500 overflow-hidden z-30"
            >
              <Link
                to="/courses"
                className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
              >
                {lang === "ar" ? "الكورسات" : "Courses"}
              </Link>
              <Link
                to="/coursesDetails"
                className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
              >
                {lang === "ar" ? "تفاصيل الكورسات" : "Courses Details"}
              </Link>
            </div>
          </li>
          <li className="relative">
            <Link className="px-3 py-1" onClick={handleDropDown}>
              {pages}
            </Link>
            <div
              ref={pagesRef}
              className="origin-top scale-y-0  shadow-sm p-3 flex flex-col w-[180px] absolute text-start start-0 top-10 gap-1 duration-500 overflow-hidden z-30"
            >
              <Link
                to="/about"
                className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
              >
                {about}
              </Link>
              <Link
                to="/login"
                className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
              >
                {login}
              </Link>
              <Link
                to="/register"
                className="text-dark duration-500 py-1 hover:bg-dark hover:text-white cursor-pointer rounded"
              >
                {register}
              </Link>
            </div>
          </li>
          <li>
            <NavLink to="/blogs">{blogs}</NavLink>
          </li>
          <li>
            <NavLink to="/contact">{contact}</NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="block md:hidden"
          >
            {!open ? (
              <FaBarsStaggered className="text-xl text-main cursor-pointer" />
            ) : (
              <IoClose className="text-2xl text-main cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {/* responsive */}
      {open && (
        <ul className="md:hidden absolute bg-white shadow text-dark w-full py-5 px-4 z-10 flex flex-col gap-3">
          <li>
            <NavLink to="/">{home}</NavLink>
          </li>

          <li>
            <details>
              <summary>{courses}</summary>
              <div className="ps-10 flex flex-col gap-2">
                <Link to="/courses">
                  {lang === "ar" ? "الكورسات" : "Courses"}
                </Link>
                <Link to="/coursesDetails">
                  {lang === "ar" ? "تفاصيل الكورسات" : "Courses Details"}
                </Link>
              </div>
            </details>
          </li>

          <li>
            <details>
              <summary>{pages}</summary>
              <div className="ps-10 flex flex-col">
                <Link to="/about">{about}</Link>
                <Link to="/login">{login}</Link>
                <Link to="/register">{register}</Link>
              </div>
            </details>
          </li>

          <NavLink to="/blogs">{blogs}</NavLink>
          <NavLink to="/contact">{contact}</NavLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
