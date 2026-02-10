"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { CartContext } from "../_context/CartContext";
import DarkMode from "./DarkMode";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";
import { usePathname } from "next/navigation";

function Header() {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState();
  const { cart, openCart, toggleCart, setCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  // Hide header for all sign-in and sign-up routes
  const hideHeader =
    path?.startsWith("/sign-in") || path?.startsWith("/sign-up");

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

  const getCartItem = async () => {
    try {
      const resp = await GlobalApi.getUserCartItems(
        user.primaryEmailAddress.emailAddress
      );
      const result = resp.data.data;

      if (result) {
        const newCartItems = result.map((prd) => ({
          id: prd.id,
          product: prd.attributes.products.data[0],
        }));
        setCart(newCartItems);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  if (hideHeader) return null;

  return (
    <div>
      <header id="header">
        <div className="  mx-auto  px-4 sm:px-6 lg:px-8 p-2">
          <div className="flex h-16 items-center justify-between  text-gray-900 dark:text-light">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  id="logo"
                />
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav
                aria-label="Global"
                className={`absolute right-3 z-10 border border-darkAccent md:border-none
                  md:text-light    shadow-md md:static md:block md:p-0 md:shadow-none px-10 py-10  md:mt-0 mt-14 rounded-md ${
                    isMenuOpen
                      ? "animate-slide-in-right block"
                      : "animate-slide-out-right hidden"
                  }`}
              >
                <ul className="flex flex-col items-start gap-4 text-md md:flex-row md:items-center md:gap-6 dark:text-dark">
                  <li>
                    <a
                      className="transition text-gray-700 hover:text-gray-900"
                      href="/"
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      className="transition text-gray-700 hover:text-gray-900"
                      href="/explore"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="transition text-gray-700 hover:text-gray-900"
                      href="/cart"
                    >
                      Cart
                    </a>
                  </li>

                  <li>
                    <a
                      className="transition text-gray-700 hover:text-gray-900"
                      href="/orders"
                    >
                      Orders
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleCart}
                      className="relative p-2 text-gray-600 transition hover:text-gray-600/75"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
                    </button>

                    <DarkMode />

                    {!user ? (
                      <div className="sm:flex sm:gap-4">
                        <a
                          className="block rounded-md bg-quaternary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-quaternary/80"
                          href="/sign-in"
                        >
                          Sign In
                        </a>
                        <a
                          className="hidden rounded-md border-2 border-quaternary px-5 py-2.5 text-sm font-medium text-quaternary transition hover:text-quaternary/80 sm:block"
                          href="/sign-up"
                        >
                          Sign Up
                        </a>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                    onClick={toggleMenu}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {openCart && <Cart />}
    </div>
  );
}

export default Header;
