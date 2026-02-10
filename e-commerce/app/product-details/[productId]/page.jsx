"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { CartContext } from "../../_context/CartContext";
import ProjectBanner from "./_components/ProjectBanner";
import ProjectInfo from "./_components/ProjectInfo";
import GlobalApi from "../../_utils/GlobalApi";
import ProductList from "../../_components/ProductList";
import Breadcrumb from "../../_components/Breadcrumb";
import SkeletalProductList from "../../_components/SkeletalProductsList";
import CommentBox from "./_components/CommentBox";
import CommentList from "./_components/CommentsList";

function ProductDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetails] = useState();
  const [productList, setProductList] = useState([]);
  const path = usePathname();
  const { toggleCart } = useContext(CartContext);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // Use useParams hook instead of params prop
  const params = useParams();
  const productId = params?.productId;

  const handleRefresh = () => {
    setShouldRefresh(!shouldRefresh);
  };

  useEffect(() => {
    if (productId) {
      getProductById();
    }
  }, [productId]);

  const getProductById = async () => {
    try {
      const resp = await GlobalApi.getProductsById(productId);
      setProductDetails(resp.data.data);
      getProductListByCategory(resp.data.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

  const getProductListByCategory = async (product) => {
    try {
      const resp = await GlobalApi.getProductListByCategory(
        product?.attributes?.category
      );
      setProductList(resp.data.data);
    } catch (error) {
      console.error("Error fetching product list by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 py-12 px-10 md:px-28 ">
      <Breadcrumb
        path={path}
        productName={productDetail?.attributes?.title}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 sm:gap-10">
        <ProjectBanner product={productDetail} />
        <ProjectInfo product={productDetail} toggleCart={toggleCart} />
      </div>
      <div>
        <h2 className="mt-20 font-medium text-[20px] mb-4">Similar Products</h2>
        {isLoading ? (
          <SkeletalProductList />
        ) : (
          <div>
            {productList.length > 0 && (
              <div className="">
                <ProductList productList={productList} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-20">
        <CommentList productId={productId} onRefresh={shouldRefresh} />
      </div>
      <div className="flex justify-around">
        <CommentBox onRefresh={handleRefresh} productId={productId} />
      </div>
    </div>
  );
}

export default ProductDetails;
