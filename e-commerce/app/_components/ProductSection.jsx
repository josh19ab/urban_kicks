"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { ArrowRight } from "lucide-react";
import SkeletalProductList from "./SkeletalProductsList";

function ProductSection() {
  const [productList, setProductList] = useState([]);
  const [clothingList, setClothingList] = useState([]);
  const [footwearList, setFootwearList] = useState([]);
  const [accessoriesList, setAccessoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      // Single API call: fetch all products with light payload, then split by category on client
      const resp = await GlobalApi.getLatestProducts();
      const data = resp.data.data || [];
      setProductList(data);

      setClothingList(data.filter((p) => p.attributes?.category === "Clothing"));
      setFootwearList(data.filter((p) => p.attributes?.category === "Footwear"));
      setAccessoriesList(
        data.filter((p) => p.attributes?.category === "Accessories")
      );
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    productList && (
      <div className="px-10 md:px-20">
        {/* Latest Products */}
        <div className="flex items-center justify-between font-mono">
          <h2 className="font-bold my-3 text-[20px] text-gray-700 ">
            New Arrivals
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-quaternary">See Collection</h2>
            <ArrowRight className="text-quaternary w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={productList} />
          )}
        </div>

        {/* Footwear */}
        <div className="flex items-center justify-between font-mono">
          <h2 className="font-bold my-3 text-[20px] text-gray-700 ">
            Footwear
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-quaternary">See Collection</h2>
            <ArrowRight className="text-quaternary w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={footwearList} />
          )}
        </div>

        {/* Clothing */}
        <div className="flex items-center justify-between font-mono">
          <h2 className="font-bold my-3 text-[20px] text-gray-700 ">
            Clothing
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-quaternary">See Collection</h2>
            <ArrowRight className="text-quaternary w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={clothingList} />
          )}
        </div>

        {/* Accessories */}
        <div className="flex items-center justify-between font-mono">
          <h2 className="font-bold my-3 text-[20px] text-gray-700 ">
            Accessories
          </h2>
          <a className="flex cursor-pointer" href="/explore">
            <h2 className="text-[14px] text-quaternary">See Collection</h2>
            <ArrowRight className="text-quaternary w-4 h-4" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <SkeletalProductList />
          ) : (
            <ProductList productList={accessoriesList} />
          )}
        </div>
      </div>
    )
  );
}

export default ProductSection;
