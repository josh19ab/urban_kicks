import { IndianRupee, SquareChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  if (!product || !product.attributes) {
    return null;
  }

  // In Strapi 5, single-document REST endpoints use documentId.
  // We prefer documentId but fall back to numeric id for safety.
  const productIdentifier = product.documentId || product.id;

  return (
    <Link href={"/product-details/" + productIdentifier}>
      <div className="hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out p-1 rounded-lg " id="itemMainBody">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url || "/bg.svg"}
          alt="banner"
          width={400}
          height={350}
          className="rounded-t-lg h-[170px] object-cover"
        />
        <div className="flex justify-between items-center bg-gray-50  p-3 rounded-b-lg max-w-[400px]" id="itemBody">
          <div className="">
            <h2 className="text-[14px] font-medium">
              {product.attributes?.title || "Untitled"}
            </h2>
            {product.attributes?.category && (
              <h2 className="text-[12px] text-b flex gap-2">
                <SquareChevronRight className="h-4 w-4" />
                {product.attributes?.category}
              </h2>
            )}
          </div>
          <h2 className="flex items-center font-medium">
            <IndianRupee className="w-4 h-4" />
            {product.attributes?.pricing}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
