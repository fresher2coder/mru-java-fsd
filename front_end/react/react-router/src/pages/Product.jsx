import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get("category") || "";
  const querySort = searchParams.get("sort") || "asc";
  const queryFilter = searchParams.get("filter") || "all";

  const [selectedCategory, setSelectCategory] = useState(queryCategory);
  const [selectedFilter, setSelectFilter] = useState(queryFilter);
  const [selectedSort, setSelectSort] = useState(querySort);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = fakeProductData[selectedCategory];
    setProducts(products);
  }, [selectedCategory]);

  const handleCategory = (event) => {
    const value = event.target.value;
    setSelectCategory(value);
    setSearchParams({
      category: value,
      sort: "asc",
      filter: "all",
    });
  };
  return (
    <>
      <section className="product-container">
        <h1 className="title">Search Products by Category</h1>
        <label className="label">Select Category</label>
        <select
          className="select-box"
          value={queryCategory}
          onChange={handleCategory}
        >
          <option value="">--Select a Category--</option>
          {Object.keys(fakeProductData).map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h2 className="result-title">Results for: {selectedCategory}</h2>
        <ul>
          {products.map((product) => (
            <li>{product.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Product;
