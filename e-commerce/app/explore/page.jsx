"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../_components/Breadcrumb";
import { usePathname } from "next/navigation";
import ProductSection from "../_components/ProductSection";
import { ArrowRight, IndianRupee, Filter, X } from "lucide-react";
import SkeletalProductList from "../_components/SkeletalProductsList";
import ProductList from "../_components/ProductList";
import GlobalApi from "../_utils/GlobalApi";
import ProductItem from "../_components/ProductItem";
import LoadingEffect from "../_components/LoadingEffect";
import Sidenav from "./_components/Sidenav";

function explore() {
  const path = usePathname();
  const [productList, setProductList] = useState([]);
  const [sneakerList, setSneakerList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("titleASC");
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSidenavOpen, setSidenavOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Updated categories for thrift store
  const categories = [
    "sneakers",
    "boots",
    "flip-flops",
    "tshirts",
    "jeans",
    "dresses",
    "jackets",
    "accessories",
  ];

  // Category groups for better organization
  const categoryGroups = {
    footwear: ["sneakers", "boots", "flip-flops"],
    clothing: ["tshirts", "jeans", "dresses", "jackets"],
    accessories: ["accessories"],
  };

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen);
  };

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const resp = await GlobalApi.getLatestProducts();
      const data = resp.data.data;
      setProductList(data);
      setFilteredList(data);
      const sneakers = data.filter(
        (item) => item.attributes.category === "sneakers"
      );

      const outfits = data.filter(
        (item) => item.attributes.category === "tshirts"
      );
      setSneakerList(sneakers);
      setOutfitList(outfits);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Updated availability filter to use productAvailibility
  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability((prev) => {
      if (prev.includes(availability)) {
        return prev.filter((a) => a !== availability);
      } else {
        return [...prev, availability];
      }
    });
  };

  // Apply all filters
  useEffect(() => {
    let updatedList = [...productList];

    // Category filter
    if (selectedCategories.length > 0) {
      updatedList = updatedList.filter((item) =>
        selectedCategories.includes(item.attributes.category)
      );
    }

    // Availability filter
    if (selectedAvailability.length > 0) {
      updatedList = updatedList.filter((item) => {
        if (selectedAvailability.includes("available")) {
          return item.attributes.productAvailibility === true;
        } else if (selectedAvailability.includes("sold")) {
          return item.attributes.productAvailibility === false;
        }
        return true;
      });
    }

    // Price filter
    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      updatedList = updatedList.filter((item) => {
        const price = parseFloat(item.attributes.pricing);
        if (!isNaN(min) && !isNaN(max)) {
          return price >= min && price <= max;
        } else if (!isNaN(min)) {
          return price >= min;
        } else if (!isNaN(max)) {
          return price <= max;
        }
        return true;
      });
    }

    // Sort
    updatedList.sort((a, b) => {
      if (sortOption === "titleASC") {
        return a.attributes.title.localeCompare(b.attributes.title);
      } else if (sortOption === "titleDESC") {
        return b.attributes.title.localeCompare(a.attributes.title);
      } else if (sortOption === "priceASC") {
        return (
          parseFloat(a.attributes.pricing) - parseFloat(b.attributes.pricing)
        );
      } else if (sortOption === "priceDESC") {
        return (
          parseFloat(b.attributes.pricing) - parseFloat(a.attributes.pricing)
        );
      }
      return 0;
    });

    setFilteredList(updatedList);

    // Update active filters
    const active = [];
    if (selectedCategories.length > 0) {
      active.push(`Categories: ${selectedCategories.join(", ")}`);
    }
    if (selectedAvailability.length > 0) {
      active.push(`Availability: ${selectedAvailability.join(", ")}`);
    }
    if (minPrice || maxPrice) {
      active.push(`Price: ₹${minPrice || "0"} - ₹${maxPrice || "∞"}`);
    }
    setActiveFilters(active);
  }, [
    sortOption,
    selectedCategories,
    selectedAvailability,
    minPrice,
    maxPrice,
    productList,
  ]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setMinPrice("");
    setMaxPrice("");
    setSortOption("titleASC");
    setFilteredList(productList);
    setActiveFilters([]);
  };

  const removeFilter = (filterIndex) => {
    const filter = activeFilters[filterIndex];
    if (filter.startsWith("Categories:")) {
      setSelectedCategories([]);
    } else if (filter.startsWith("Availability:")) {
      setSelectedAvailability([]);
    } else if (filter.startsWith("Price:")) {
      setMinPrice("");
      setMaxPrice("");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumb path={path} />
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mt-10">
            Thrift Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Discover unique pre-loved fashion pieces. Sustainable style for
            conscious shoppers.
          </p>
        </header>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Active Filters:
            </span>
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-quaternary text-white"
              >
                {filter}
                <button
                  onClick={() => removeFilter(index)}
                  className="ml-1 hover:bg-white hover:text-quaternary rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-quaternary underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="mt-8 block lg:hidden">
          <button
            id="filterButton"
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            onClick={toggleSidenav}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters & Sorting</span>
            <span className="text-xs bg-quaternary text-white px-2 py-1 rounded-full">
              {activeFilters.length}
            </span>
          </button>
        </div>

        <Sidenav
          isOpen={isSidenavOpen}
          onClose={toggleSidenav}
          setSortOption={setSortOption}
          setFilterCategory={setFilterCategory}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
          handleCategoryChange={(category) => {
            setSelectedCategories((prev) => {
              if (prev.includes(category)) {
                return prev.filter((cat) => cat !== category);
              } else {
                return [...prev, category];
              }
            });
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handlePriceFilter={() => {}} // Handled in useEffect
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleAvailabilityChange={handleAvailabilityChange}
          setFilteredList={setFilteredList}
          productList={productList}
          categories={categories}
        />

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <div className="py-2">
              <label
                htmlFor="HeadlineAct"
                className="block text-sm font-medium text-gray-900"
              >
                Sort By
              </label>

              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-1.5 w-[170px] rounded-md border-gray-300 text-gray-800 sm:text-sm p-2"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option value="titleASC">A - Z</option>
                <option value="titleDESC">Z - A</option>
                <option value="priceASC">Price: Low to High</option>
                <option value="priceDESC">Price: High to Low</option>
              </select>
            </div>

            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                {/* Categories Filter */}
                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
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

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {selectedCategories.length} Selected
                      </span>
                      <button
                        type="button"
                        className="text-sm text-gray-900"
                        onClick={() => setSelectedCategories([])}
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      {categories.map((category) => (
                        <li key={category}>
                          <label
                            htmlFor={`Filter${category}`}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={`Filter${category}`}
                              className="size-5 rounded border-gray-300"
                              checked={selectedCategories.includes(category)}
                              onChange={() => {
                                setSelectedCategories((prev) => {
                                  if (prev.includes(category)) {
                                    return prev.filter(
                                      (cat) => cat !== category
                                    );
                                  } else {
                                    return [...prev, category];
                                  }
                                });
                              }}
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
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
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

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {minPrice && maxPrice
                          ? `₹${minPrice} - ₹${maxPrice}`
                          : "Set price range"}
                      </span>
                      <button
                        type="button"
                        className="text-sm text-gray-900"
                        onClick={() => {
                          setMinPrice("");
                          setMaxPrice("");
                        }}
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between gap-4">
                        <label
                          htmlFor="FilterPriceFrom"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">
                            <IndianRupee className="w-4 h-4" />
                          </span>
                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="From"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>

                        <label
                          htmlFor="FilterPriceTo"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">
                            <IndianRupee className="w-4 h-4" />
                          </span>
                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="To"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </details>

                {/* Availability Filter */}
                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
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

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {selectedAvailability.length} Selected
                      </span>
                      <button
                        type="button"
                        className="text-sm text-gray-900"
                        onClick={() => setSelectedAvailability([])}
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      {[
                        { value: "available", label: "Available" },
                        { value: "sold", label: "Sold Out" },
                      ].map((option) => (
                        <li key={option.value}>
                          <label
                            htmlFor={`Filter${option.value}`}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={`Filter${option.value}`}
                              className="size-5 rounded border-gray-300"
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

          <div className="lg:col-span-3">
            {isLoading ? (
              <div>
                <LoadingEffect />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredList.length} of {productList.length}{" "}
                    products
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {filteredList.map((item, index) => (
                    <ProductItem key={index} product={item} />
                  ))}
                </div>
                {filteredList.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No products found matching your filters.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 text-quaternary hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default explore;
