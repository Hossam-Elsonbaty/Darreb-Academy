import { FiTrash2 } from "react-icons/fi";
import i18n from "../../i18n";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
  const makePayment = async()=> {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    const body = {
      products:cartItems.items
    }
    try 
      {
        const response = await api.post('/payment/create-checkout-session', body);
        window.location.href = response.data.url;
      } 
    catch (error) {
      console.error("Error in payment checkout:", error.response ? error.response.data : error.message);
    }
  }
  const { setShowModal, setModalType, setModalMessage } = useCart(); 
  const {  toggleWishlist } = useWishlist();

  // ================= GET CART =================
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await api.get("/cart");

        console.log("FULL CART RESPONSE:", res.data);
        setCartItems(res.data || []);
      } catch (error) {
        console.log("Get cart error:", error);
      }
    };

    getCart();
  }, [cartItems]);

  // ================= TOTAL =================
  // const total = (cartItems || []).reduce(
  //   (sum, item) => sum + (item.course.price || 0),
  //   0
  // );

  // ================= REMOVE FROM CART =================
  const removeFromCart = async (courseId) => {
    console.log(courseId);
    
    try {
      const res = await api.delete(`/cart/${courseId}`);
      console.log(res.data)
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 // ================= MOVE TO WISHLIST =================
  const moveToWishlist = async (course) => {
    try {
      await toggleWishlist(course);
      await removeFromCart(course._id);

      setModalType("success");
      setModalMessage(
        i18n.language === "ar"
          ? "تم نقل الكورس للمفضلة"
          : "Course moved to wishlist"
      );
      setShowModal(true);

      navigate("/wishlist");
    } catch (error) {
      console.log(error);
      setModalType("error");
      setModalMessage(
        i18n.language === "ar"
          ? "حدث خطأ، حاول مرة أخرى"
          : "Something went wrong, try again"
      );
      setShowModal(true);
    }
  };

 

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">
        {i18n.language === "ar" ? "عربة التسوق" : "Shopping Cart"}
      </h1>

      <p className="text-gray-500 mb-8">
        {cartItems.items?.length || 0}{" "}
        {i18n.language === "ar" ? "دورات في عربة التسوق" : "Courses in Cart"}
      </p>

      <div className="flex flex-col gap-10">
        {/* CART ITEMS */}
        <div>
          {cartItems?.items&&cartItems?.items.map((item) => (
            <div key={item._id} className="flex gap-4 border-b py-6">
              <img
                src={item.course.thumbnail || ""}
                alt={item.course.title || ""}
                className="w-40 h-24 object-cover"
              />

              <div className="flex-1">
                <h2 className="font-bold">{item.course.title || ""}</h2>

                <p className="text-sm text-gray-500">
                  {item.course.instructor?.fullName || ""}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {item.course.totalRatings || 0}
                  </span>
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-gray-500">
                    ({item.course.totalRatings || 0})
                  </span>
                </div>

                {/* <p className="text-sm text-gray-500">
                  {`${item.course?.totalDuration || ""} • ${
                    item.course?.totalLectures || ""
                  } Lectures`}
                </p> */}
              </div>

              <div className="flex flex-col items-end gap-3">
                <button
                  className="text-red-500 text-sm flex items-center gap-1"
                  onClick={() => removeFromCart(item.course._id)}
                >
                  <FiTrash2 />
                  {i18n.language === "ar" ? "إزالة" : "Remove"}
                </button>

                <button
                  className="text-green-500 text-sm"
                  onClick={() => moveToWishlist(item.course)}
                >
                  {i18n.language === "ar" ? "نقل للمفضلة" : "Move To Wishlist"}
                </button>

                <span className="font-bold text-lg">
                  £E{item.course?.price || 0}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL & CHECKOUT */}
        <div className="pt-6 flex flex-col gap-4">
          <div>
            <p className="text-gray-500">
              {i18n.language === "ar" ? "المجموع:" : "Total:"}
            </p>
            <h2 className="text-3xl font-bold">£E{cartItems.totalPrice}</h2>
          </div>

          <button onClick={makePayment} className="w-full bg-green-500 text-white py-3 font-semibold hover:bg-green-700 duration-300">
            {i18n.language === "ar"
              ? "المتابعة إلى الدفع"
              : "Proceed to Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
