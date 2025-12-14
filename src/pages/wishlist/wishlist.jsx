import { useLocation } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import i18n from "../../i18n";

const WishlistPage = () => {
  const location = useLocation();
  const wishlist = location.state?.wishlist || []; 

  return (
   <div className="px-20 mx-auto py-10 flex flex-wrap gap-6 justify-start">
  <h1 className="w-full text-3xl font-bold mb-6">
    {i18n.language === "ar" ? "قائمة الرغبات" : "Wishlist"}
  </h1>

  {wishlist.length === 0 ? (
    <p>{i18n.language === "ar" ? "لا توجد منتجات" : "No items"}</p>
  ) : (
    wishlist.map((item) => (
      <div
        key={item.id}
        className="flex flex-col  rounded-lg shadow-md p-4 bg-white hover:shadow-2xl transition-shadow duration-300 w-80"
      >
        <img
          src={item.image}
          alt={i18n.language === "ar" ? item.title.ar : item.title.en}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">
            {i18n.language === "ar" ? item.title.ar : item.title.en}
          </h2>
          <p className="text-sm text-gray-500">
            {i18n.language === "ar" ? item.author.ar : item.author.en}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{item.rating}</span>
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-500">({item.reviews})</span>
          </div>

          <p className="text-sm text-gray-500">
            {i18n.language === "ar" ? item.hours.ar : item.hours.en} •{" "}
            {i18n.language === "ar" ? item.lectures.ar : item.lectures.en} •{" "}
            {i18n.language === "ar" ? item.level.ar : item.level.en}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-lg">£E{item.price}</span>
            {/* <button className="text-purple-600 text-sm flex items-center gap-1">
              <FiTrash2 /> {i18n.language === "ar" ? "حذف" : "Remove"}
            </button> */}
          </div>
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default WishlistPage;
