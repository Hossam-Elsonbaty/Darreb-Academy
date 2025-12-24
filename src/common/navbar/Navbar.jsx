import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logoImg from "../../assets/images/logo.webp";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useLanguage } from "../../hooks/useLanguage";

const Navbar = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const navLinks = t("links", { returnObjects: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const [userMenuOpen, setUserMenuOpen] = useState(false);
const [userData, setUserData] = useState(null);

const isLoggedIn = Boolean(localStorage.getItem("userData"));

useEffect(() => {
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    setUserData(JSON.parse(storedUser));
  }
}, [isLoggedIn]);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData")
  setUserMenuOpen(false);
  window.location.reload();
};

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
        : "border border-main rounded-md sticky top-8 bg-[#eefbf3]"
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
          <NavLink to="/" className="relative  hover:text-[#309255] duration-400">
            {t(navLinks[0])}
          </NavLink>
          <div className="relative group">
            <Link className="hover:text-[#309255] duration-400 cursor-pointer py-5">
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
                to="/courses"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[7])}
              </NavLink>

              <NavLink
                to="/coursesDetails"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[8])}
              </NavLink>
            </div>
          </div>
          <div className="relative group">
            <Link className="hover:text-[#309255] duration-400 cursor-pointer py-5">
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
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[9])}
              </NavLink>

              <NavLink
                to="/enroll"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[14])}
              </NavLink>

              <NavLink
                to="/signup"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[10])}
              </NavLink>

              <NavLink
                to="/signin"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[11])}
              </NavLink>

              <NavLink
                to="/faq"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[12])}
              </NavLink>

              <NavLink
                to="/404"
                className="hover:text-[#309255] hover:ps-1 duration-300"
              >
                {t(navLinks[13])}
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/blogs"
            className="relative  hover:text-[#309255] duration-400"
          >
            {t(navLinks[3])}
          </NavLink>

          <NavLink
            to="/contact"
            className="relative  hover:text-[#309255] duration-400"
          >
            {t(navLinks[4])}
          </NavLink>
          <NavLink
            to="/cart"
            className="relative hover:text-[#309255] duration-400 flex items-center gap-1"
          >
            <FiShoppingCart className="text-xl" />
            {/* <span>Cart</span> */}
            {/* <span className="absolute -top-2 -end-3 bg-[#309255] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span> */}
          </NavLink>
          {/* right side login buttons*/}
          <div className="flex gap-4 items-center">
             {!isLoggedIn ? (
            <div className="hidden lg:flex gap-3 items-center text-lg">
              <NavLink
                to="/signin"
                className="relative  hover:text-[#309255] duration-400"
              >
                {t(navLinks[5])}
              </NavLink>

              <Link
                to="/signup"
                className="py-3 px-7 bg-white rounded text-dark border-1 border-main hover:bg-[#309255] hover:text-white duration-400"
              >
                {t(navLinks[6])}
              </Link>
            </div>
             ):(
              // LOGGED IN
             
           <div className="relative flex items-center md:order-2 space-x-3">
            {isLoggedIn && userData && (
  <button
    type="button"
    onClick={() => setUserMenuOpen(!userMenuOpen)}
    className="flex text-sm rounded-full focus:ring-2 ring-[#309255]"
  >
    <img className="w-12 h-12 rounded-full" src={userData.profilePic} alt={userData.fullName }/>
  </button>)}

  {userMenuOpen && userData && (
    <div className="absolute end-0 top-full mt-2 z-50 w-44 bg-white border rounded shadow-lg border-[#ddd]">
      <div className="px-4 py-3 text-sm border-b border-[#ddd]">
        <span className="block font-medium">{userData.fullName}</span>
        <span className="block text-gray-500 truncate">
         {userData.email}
        </span>
      </div>
      <ul className="p-2 text-sm">
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <NavLink
              to="/user-dashboard"
              className="hover:text-[#309255] duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {t(navLinks[15])}
            </NavLink>
        </li>
       
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer text-red-500" onClick={handleLogout}>
          {lang=="en"?"Sign out":"تسجيل الخروج"}
        </li>
      </ul>
    </div>
  )}
</div>)}

          
            <LanguageSwitcher />
            
            {/* MOBILE MENU ICON */}
            <button
              className="lg:hidden text-3xl cursor-pointer text-[#309255]"
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
              className="hover:text-[#309255] duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {t(navLinks[0])}
            </NavLink>

            {/* Mobile Dropdown 1 */}
            <div>
              <button
                onClick={() => setDropdown1(!dropdown1)}
                className="w-full text-start hover:text-[#309255] duration-300"
              >
                {t(navLinks[1])}
              </button>
              {dropdown1 && (
                <div className="flex flex-col ps-3 mt-2 gap-2">
                  <NavLink
                    to="/about"
                    className="ps-3 hover:text-[#309255] duration-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(navLinks[7])}
                  </NavLink>
                  <NavLink
                    to="/coursesdetails"
                    className="ps-3 hover:text-[#309255] duration-400"
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
                className="w-full text-start hover:text-[#309255] duration-300"
              >
                {t(navLinks[2])}
              </button>
              {dropdown2 && (
                <div className="flex flex-col ps-3 mt-2 gap-2">
                  <NavLink
                    to="/about"
                    className="hover:text-[#309255] ps-3 duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(navLinks[9])}
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="hover:text-[#309255] ps-3 duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(navLinks[10])}
                  </NavLink>

                  <NavLink
                    to="/signin"
                    className="hover:text-[#309255] ps-3 duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(navLinks[11])}
                  </NavLink>

                  <NavLink
                    to="/faq"
                    className="hover:text-[#309255] ps-3 duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(navLinks[12])}
                  </NavLink>

                  <NavLink
                    to="/404"
                    className="hover:text-[#309255] ps-3 duration-300"
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
            <NavLink
              to="/cart"
              className="flex items-center gap-2 hover:text-[#309255]"
              onClick={() => setMobileOpen(false)}
            >
              <FiShoppingCart />
              Cart
            </NavLink>

            <NavLink to="/signin" onClick={() => setMobileOpen(false)}>
              {t(navLinks[5])}
            </NavLink>

            <Link
              to="/signup"
              className="py-3 px-7 border border-main rounded hover:bg-[#309255] hover:text-white duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {t(navLinks[6])}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
