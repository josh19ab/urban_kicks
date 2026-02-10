"use client";
import { AlertOctagon, BadgeCheck, IndianRupee } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";
import React, { useContext } from "react";
import SkeletalProjectInfo from "./SkeletalProjectInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CartContext } from "../../../_context/CartContext";
import GlobalApi from "../../../_utils/GlobalApi";

function ProjectInfo({ product, toggleCart }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart, openCart } = useContext(CartContext);

  const addToCartClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product?.id,
        },
      };
      GlobalApi.addToCart(data).then(
        (resp) => {
          if (resp) {
            setCart((cart) => [
              ...cart,
              {
                id: resp?.data?.id,
                product: product,
              },
            ]);
            toggleCart(); // Call toggleCart to open the cart
          }
        },
        (error) => console.log(error)
      );
    }
  };

  const isProductAvailable = product?.attributes?.productAvailibility;

  return (
    <div>
      {product ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[15px] text-gray-400">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-[15px] mt-5 text-gray-700">
            {product?.attributes?.desc}
          </h2>
          <div className="flex gap-2 mt-5 text-gray-500 text-[13px]">
            {isProductAvailable ? (
              <div className="flex items-center gap-2">
                <BadgeCheck className="text-green-500 h-5 w-5" />
                <span>Available</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertOctagon className="text-yellow-500 h-5 w-5" />
                <span>Sold</span>
              </div>
            )}
          </div>
          <h2 className="text-[15px] mt-5 text-gray-700">
            Size: {product?.attributes?.Size}
          </h2>
          <h2 className="flex items-center font-medium text-[35px] mt-5">
            <IndianRupee className="w-5 h-5" />
            {product?.attributes?.pricing}
          </h2>
          <button
            className={`flex gap-2 py-3 items-center rounded-lg px-14 mt-5 mb-5 border-2 transition-colors ${
              isProductAvailable
                ? "bg-quaternary text-white border-quaternary hover:bg-white hover:text-quaternary cursor-pointer"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            }`}
            onClick={isProductAvailable ? addToCartClick : undefined}
            disabled={!isProductAvailable}
          >
            <FaCartPlus />
            {isProductAvailable ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      ) : (
        <SkeletalProjectInfo />
      )}
    </div>
  );
}

export default ProjectInfo;
