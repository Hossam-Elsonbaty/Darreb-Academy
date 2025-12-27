import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../../hooks/useLanguage";

export default function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState();
  useEffect(()=>{
    api.get(`/auth/my-courses`)
    .then((res)=>setPurchasedCourses(res.data.data))
    .catch(err=>console.log(err))
  },[])
  const {lang} = useLanguage()
  return (
    <div className="bg-white border border-gray-300 rounded p-8 ">
      
      <h2 className="text-2xl font-semibold mb-6">
        {lang === "en" ? "Purchased Courses" : "الدورات المشتراة"}
      </h2>

      {/* CARDS */}
      <div className="flex flex-wrap gap-6">

        {purchasedCourses?.length > 0 ?purchasedCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition min-w-80 p-2"
          >
            {/* Image */}
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-contain"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500">
                {course.instructor.fullName}
              </p>
            </div>
            <NavLink className="p-2  text-sm rounded-lg text-white bg-[#309255] text-center" to={`/watch-course/${course._id}`}>{lang === "en" ? "Watch Now" : "شاهد الأن"}</NavLink>
          </div>
        )):
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-2xl text-[#575757]">{lang === "en" ? "You haven't purchased any course yet" : "لم تشترِ أي كورس بعد"}</h1>
          <NavLink to="/courses" className="bg-[#309255] p-4 rounded-lg text-lg text-white">{lang === "en" ? "Browse Our Courses" : "تصفح دوراتنا"}</NavLink>
        </div>
        }
      </div>

    </div>
  );
}
