import React from "react";

const FilterBar = ({ activeFilter, filterProduct }) => {
  const FilterButton = ({ label, category }) => {
    const isActive = activeFilter === category;
    return (
      <button
          className="btn shadow-none mx-3 px-0 pb-2 rounded-0 text-uppercase"
          style={{
              border: "none", 
              borderBottom: isActive ? "1px solid #333" : "1px solid transparent",
              color: isActive ? "#212529" : "#999",
              letterSpacing: "2px",
              fontSize: "0.8rem",
              fontWeight: "400",
              transition: "all 0.3s ease"
          }}
          onClick={() => filterProduct(category)}
      >
          {label}
      </button>
    )
  }

  return (
    <div id="product-grid-top" className="d-flex justify-content-center flex-wrap py-5 mb-3">
        <FilterButton label="All" category="all" />
        <FilterButton label="Living Room" category="Living Room" />
        <FilterButton label="Dining" category="Dining" />
        <FilterButton label="Bedroom" category="Bedroom" />
        <FilterButton label="Lighting" category="Lighting" />
        <FilterButton label="Decor" category="Decor" />
    </div>
  );
};

export default FilterBar;