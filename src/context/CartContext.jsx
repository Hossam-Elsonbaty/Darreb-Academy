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
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCartLoading(false);
    }
  };
  const removeFromCart = async (courseId) => {
    try {
      const res = await api.delete(`/cart/${courseId}`);
      const updatedCart = cartItems.items.filter(
        (item) => item.course._id !== courseId
      );
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + item.course.price,
        0
      );
      setCartItems({
        ...cartItems,
        items: updatedCart,
        totalPrice: newTotalPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (course) => {
    const course_id =
      course && typeof course === "object" && course._id ? course._id : course;
    console.log(course == "" ? course : course._id);
    const token = localStorage.getItem("token");
    if (!token) {
      setModalType("error");
      setModalMessage(
        lang === "en" ? "Please sign in first" : "من فضلك قم بتسجيل الدخول اولا"
      );
      setShowModal(true);
      return;
    }
  
    try {
      console.log("Adding course to cart:", course_id);
      const res = await api.post("/cart", { courseId: course_id });
      setCartItems(res.data.data);
      // await getCart();
      setModalType("success");
      setModalMessage(
        lang === "en"
          ? "Course added to cart!"
          : "تمت إضافة الكورس إلى سلة التسوق!"
      );
      setShowModal(true);
    } catch (error) {
      console.log("error is:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "An error occurred";
        if (error.response.status === 404) {
          setModalType("error");
          setModalMessage(
            lang === "en"
              ? "This course is no longer available"
              : "هذا الكورس لم يعد متاحًا"
          );
        } else if (error.response.status === 400) {
          setModalType("error");
          setModalMessage(
            lang === "en"
              ? errorMessage || "Invalid request."
              : errorMessage || "طلب غير صالح."
          );
        } else {
          setModalType("error");
          setModalMessage(
            lang === "en"
              ? "Failed to add course to cart."
              : "فشل في إضافة الكورس إلى سلة التسوق."
          );
        }
      } else {
        // If there's no response, this might be a network error or server down
        setModalType("error");
        setModalMessage(
          lang === "en"
            ? "Failed to add course to cart. Please try again."
            : "فشل في إضافة الكورس إلى سلة التسوق. حاول مرة أخرى."
        );
      }

      setShowModal(true);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartLoading,
        addToCart,
        showModal,
        setShowModal,
        modalType,
        setModalType,
        modalMessage,
        setModalMessage,
        removeFromCart,
        getCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
