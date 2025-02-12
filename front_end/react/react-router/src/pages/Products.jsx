import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const queryCategory = searchParams.get("category") || "";
  const querySort = searchParams.get("sort") || "asc";
  const queryFilter = searchParams.get("filter") || "all";

  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedSort, setSelectedSort] = useState(querySort);
  const [selectedFilter, setSelectedFilter] = useState(queryFilter);
  const [products, setProducts] = useState([]);

  const [showBackToTop, setShowBackToTop] = useState(false);

  const productCategories = Object.keys(fakeProductData);

  useEffect(() => {
    if (queryCategory) {
      fetchProducts(queryCategory);
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [queryCategory, queryFilter, querySort]);

  const fetchProducts = (category) => {
    let filteredProducts = fakeProductData[category] || [];

    // Apply filter
    if (selectedFilter === "available") {
      filteredProducts = filteredProducts.filter((p) => p.available);
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      if (selectedSort === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setProducts(filteredProducts);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSearchParams({
      category: value,
      sort: selectedSort,
      filter: selectedFilter,
    });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    setSearchParams({
      category: selectedCategory,
      sort: value,
      filter: selectedFilter,
    });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    setSearchParams({
      category: selectedCategory,
      sort: selectedSort,
      filter: value,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="product-container">
      <h1 className="title">Search Products by Category</h1>

      <label className="label">Select Category:</label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="select-box"
      >
        <option value="">-- Select a Category --</option>
        {productCategories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <div className="filter-sort-container">
            <div>
              <label className="label">Filter:</label>
              <select
                value={selectedFilter}
                onChange={handleFilterChange}
                className="select-box"
              >
                <option value="all">All Products</option>
                <option value="available">Available Only</option>
              </select>
            </div>

            <div>
              <label className="label">Sort:</label>
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="select-box"
              >
                <option value="asc">Sort by Name (A-Z)</option>
                <option value="desc">Sort by Name (Z-A)</option>
              </select>
            </div>
          </div>

          <div>
            <h2 className="result-title">Results for: "{selectedCategory}"</h2>
            {products.length ? (
              <ul className="product-list">
                {products.map((product, index) => (
                  <li key={index}>
                    {product.name}{" "}
                    {product.available ? "(Available)" : "(Out of Stock)"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      )}

      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top">
          Back to Top
        </button>
      )}
    </div>
  );
}

export default Products;
