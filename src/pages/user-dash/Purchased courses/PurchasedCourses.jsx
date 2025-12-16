export default function PurchasedCourses() {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      instructor: "Ahmed Salah",
      image: "https://picsum.photos/400/250?1",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Mohamed Ali",
      image: "https://picsum.photos/400/250?2",
    },
    {
      id: 3,
      title: "HTML & CSS Mastery",
      instructor: "Sara Hassan",
      image: "https://picsum.photos/400/250?3",
    },
    {
      id: 4,
      title: "Python for Beginners",
      instructor: "Ahmed Salah",
      image: "https://picsum.photos/400/250?4",
    },
    {
      id: 5,
      title: "React for Beginners",
      instructor: "Ahmed Salah",
      image: "https://picsum.photos/400/250?5",
    },
    {
      id: 6,
      title: "Advanced JavaScript",
      instructor: "Mohamed Ali",
      image: "https://picsum.photos/400/250?6",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded p-8 ">
      
      <h2 className="text-2xl font-semibold mb-6">
        Purchased Courses
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500">
                {course.instructor}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
