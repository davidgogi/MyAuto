import PeriodDropdown from "././PeriodDropdown";
import ProductCard from "././ProductCard";
import FilterDropdown from "././FilterDropdown";
import FiltersContainer from "././FiltersContainer";
import "./Main.css";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const Main: React.FC = () => {
  const { filters, prod_options, prodsLoading, setIsSidebarOpen, meta } =
    useContext(AppContext);
  return (
    <div className="right-products-container">
      <div className="above-products">
        <div>
          {prodsLoading ? (
            <div className="loading-container">
              <div className="custom-loader"></div> Loading
            </div>
          ) : (
            <p className="count-listing">
              {prod_options.length < 1
                ? "No Listings"
                : prod_options.length === 1
                ? "1 Listing"
                : `${meta.total} Listings`}
            </p>
          )}
        </div>
        <div className="right-drops">
          <PeriodDropdown />
          <FilterDropdown />
          <button
            className="show-sidebar"
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4h5.5"
                stroke="#272A37"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle
                cx="10"
                cy="4"
                r="2.3"
                stroke="#272A37"
                strokeWidth="1.4"
              />
              <path
                d="M12 10H6.5"
                stroke="#272A37"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle
                cx="4"
                cy="10"
                r="2.3"
                transform="rotate(-180 4 10)"
                stroke="#272A37"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        </div>
      </div>
      {filters.length !== 0 && <FiltersContainer />}

      <ProductCard />
    </div>
  );
};

export default Main;
