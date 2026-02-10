"use client";
import React, { useContext, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import GlobalApi from "../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "../../_context/CartContext";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    createOrder();
    sendEmail();
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-confirm`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  const createOrder = () => {
    let productIds = [];
    cart.forEach((element) => productIds.push(element?.product?.id));
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        amount: amount,
        products: productIds,
      },
    };
    GlobalApi.createOrder(data).then((resp) => {
      if (resp) {
        cart.forEach((element) => {
          GlobalApi.deleteCartItem(element.id).then((result) => {});
        });
      }
    });
  };

  const sendEmail = async () => {
    // Prepare product details for the email
    const productDetails = cart.map((item) => ({
      name: item.product.attributes.title,
      category: item.product.attributes.category,
      price: item.product.attributes.pricing,
      quantity: 1,
      url: item.product.attributes.banner.data.attributes.url,
    }));

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        products: productDetails, // Include product details
      }),
      headers: {
        "Content-Type": "application/json", // Ensure the content type is set
      },
    });

    if (!res.ok) {
      console.error("Failed to send email:", await res.text());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-10 md:px-40 lg:px-60 mt-12 mx-auto max-w-screen-lg">
        <div className="w-full ">
          <PaymentElement />
        </div>
        <button
          className={`bg-darkPrimary p-2 text-white w-full rounded-md mt-6 hover:bg-darkAccent ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
