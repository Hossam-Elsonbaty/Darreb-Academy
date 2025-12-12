import React from "react";

import { CiCalendar, CiClock1, CiHeart } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { Rating } from "@mui/material";
import courseImg1 from "../../assets/images/courses-01.jpg";
import courseImg2 from "../../assets/images/courses-02.jpg";
import courseImg3 from "../../assets/images/courses-03.jpg";
import courseImg4 from "../../assets/images/courses-04.jpg";
import courseImg5 from "../../assets/images/courses-05.jpg";
import courseImg6 from "../../assets/images/courses-06.jpg";
import profile1 from "../../assets/images/author-01.jpg";
import profile2 from "../../assets/images/author-02.jpg";
import profile3 from "../../assets/images/author03.jpg";
import profile4 from "../../assets/images/author-04.jpg";
import profile5 from "../../assets/images/author-05.jpg";
import profile6 from "../../assets/images/author-06.jpg";
import { useLanguage } from "../../hooks/useLanguage";

const coursesImages = [
  courseImg1,
  courseImg2,
  courseImg3,
  courseImg4,
  courseImg5,
  courseImg6,
];
const profileImages = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
];

const CourseCard = ({ c, status }) => {
  const { lang } = useLanguage();
  return (
    <div
      className=" bg-white border border-green-300 rounded-2xl p-5 shadow-sm 
  transition-all duration-500 
  hover:shadow-2xl hover:scale-[1.01] hover:border-green-500
  group"
    >
      <div className="rounded-xl overflow-hidden">
        <img
          src={coursesImages[Math.floor(Math.random() * 6)]}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
          alt={c.title}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <img
            src={profileImages[Math.floor(Math.random() * 6)]}
            className="w-10 h-10 rounded-full"
            alt="Author"
          />
          <span className="text-gray-700 font-medium">{c.instructor}</span>
        </div>

        <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-lg">
          {c.category}
        </span>
      </div>

      <h3 className="mt-4 text-gray-800 font-semibold text-lg leading-snug transition-colors duration-300 group-hover:text-green-700">
        {c.title}
      </h3>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          {status === "news" ? (
            <div className="flex gap-1">
              <CiCalendar className="text-main text-lg" />
              <span>21 March, 2021</span>
            </div>
          ) : (
            <div className="flex gap-1">
              <CiClock1 className="text-main text-lg" />
              <span>{c.time}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status === "news" ? (
            <div className="flex gap-1">
              <CiHeart className="text-main text-lg" />
              <span>2,568+</span>
            </div>
          ) : (
            <div className="flex gap-1">
              <IoBookOutline className="text-main text-lg" />
              <span>{c.lectures}</span>
            </div>
          )}
        </div>
      </div>

      {status !== "news" && (
        <div className="bg-green-50 mt-6 p-4 rounded-xl flex items-center justify-between group-hover:bg-green-100">
          <div>
            <span className="text-green-700 font-bold text-xl">$385.00</span>
            <span className="line-through text-gray-400 ml-2">$440.00</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-700">4.9</span>
            <Rating
              value={Number(c.rating)}
              precision={0.1}
              readOnly
              size="small"
            />
          </div>
        </div>
      )}

      {status === "news" && (
        <button className="btn1 mt-3 px-2 py-1">
          {lang === "en" ? "Read More" : "قراءة المزيد"}
        </button>
      )}
    </div>
  );
};

export default CourseCard;
