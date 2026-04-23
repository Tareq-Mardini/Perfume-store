import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AsideFilter({ sidebarOpen }) {
  const { t } = useTranslation();

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
    <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      {/* Categories */}
      <h3 className="filter-title">{t("filters.categories")}</h3>

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
            {t("filters.men")}
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
            {t("filters.women")}
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
            {t("filters.unisex")}
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
            {t("filters.all")}
          </label>
        </li>
      </ul>

      {/* Price */}
      <h3 className="filter-title" style={{ marginTop: "20px" }}>
        {t("filters.price")}
      </h3>

      <div className="range-wrapper">
        <div className="slider-track"></div>

        <div
          className="slider-range"
          style={
            document.documentElement.dir === "rtl"
              ? {
                  right: `${(minPrice / 200) * 100}%`,
                  left: `${100 - (maxPrice / 200) * 100}%`,
                }
              : {
                  left: `${(minPrice / 200) * 100}%`,
                  right: `${100 - (maxPrice / 200) * 100}%`,
                }
          }
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
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{ fontWeight: "bold", fontSize: "13px", marginTop: "14px" }}
        >
          AED {minPrice}
        </span>
        <span
          style={{ fontWeight: "bold", fontSize: "13px", marginTop: "14px" }}
        >
          AED {maxPrice}
        </span>
      </div>

      <button onClick={applyFilters}>{t("filters.apply")}</button>
    </aside>
  );
}