"use client";

import React from "react";
import { IndianRupee } from "lucide-react";

const PRICE_MIN = 0;
const PRICE_MAX = 10000;

export { PRICE_MIN, PRICE_MAX };

export default function PriceRangeSlider({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  idPrefix = "price",
}) {
  const minVal = Number(minPrice);
  const maxVal = Number(maxPrice);

  const handleMin = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 1);
    onMinChange(val);
  };

  const handleMax = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 1);
    onMaxChange(val);
  };

  const minPercent = ((minVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <IndianRupee className="w-4 h-4" />
          {minVal.toLocaleString("en-IN")} – {maxVal.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />
        {/* Active track between thumbs */}
        <div
          className="absolute h-1.5 rounded-full bg-blue-500"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={minVal}
          onChange={handleMin}
          aria-label="Minimum price"
          id={`${idPrefix}-min`}
          className="absolute left-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-[1] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow"
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={maxVal}
          onChange={handleMax}
          aria-label="Maximum price"
          id={`${idPrefix}-max`}
          className="absolute left-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-[2] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow"
        />
      </div>
    </div>
  );
}
