import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

[1, 2, 5];

const fakeProductData = {
  smartphones: [
    { name: "iPhone 14", available: true },
    { name: "Samsung Galaxy S22", available: false },
    { name: "Google Pixel 7", available: true },
    { name: "OnePlus 11", available: true },
    { name: "Xiaomi Mi 13", available: true },
    { name: "Motorola Edge 30", available: false },
    { name: "Samsung Galaxy Z Flip 5", available: true },
    { name: "Realme GT Neo 3", available: true },
  ],
  laptops: [
    { name: "MacBook Pro 16-inch", available: true },
    { name: "Dell XPS 13 Plus", available: true },
    { name: "Lenovo ThinkPad X1 Carbon", available: false },
    { name: "HP Spectre x360", available: true },
    { name: "Asus ZenBook Duo", available: true },
    { name: "Acer Predator Helios 300", available: false },
    { name: "Microsoft Surface Laptop 5", available: true },
    { name: "Razer Blade 15", available: true },
  ],
  headphones: [
    { name: "Sony WH-1000XM5", available: true },
    { name: "Bose Noise Cancelling 700", available: true },
    { name: "Apple AirPods Pro 2nd Gen", available: false },
    { name: "Jabra Elite 85h", available: true },
    { name: "Sennheiser Momentum 4", available: true },
    { name: "Beats Studio3 Wireless", available: false },
    { name: "Anker Soundcore Q45", available: true },
    { name: "Bang & Olufsen Beoplay HX", available: true },
  ],
  tablets: [
    { name: "iPad Pro 12.9", available: true },
    { name: "Samsung Galaxy Tab S8", available: true },
    { name: "Microsoft Surface Pro 9", available: false },
    { name: "Lenovo Tab P12 Pro", available: true },
    { name: "Amazon Fire HD 10", available: true },
    { name: "Huawei MatePad Pro", available: false },
    { name: "Xiaomi Pad 5", available: true },
  ],
  cameras: [
    { name: "Sony Alpha a7 IV", available: true },
    { name: "Canon EOS R5", available: true },
    { name: "Nikon Z7 II", available: false },
    { name: "Fujifilm X-T5", available: true },
    { name: "Panasonic Lumix GH6", available: true },
    { name: "Leica Q2", available: false },
    { name: "GoPro HERO11 Black", available: true },
  ],
};

function Products() {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const queryCategory = searchQuery.get("category") || "";
  const queryFilter = searchQuery.get("filter") || "all";
  const querySort = searchQuery.get("sort") || "asc";

  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedFilter, setSelectedFilter] = useState(queryFilter);
  const [selectedSort, setSelectedSort] = useState(querySort);

  const [products, setProducts] = useState([]);

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let products = fakeProductData[selectedCategory] || [];

    if (selectedFilter == "available") {
      products = products.filter((product) => product.available);
    }

    products.sort((a, b) => {
      if (selectedSort == "asc") return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    setProducts(products);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedCategory, selectedFilter, selectedSort]);

  const handleCategory = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setSearchQuery({
      category: value,
      filter: "all",
      sort: "asc",
    });
  };
  const handleFilter = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    setSearchQuery({
      category: "",
      filter: value,
      sort: "asc",
    });
  };
  const handleSort = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    setSearchQuery({
      category: "",
      filter: "all",
      sort: value,
    });
  };

  return (
    <>
      <section className="product-container">
        <h1 className="title">Search Products by Category</h1>
        <label htmlFor="" className="label">
          Select Category
        </label>
        <select name="" id="" className="select-box" onChange={handleCategory}>
          <option value="">--Select Category--</option>
          {Object.keys(fakeProductData).map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <section className="filter-sort-container">
              <div>
                <label className="label">Filter:</label>
                <select className="select-box" onChange={handleFilter}>
                  <option value="all">All</option>
                  <option value="available">Available</option>
                </select>
              </div>

              <div>
                <label className="label">Sort: </label>
                <select className="select-box" onChange={handleSort}>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </section>
            <section className="products">
              <ul>
                {products.map((product) => (
                  <li key={product.name}>{product.name}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </section>

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to Top
        </button>
      )}
    </>
  );
}

export default Products;
