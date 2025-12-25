import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { NavLink } from "react-router-dom";

export default function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState();
  useEffect(()=>{
    api.get(`/auth/my-courses`)
    .then((res)=>setPurchasedCourses(res.data.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div className="bg-white border border-gray-300 rounded p-8 ">
      
      <h2 className="text-2xl font-semibold mb-6">
        Purchased Courses
      </h2>

      {/* CARDS */}
      <div className="flex flex-wrap gap-6">

        {purchasedCourses?.length > 0 ?purchasedCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover"
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
          </div>
        )):
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-2xl text-[#575757]">You haven't purchased any course yet</h1>
          <NavLink to="/courses" className="bg-[#309255] p-4 rounded-lg text-lg text-white">Browse Our Courses</NavLink>
        </div>
        }
      </div>

    </div>
  );
}
