"use client";

import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import { IndianRupee } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function Cart() {
  const { cart } = useContext(CartContext);
  const { user } = useUser();

  return (
    user && (
      <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md absolute mx-16 md:mx-5 right-10 top-16 p-5 border border-gray-300  shadow-md overflow-auto">
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li className="flex items-center gap-4" key={index}>
                <img
                  src={item?.product?.attributes?.banner?.data?.attributes?.url}
                  alt={item?.product?.attributes?.title}
                  className="size-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900 line-clamp-1">
                    {item?.product?.attributes?.title}
                  </h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-500 ">
                    <div>
                      <dt className="inline">
                        {item?.product?.attributes?.category}
                      </dt>
                    </div>
                    <div>
                      <dt className="flex gap-1">
                        <IndianRupee className="w-2 h-3" />
                        {item?.product?.attributes?.pricing}
                      </dt>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-center mt-5">
          <a
            href="/cart"
            className="block rounded bg-gray-700  px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 dark:hover:bg-gray-500"
          >
            View my cart ({cart?.length})
          </a>
          <a
            className="inline-block text-sm text-gray-500 dark:text-gray-400 underline underline-offset-4 transition hover:text-darkText dark:hover:text-gray-300 cursor-pointer"
            href="/"
          >
            Continue shopping
          </a>
        </div>
      </div>
    )
  );
}

export default Cart;
