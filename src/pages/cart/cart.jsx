import { FiTrash2 } from "react-icons/fi";
import i18n from "../../i18n";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ConfirmDeletePopup from "../../components/ConfirmationPopup"; 
const Cart = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const { setShowModal, setModalType, setModalMessage,removeFromCart, getCart, cartItems,setCartItems } = useCart(); 
  const {  toggleWishlist ,removeFromWishlist} = useWishlist();
  // const [cartItems, setCartItems] = useState([]);
  const isLoading = useSelector(state=>state.loader.isLoading);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null); // To store the course to be deleted
    const handleDelete = (courseId) => {
    setCourseToDelete(courseId);  // Set the course that will be deleted
    setIsConfirmDeleteOpen(true);  // Show the confirmation popup
  };
  const confirmDelete = () => {
    removeFromCart(courseToDelete);  // Call the remove function with the course ID
    setIsConfirmDeleteOpen(false);   // Close the popup
  };

  // Cancel the deletion
  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);  // Close the popup without deleting
  };
  const navigate = useNavigate();
  const makePayment = async()=> {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    const body = {
      products:cartItems.items
    }
    try 
      {
        const response = await api.post('/payment/create-checkout-session', body);
        console.log(response.data);
        if (response.data.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        }
        setCartItems([])
        window.location.href = response.data.url;
      } 
    catch (error) {
      console.error("Error in payment checkout:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  console.log(cartItems);

 // ================= MOVE TO WISHLIST =================
  const moveToWishlist = async (course) => {
    try {
      await toggleWishlist(course);
      // await removeFromWishlist(course._id);
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
    <>
    {isLoading?
    <Loader/>
    :
    <>
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2">
          {i18n.language === "ar" ? "عربة التسوق" : "Shopping Cart"}
        </h1>

        <p className="text-gray-500 mb-8">
          {cartItems?.items?.length || 0}{" "}
          {i18n.language === "ar" ? "دورات في عربة التسوق" : "Courses in Cart"}
        </p>

        <div className="flex flex-col gap-10">
          {/* CART ITEMS */}
          <div>
            {cartItems&&cartItems.items?.length>0?cartItems.items?.map((item) => (
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
                    onClick={() => handleDelete(item.course._id)}
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
            )):
            <div className="w-full flex items-center justify-center flex-col gap-5">
              <h1 className="font-bold text-xl">Cart is Empty</h1>
              <Link to="/courses" className="bg-[#309255] p-3 text-xl rounded-lg text-center text-white">Browse Our Courses</Link>
            </div>
            }
          </div>

          {/* TOTAL & CHECKOUT */}
          <div className="pt-6 flex flex-col gap-4">
            <div>
              <p className="text-gray-500">
                {i18n.language === "ar" ? "المجموع:" : "Total:"}
              </p>
              <h2 className="text-3xl font-bold">£E{cartItems.totalPrice}</h2>
            </div>
            {cartItems?.items?.length>0&&
              <button onClick={makePayment} className="w-full bg-green-500 text-white py-3 font-semibold hover:bg-green-700 duration-300">
                {i18n.language === "ar"
                  ? "المتابعة إلى الدفع"
                  : "Proceed to Checkout →"}
              </button>          
            }
          </div>
        </div>
      </div>
      <ConfirmDeletePopup
        show={isConfirmDeleteOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      /></>
    }
    </>
  );
};

export default Cart;
