"use client";

import Header from "./Header";
import Footer from "./Footer";
import { CartContext } from "../_context/CartContext";
import { useEffect, useState } from "react";
import { CheckoutProvider } from "../_context/CheckoutContext";

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]); // Initialize cart state
  const [openCart, setOpenCart] = useState(false); // State to manage cart visibility

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const toggleCart = () => {
    setOpenCart((prev) => !prev); // Toggle cart visibility
  };

  return (
    <CartContext.Provider value={{ cart, setCart, openCart, toggleCart }}>
      <CheckoutProvider>
        <Header toggleDarkMode={toggleDarkMode} />
        {children}
        <Footer toggleDarkMode={toggleDarkMode} />
      </CheckoutProvider>
    </CartContext.Provider>
  );
}
