import { FiTrash2 } from "react-icons/fi";
import i18n from "../../i18n";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useCart } from "../../context/CartContext";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
 const { setShowModal, setModalType, setModalMessage } = useCart(); 
  // ================= GET WISHLIST =================
  useEffect(() => {
    const getWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/wishlist", { headers: { Authorization: `Bearer ${token}` } });
        setWishlist(res.data.items || []);
      } catch (error) {
        console.log("Get wishlist error:", error);
      }
    };
    getWishlist();
  }, []);

  // ================= REMOVE FROM WISHLIST =================
  const removeFromWishlist = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

     await api.delete(`/wishlist/${courseId}`, {
  headers: { Authorization: `Bearer ${token}` }
});


      setWishlist((prev) => prev.filter((item) => item.course._id !== courseId));

      // alert(i18n.language === "ar" ? "تم حذف الكورس من المفضلة" : "Course removed from wishlist");
       setModalType("success");
      setModalMessage(
        i18n.language === "ar" ? "تم حذف الكورس من المفضلة" : "Course removed from wishlist"
      );
      setShowModal(true);
    } catch (error) {
      console.log("Remove from wishlist error:", error.response || error);
       setModalType("error");
      setModalMessage(
        i18n.language === "ar"
          ? "حدث خطأ، حاول مرة أخرى"
          : "Something went wrong, try again"
      );
      setShowModal(true);
      // alert(
      //   i18n.language === "ar"
      //     ? "حدث خطأ، حاول مرة أخرى"
      //     : "Something went wrong, try again"
      // );
    }
  };

  return (
    <div className="px-20 mx-auto py-10 flex flex-wrap gap-6 justify-start">
      <h1 className="w-full text-3xl font-bold mb-6">
        {i18n.language === "ar" ? "قائمة الرغبات" : "Wishlist"}
      </h1>

      {wishlist.length === 0 ? (
        <p>{i18n.language === "ar" ? "لا توجد منتجات" : "No items"}</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="flex flex-col rounded-lg shadow-md p-4 bg-white hover:shadow-2xl transition-shadow duration-300 w-80">
            <img
              src={item.course.thumbnail}
              alt={item.course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg">{item.course.title}</h2>
              <p className="text-sm text-gray-500">{item.course.instructor?.fullName}</p>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{item.course.totalRatings}</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-gray-500">({item.course.totalReviews})</span>
              </div>

              <p className="text-sm text-gray-500">
                {item.course.totalDuration} • {item.course.totalLectures} • {item.course.level}
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-lg">£E{item.course.price}</span>

                <button
                  className="text-red-500 text-sm flex items-center gap-1"
                  onClick={() => removeFromWishlist(item.course._id)}
                >
                  <FiTrash2 /> {i18n.language === "ar" ? "حذف" : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistPage;
