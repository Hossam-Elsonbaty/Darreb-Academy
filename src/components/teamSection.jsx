// src/components/TeamSection.jsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import shape3 from "../assets/images/shape3.png"
import author01 from "../assets/images/author-01.jpg";
import author02 from "../assets/images/author-02.jpg";
import author04 from "../assets/images/author-04.jpg";
import author05 from "../assets/images/author-05.jpg";
import author06 from "../assets/images/author-06.jpg";
import author07 from "../assets/images/author-07.jpg";
import author03 from "../assets/images/author03.jpg";
import { useTranslation } from "react-i18next";

const teamMembers = [
  {
  name: { en: "Alice Johnson", ar: "أليس جونسون" },
    role: { en: "Project Manager", ar: "مدير المشروع" },
    imageUrl: author01,
    rating: 4.9,
  },
  {
    name: { en: "Mohamed Ali", ar: "محمد علي" },
    role: { en: "Frontend Developer", ar: "مطور الواجهة الأمامية" },
    imageUrl: author02,
    rating: 4.5,
  },
  {
       name: { en: "Sara Hassan", ar: "سارة حسن" },
    role: { en: "UI/UX Designer", ar: "مصمم واجهات وتجربة المستخدم" },
    imageUrl: author04,
    rating: 5,
  },
  {
       name: { en: "Sara Hassan", ar: "سارة حسن" },
    role: { en: "UI/UX Designer", ar: "مصمم واجهات وتجربة المستخدم" },
    imageUrl: author03,
    rating: 2,
  },
  {
     name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
    role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
    imageUrl: author05,
    rating: 4.2,
  },
  {
     name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
    role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
    imageUrl: author06,
    rating: 3,
  },
  {
     name: { en: "Omar Ibrahim", ar: "عمر إبراهيم" },
    role: { en: "Backend Developer", ar: "مطور الواجهة الخلفية" },
    imageUrl: author07,
    rating: 3.5,
  },
  {
  name: { en: "Alice Johnson", ar: "أليس جونسون" },
    role: { en: "Project Manager", ar: "مدير المشروع" },
    imageUrl: author01,
    rating: 4.1,
  },
];

function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating); // full stars
  const halfStar = rating - fullStars >= 0.5; // half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++)
    stars.push(<FaStar key={"full" + i} className="text-yellow-400" />);
  if (halfStar)
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  for (let i = 0; i < emptyStars; i++)
    stars.push(<FaRegStar key={"empty" + i} className="text-gray-300" />);

  return stars;
}
export default function TeamSection() {
  const { i18n } = useTranslation();
  return (
    <section className="bg-white py-16">
  <div className="container mx-auto px-4">
    {i18n.language === "ar" ? (
                      <>    <h2 className="text-xl text-center mb-8 text-[#309255]">فريق العمل</h2>
<h1 className="text-3xl mb-8 font-bold text-center">
  مدربو Edule {" "}
  <span className="relative inline-block  text-[#309255]">
    المهرة
    <img
      src={shape3}
      alt=""
      className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
    />
  </span>
</h1></>
                    ) : (<>
                        <h2 className="text-xl text-center mb-8 text-[#309255]">Team Member's</h2>
<h1 className="text-3xl mb-8 font-bold text-center">
  Edule Skilled{" "}
  <span className="relative inline-block  text-[#309255]">
    Instructor
    <img
      src={shape3}
      alt=""
      className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20"
    />
  </span>
</h1></>)}



    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, idx) => (
        <div
          key={idx}
          className="    p-6 flex flex-col items-center"
        >
          {/* Image with hover border change */}
          <div className="rounded-full border border-lightGreen p-2 transition-all duration-300 hover:border-main">
  <img
    src={member.imageUrl}
    alt={member.name}
    className="w-24 h-24 rounded-full object-cover transition-all duration-300 hover:scale-105"
  />
</div>


          {/* Rating */}
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex">{renderStars(member.rating)}</div>
            <span className="text-gray-600 font-medium">
              {member.rating.toFixed(1)}
            </span>
          </div>
          {i18n.language === "ar"?(<>
               <h3 className="text-xl font-semibold">{member.name.ar}</h3>
          <p className="text-[#309255]">{member.role.ar}</p></>):(<>
               <h3 className="text-xl font-semibold">{member.name.en}</h3>
          <p className="text-[#309255]">{member.role.en}</p></>)}
     
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
