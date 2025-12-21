import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ===== GET WISHLIST FROM SERVER =====
  const getWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.items || []);
    } catch (err) {
      console.log("Get wishlist error:", err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // ===== ADD TO WISHLIST =====
  const addToWishlist = async (course) => {
    setWishlist((prev) => [...prev, { course }]);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await api.post(
        "/wishlist",
        { courseId: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log("Add to wishlist error:", err);
    }
  };

  // ===== REMOVE FROM WISHLIST =====
  const removeFromWishlist = async (courseId) => {
    setWishlist((prev) => prev.filter((item) => item.course._id !== courseId));
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await api.delete(`/wishlist/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log("Remove from wishlist error:", err);
    }
  };

  // ===== TOGGLE WISHLIST =====
  const toggleWishlist = async (course) => {
    const exists = wishlist.some((item) => item.course._id === course._id);

    if (exists) {
      await removeFromWishlist(course._id);
    } else {
      await addToWishlist(course);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
