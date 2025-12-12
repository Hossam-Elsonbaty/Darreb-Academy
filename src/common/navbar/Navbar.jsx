import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

import logoImg from "../../assets/images/logo.webp";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { t } = useTranslation();
  const navLinks = t("links", { returnObjects: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
    py-7 px-4 z-50 transition-all duration-300 w-[90%] mx-auto
    ${
      isScrolled
        ? "fixed top-0 left-0 w-full shadow-md bg-white border-0 rounded-none"
        : "border border-main rounded-md sticky top-8 bg-lightGreen"
    }
  `}
    >
      <div className="flex justify-between items-center">
        {/* left side */}
        <div>
          <Link to="/">
            <img src={logoImg} alt="logo" />
          </Link>
        </div>

        {/* center side links */}
        <div className="hidden lg:flex gap-5 items-center text-lg activeLink">
          <NavLink to="/" className="relative  hover:text-main duration-400">
            {t(navLinks[0])}
          </NavLink>
          <div className="relative group">
            <Link className="hover:text-main duration-400 cursor-pointer py-5">
              {t(navLinks[1])}
            </Link>

            <div
              className="
      absolute 
      top-20 
      opacity-0 
      invisible
      group-hover:opacity-100
      group-hover:visible
      group-hover:top-11
      transition-all 
      duration-300
      w-[170px] 
      start-0 
      flex 
      flex-col 
      bg-white 
      shadow 
      p-3 
      border-t-2 
      gap-2
      pointer-events-none
      group-hover:pointer-events-auto
  "
            >
              <NavLink
                to="/about"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[7])}
              </NavLink>

              <NavLink
                to="/coursesDetails"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[8])}
              </NavLink>
            </div>
          </div>
          <div className="relative group">
            <Link className="hover:text-main duration-400 cursor-pointer py-5">
              {t(navLinks[2])}
            </Link>

            <div
              className="
      absolute 
      top-20 
      opacity-0 
      invisible
      group-hover:opacity-100
      group-hover:visible
      group-hover:top-11
      transition-all 
      duration-300
      w-[170px] 
      start-0 
      flex 
      flex-col 
      bg-white 
      shadow 
      p-3 
      border-t-2 
      gap-2
      pointer-events-none
      group-hover:pointer-events-auto
  "
            >
              <NavLink
                to="/about"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[9])}
              </NavLink>

              <NavLink
                to="/signup"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[10])}
              </NavLink>

              <NavLink
                to="/signin"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[11])}
              </NavLink>

              <NavLink
                to="/faq"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[12])}
              </NavLink>

              <NavLink
                to="/404"
                className="hover:text-main hover:ps-1 duration-300"
              >
                {t(navLinks[13])}
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/blogs"
            className="relative  hover:text-main duration-400"
          >
            {t(navLinks[3])}
          </NavLink>

          <NavLink
            to="/contact"
            className="relative  hover:text-main duration-400"
          >
            {t(navLinks[4])}
          </NavLink>

        </div>


        {/* right side login buttons*/}
        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex gap-3 items-center text-lg">
            <NavLink
              to="/signup"
              className="relative  hover:text-main duration-400"
            >
              {t(navLinks[5])}
            </NavLink>

            <Link
              to="/signin"
              className="py-3 px-7 bg-white rounded text-dark border-1 border-main hover:bg-main hover:text-white duration-400"
            >
              {t(navLinks[6])}
            </Link>
          </div>
          <LanguageSwitcher />
          {/* MOBILE MENU ICON */}
          <button
            className="lg:hidden text-3xl cursor-pointer text-main"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Responsive and mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-6 flex flex-col gap-4 text-lg">
          <NavLink
            to="/"
            className="hover:text-main duration-300"
            onClick={() => setMobileOpen(false)}
          >
            {t(navLinks[0])}
          </NavLink>

          {/* Mobile Dropdown 1 */}
          <div>
            <button
              onClick={() => setDropdown1(!dropdown1)}
              className="w-full text-start hover:text-main duration-300"
            >
              {t(navLinks[1])}
            </button>
            {dropdown1 && (
              <div className="flex flex-col ps-3 mt-2 gap-2">
                <NavLink
                  to="/about"
                  className="ps-3 hover:text-main duration-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[7])}
                </NavLink>
                <NavLink
                  to="/coursesdetails"
                  className="ps-3 hover:text-main duration-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[8])}
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Dropdown 2 */}
          <div>
            <button
              onClick={() => setDropdown2(!dropdown2)}
              className="w-full text-start hover:text-main duration-300"
            >
              {t(navLinks[2])}
            </button>
            {dropdown2 && (
              <div className="flex flex-col ps-3 mt-2 gap-2">
                <NavLink
                  to="/about"
                  className="hover:text-main ps-3 duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[9])}
                </NavLink>

                <NavLink
                  to="/signup"
                  className="hover:text-main ps-3 duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[10])}
                </NavLink>

                <NavLink
                  to="/signin"
                  className="hover:text-main ps-3 duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[11])}
                </NavLink>

                <NavLink
                  to="/faq"
                  className="hover:text-main ps-3 duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[12])}
                </NavLink>

                <NavLink
                  to="/404"
                  className="hover:text-main ps-3 duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navLinks[13])}
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/blogs" onClick={() => setMobileOpen(false)}>
            {t(navLinks[3])}
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
            {t(navLinks[4])}
          </NavLink>

          <NavLink to="/signin" onClick={() => setMobileOpen(false)}>
            {t(navLinks[5])}
          </NavLink>

          <Link
            to="/signup"
            className="py-3 px-7 border border-main rounded hover:bg-main hover:text-white duration-300"
            onClick={() => setMobileOpen(false)}
          >
            {t(navLinks[6])}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
