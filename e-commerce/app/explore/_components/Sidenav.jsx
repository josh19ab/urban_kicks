import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import PriceRangeSlider, {
  PRICE_MIN,
  PRICE_MAX,
} from "./PriceRangeSlider";

const Sidenav = ({
  isOpen,
  onClose,
  setSortOption,
  setFilterCategory,
  setSelectedCategories,
  selectedCategories,
  handleCategoryChange,
  minPrice,
  setMinPrice,
  setMaxPrice,
  maxPrice,
  handlePriceFilter,
  selectedAvailability,
  setSelectedAvailability,
  handleAvailabilityChange,
  setFilteredList,
  productList,
  categories,
}) => {
  const sidenavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidenavRef}
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Filters & Sorting</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full">
          {/* Sort Section */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3">Sort By</h4>
            <select
              name="sortOption"
              className="w-full rounded-md border-gray-300 text-gray-800 sm:text-sm p-2"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="titleASC">A - Z</option>
              <option value="titleDESC">Z - A</option>
              <option value="priceASC">Price: Low to High</option>
              <option value="priceDESC">Price: High to Low</option>
            </select>
          </div>

          {/* Filters Section */}
          <div>
            <h4 className="text-md font-medium mb-3">Filters</h4>

            <div className="space-y-4">
              {/* Categories Filter */}
              <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-3 text-gray-900 transition hover:bg-gray-50">
                  <span className="text-sm font-medium">Categories</span>
                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="bg-white">
                  <header className="flex items-center justify-between p-3 border-t">
                    <span className="text-sm text-gray-700">
                      {selectedCategories.length} Selected
                    </span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 hover:text-quaternary"
                      onClick={() => setSelectedCategories([])}
                    >
                      Reset
                    </button>
                  </header>

                  <ul className="space-y-2 p-3 border-t">
                    {categories.map((category) => (
                      <li key={category}>
                        <label
                          htmlFor={`MobileFilter${category}`}
                          className="inline-flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={`MobileFilter${category}`}
                            className="size-4 rounded border-gray-300"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              {/* Price Filter */}
              <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-3 text-gray-900 transition hover:bg-gray-50">
                  <span className="text-sm font-medium">Price Range</span>
                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="bg-white">
                  <header className="flex items-center justify-between p-3 border-t">
                    <span className="text-sm text-gray-700">
                      ₹{Number(minPrice).toLocaleString("en-IN")} – ₹
                      {Number(maxPrice).toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 hover:text-quaternary"
                      onClick={() => {
                        setMinPrice(PRICE_MIN);
                        setMaxPrice(PRICE_MAX);
                      }}
                    >
                      Reset
                    </button>
                  </header>

                  <div className="p-3 border-t">
                    <PriceRangeSlider
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      onMinChange={setMinPrice}
                      onMaxChange={setMaxPrice}
                      idPrefix="MobileFilterPrice"
                    />
                  </div>
                </div>
              </details>

              {/* Availability Filter */}
              <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-3 text-gray-900 transition hover:bg-gray-50">
                  <span className="text-sm font-medium">Availability</span>
                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="bg-white">
                  <header className="flex items-center justify-between p-3 border-t">
                    <span className="text-sm text-gray-700">
                      {selectedAvailability.length} Selected
                    </span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 hover:text-quaternary"
                      onClick={() => setSelectedAvailability([])}
                    >
                      Reset
                    </button>
                  </header>

                  <ul className="space-y-2 p-3 border-t">
                    {[
                      { value: "available", label: "Available" },
                    ].map((option) => (
                      <li key={option.value}>
                        <label
                          htmlFor={`MobileFilter${option.value}`}
                          className="inline-flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={`MobileFilter${option.value}`}
                            className="size-4 rounded border-gray-300"
                            checked={selectedAvailability.includes(
                              option.value
                            )}
                            onChange={() =>
                              handleAvailabilityChange(option.value)
                            }
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
