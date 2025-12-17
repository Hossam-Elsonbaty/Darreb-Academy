import React from "react";

import { CiCalendar, CiClock1, CiHeart } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { Rating } from "@mui/material";
import profile1 from "../../assets/images/author-02.jpg";
import { useLanguage } from "../../hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
const profileImages = [
  profile1,
];

const CourseCard = ({ c, status }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
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
      <div className="absolute flex gap-2 flex-col right-4 ">
        <button className="bg-[#eefbf3] rounded shadow-lg p-1"><IoMdHeartEmpty className="text-2xl text-[#309255]"/></button>
        <button  className="bg-[#eefbf3] rounded shadow-lg p-1"><LuShoppingCart className="text-2xl text-[#309255]"/></button>
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
          <span className="text-gray-700 font-medium">{c.instructor?.fullName}</span>
        </div>
        <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-lg">
          {c.category?.name?c.category?.name:lang === "en" ? "All":"جميع الفئات"}
        </span>
      </div>
      <h3 className="mt-4 text-gray-800 font-semibold text-lg leading-snug transition-colors duration-300 group-hover:text-green-700">
        {c.title}
      </h3>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <CiClock1 className="text-[#309255] text-lg" />
              <span>{c.totalDuration  || "8 h 15 mins"}</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <IoBookOutline className="text-[#309255] text-lg" />
              <span>{c.totalLectures} Lectures</span>
            </div>
        </div>
      </div>
      {status !== "news" && (
        <div className="bg-green-50 mt-6 p-4 rounded-xl flex items-center justify-between group-hover:bg-green-100">
          <div>
            <span className="text-green-700 font-bold text-xl">{c.price} EGP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-700">{c.totalRatings}</span>
            <Rating
              value={Number(c.totalRatings)}
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
