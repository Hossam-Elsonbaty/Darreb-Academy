import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useLanguage } from "../hooks/useLanguage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("success"); 
const [modalMessage, setModalMessage] = useState("");
const { lang } = useLanguage();
  const getCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsCartLoading(false);
      return;
    }
    setIsCartLoading(true);
    try {
      const res = await api.get("/cart");
      setCartItems(Array.isArray(res.data.cart) ? res.data.cart : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCartLoading(false);
    }
  };

  const addToCart = async (course) => {
  console.log(typeof course);
  const course_id = course && typeof course === 'object' && course._id ? course._id : course;
  console.log(course == "" ? course : course._id);
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    console.log("Adding course to cart:", course_id);
    await api.post("/cart", { courseId: course_id });
    await getCart();
        setModalType("success");
    setModalMessage(
      lang === "en"
        ? "Course added to cart!"
        : "تمت إضافة الكورس إلى سلة التسوق!"
    );
    setShowModal(true);
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;
    console.error("Cart error data:", data);
    console.error("Cart error status:", status);
    if (status === 404) {
      setModalType("error");
    setModalMessage(
      lang === "en"
        ? "This course is no longer available"
        : "هذا الكورس لم يعد متاحًا"
    );
    setShowModal(true);
    } else if (status === 400){
      setModalType("error");
    setModalMessage(
      lang === "en"
        ? data.message || "Invalid request."
        : data.message || "طلب غير صالح."
    );
    setShowModal(true);
    }
    else{
      setModalType("error");
    setModalMessage(
      lang === "en"
        ? "Failed to add course to cart."
        : "فشل في إضافة الكورس إلى سلة التسوق."
    );
    setShowModal(true);
    }
  }
};


  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems,
  isCartLoading,
  addToCart,
  showModal,
  setShowModal,
  modalType,
  setModalType,
  modalMessage,
  setModalMessage
 }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
