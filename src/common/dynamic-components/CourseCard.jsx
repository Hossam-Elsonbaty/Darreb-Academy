import React, { useState } from "react";

import { CiCalendar, CiClock1, CiHeart } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { Rating } from "@mui/material";
import profile1 from "../../assets/images/author-02.jpg";
import { useLanguage } from "../../hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useContext } from "react";
import ToasterContext from "../../context/ToasterContext";
// import api from "../../api/axios";
const profileImages = [profile1];

const CourseCard = ({ c, status }) => {
  const { addToCart, cartItems, isCartLoading } = useCart();
  const isInCart = Array.isArray(cartItems?.items) && cartItems.items.some((item) => item.course?._id === c._id);
  const userData = JSON.parse(localStorage.getItem('userData'))
  const isPurchased = userData?.purchasedCourses.some((item) => item === c._id)
  const [isAdding, setIsAdding] = useState(false);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const {setShowModal, setModalType, setModalMessage} = useContext(ToasterContext);
  const token = localStorage.getItem('token');
  const isInWishlist = wishlist.some((item) => item.course._id === c._id);
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    console.log(isInCart);
    // if(!token){
    //   setModalType("error");
    //   setModalMessage(
    //     lang === "en"
    //       ? "Please sign in first"
    //       : "من فضلك قم بتسجيل الدخول اولا"
    //   );
    //   setShowModal(true);
    //   return;
    // }
    // if (isInCart){
    //   setModalType("error");
    //   setModalMessage(
    //     lang === "en"
    //       ? "Course already in cart"
    //       : "لقد قمت بإضافة هذه الدوره إلى العربه من قبل"
    //   );
    //   setShowModal(true);
    //   return;
    // };
    // if (isPurchased ){
    //   setModalType("error");
    //   setModalMessage(
    //     lang === "en"
    //     ? "Course already purchased"
    //     : "لقد قمت بشراء هذه الدوره من قبل"
    //   );
    //   setShowModal(true);
    //   return;
    // };
    setIsAdding(true);
    try {
      await addToCart(c);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    try {
      await toggleWishlist(c);
      navigate("/wishlist");
    } catch (err) {
      console.log("Wishlist error:", err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/courses/${c._id}`)}
      className="cursor-pointer"
    >
      <div
        className=" bg-white border border-green-300 rounded-2xl p-5 shadow-sm 
          transition-all duration-500 
          hover:shadow-2xl hover:scale-[1.01] hover:border-green-500
          group relative"
      >
        <div className="absolute flex gap-2 flex-col right-4 z-10 ">
          <button
            onClick={handleWishlistToggle}
            className="bg-[#eefbf3] rounded shadow-lg p-1 cursor-pointer"
          >
            {isInWishlist ? (
              <IoMdHeart className="text-2xl text-red-500" />
            ) : (
              <IoMdHeartEmpty className="text-2xl text-[#309255]" />
            )}
          </button>

          <button
            disabled={isInCart || isCartLoading || isAdding}
            className="bg-[#eefbf3] rounded shadow-lg p-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Cart clicked");
              handleAddToCart(e);
            }}
          >
            <LuShoppingCart className="text-2xl text-[#309255]" />
          </button>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            src={c.thumbnail}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
            alt={c.title}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <img
              src={profileImages[0]}
              className="w-10 h-10 rounded-full"
              alt="Author"
            />
            <span className="text-gray-700 font-medium">
              {c.instructor?.fullName}
            </span>
          </div>
          <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-lg">
            {/* {c.category?.name
              ? c.category?.name
              : lang === "en"
              ? "All"
              : "جميع الفئات"} */}
              {lang==="en"?(c.category?.name? c.category?.name:"All"):(c.category?.name_ar?c.category?.name_ar:"جميع الفئات")}
          </span>
        </div>
        <h3 className="mt-4 text-gray-800 font-semibold text-lg leading-snug transition-colors duration-300 group-hover:text-green-700">
          {lang==="en"?c.title:c.title_ar}
        </h3>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <CiClock1 className="text-[#309255] text-lg" />
              <span>{c.totalDuration || "8 h 15 mins"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <IoBookOutline className="text-[#309255] text-lg" />
              <span>{lang==="en"?`${c.totalLectures} Lectures`:`محاضرات ${c.totalLectures} `}</span>
            </div>
          </div>
        </div>
        {status !== "news" && (
          <div className="bg-green-50 mt-6 p-4 rounded-xl flex items-center justify-between group-hover:bg-green-100">
            <div>
              <span className="text-green-700 font-bold text-xl">
                {c.price} EGP
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-700">
                {c.totalRatings}
              </span>
              <Rating
                value={Number(c.rating || 0)}
                precision={0.1}
                readOnly
                size="small"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
