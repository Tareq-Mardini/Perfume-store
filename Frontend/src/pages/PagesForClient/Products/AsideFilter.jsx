import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export default function AsideFilter({ sidebarOpen }) {
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(200);

  const applyFilters = () => {
    const params = {
      min_price: minPrice,
      max_price: maxPrice,
      page: 1,
    };
    if (category) {
      params.category = category;
    }
    setSearchParams(params);
  };

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <h3 className="filter-title">Categories</h3>
        <ul className="filter-list radio-style">
          <li>
            <label>
              <input
                type="radio"
                name="category"
                value="men"
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="custom-radio"></span>
              Men
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                value="women"
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="custom-radio"></span>
              Women
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                value="unisex"
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="custom-radio"></span>
              Unisex
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                value=""
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="custom-radio"></span>
              All
            </label>
          </li>
        </ul>
        <h3 className="filter-title" style={{ marginTop: "20px" }}>
          Price
        </h3>
        <div className="range-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-range"
            style={{
              left: `${(minPrice / 200) * 100}%`,
              right: `${100 - (maxPrice / 200) * 100}%`,
            }}
          ></div>
          <input
            type="range"
            min="1"
            max="200"
            value={minPrice}
            onChange={handleMin}
            className="thumb thumb-left"
            style={{ marginTop: "3px" }}
          />
          <input
            type="range"
            min="1"
            max="200"
            value={maxPrice}
            onChange={handleMax}
            className="thumb thumb-right"
            style={{ marginTop: "3px" }}
          />
          <div className="price-values">
            <span></span>
            <span></span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "bold" }}>${minPrice} </span>
          <span style={{ fontWeight: "bold" }}>${maxPrice} </span>
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
      </aside>
    </>
  );
}
