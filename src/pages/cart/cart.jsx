import { FiTrash2 } from "react-icons/fi";
import i18n from "../../i18n";
import course1 from "../../assets/images/courses-01.jpg";
import course2 from "../../assets/images/courses-02.jpg";
import course3 from "../../assets/images/courses-03.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Cart = () => {
  const cartItems = [
    {
      id: 1,
      title: {
        en: "AI Engineer Core Track: LLM Engineering",
        ar: "مسار مهندس الذكاء الاصطناعي الأساسي: هندسة النماذج اللغوية الكبيرة",
      },
      author: {
        en: "By Ligency",
        ar: "بواسطة Ligency",
      },
      rating: 4.7,
      reviews: "23,169",
      hours: {
        en: "58.5 total hours",
        ar: "58.5 ساعة إجمالية",
      },
      lectures: {
        en: "432 lectures",
        ar: "432 محاضرة",
      },
      level: {
        en: "All Levels",
        ar: "جميع المستويات",
      },
      price: 379.99,
      image: course1,
    },
    {
      id: 2,
      title: {
        en: "AI Engineer MLOps Track",
        ar: "مسار مهندس الذكاء الاصطناعي MLOps",
      },
      author: {
        en: "By Ligency",
        ar: "بواسطة Ligency",
      },
      rating: 4.8,
      reviews: "1,251",
      hours: {
        en: "18.5 total hours",
        ar: "18.5 ساعة إجمالية",
      },
      lectures: {
        en: "122 lectures",
        ar: "122 محاضرة",
      },
      level: {
        en: "All Levels",
        ar: "جميع المستويات",
      },
      price: 379.99,
      image: course3,
    },
    {
      id: 3,
      title: {
        en: "AI Engineer Agentic Track",
        ar: "مسار مهندس الذكاء الاصطناعي الوكلي",
      },
      author: {
        en: "By Ed Donner",
        ar: "بواسطة Ed Donner",
      },
      rating: 4.7,
      reviews: "23,871",
      hours: {
        en: "17 total hours",
        ar: "17 ساعة إجمالية",
      },
      lectures: {
        en: "129 lectures",
        ar: "129 محاضرة",
      },
      level: {
        en: "Intermediate",
        ar: "متوسط",
      },
      price: 379.99,
      image: course2,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
 const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const moveToWishlist = (item) => {
    const newWishlist = [...wishlist, item];
    setWishlist(newWishlist);
    navigate("/wishlist", { state: { wishlist: newWishlist } });
  };

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">
        {i18n.language === "ar" ? <>عربةالتسوق</> : <>Shopping Cart</>}
      </h1>
      <p className="text-gray-500 mb-8">
        {cartItems.length}
        {i18n.language === "ar" ? (
          <>دورات في عربة التسوق</>
        ) : (
          <> Courses in Cart</>
        )}
      </p>

      <div className="flex flex-col gap-10">
        {/* CART ITEMS */}
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b py-6">
              <img
                src={item.image}
                alt={item.title.en}
                className="w-40 h-24 object-cover"
              />

              <div className="flex-1">
                {i18n.language === "ar" ? (
                  <>
                    <h2 className="font-bold">{item.title.ar}</h2>
                    <p className="text-sm text-gray-500">{item.author.ar}</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold">{item.title.en}</h2>
                    <p className="text-sm text-gray-500">{item.author.en}</p>
                  </>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-gray-500">({item.reviews})</span>
                </div>
                {i18n.language === "ar" ? (
                  <p className="text-sm text-gray-500">
                    {item.hours.ar} • {item.lectures.ar} • {item.level.ar}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">
                      {item.hours.en} • {item.lectures.en} • {item.level.en}
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col items-end gap-3">
                <button className="text-red-500 text-sm flex items-center gap-1 cursor-pointer hover:text-red-600">
                  <FiTrash2 />
                  {i18n.language === "ar" ? <>إزالة</> : <>Remove</>}
                </button>
                <button className="text-green-500 text-sm flex items-center gap-1 hover:text-green-700 cursor-pointer"
                  onClick={() => moveToWishlist(item)}>
                  {i18n.language === "ar" ? <>إزالة</> : <>Move To Wishlist</>}
                </button>
                <span className="font-bold text-lg">£E{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        {/* TOTAL & CHECKOUT */}
        <div className="w-full  pt-6 flex flex-col items-start gap-4">
          <div className="text-left">
            <p className="text-gray-500">
              {i18n.language === "ar" ? <>المجموع:</> : <>Total:</>}
            </p>
            <h2 className="text-3xl font-bold">£E{total.toFixed(2)}</h2>
          </div>

          <button className="w-full  bg-green-500 text-white py-3 font-semibold hover:bg-green-700 duration-300">
            {i18n.language === "ar" ? (
              <>المتابعة إلى الدفع </>
            ) : (
              <>Proceed to Checkout →</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
