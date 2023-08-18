import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./FilterDropdown.css";
import { AppContext } from "../../Contexts/AppContext";

interface OrderingOption {
  value: string;
  label: string;
}


const FilterDropdown: React.FC = () => {

  const ordering_type: OrderingOption[] = [
    { value: "2", label: "order by date desc" },
    { value: "1", label: "order by date asc" },
    { value: "3", label: "Price descending" },
    { value: "4", label: "Price ascending" },
    { value: "5", label: "Mileage descending" },
    { value: "6", label: "Mileage ascending" },
  ];
  const { sortSelectedOption, setSortSelectedOption } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: OrderingOption) => {
    setSortSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterDropdownRef.current &&
      !filterDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = ordering_type.filter(
    (option) => option.label !== sortSelectedOption?.label
  );

  return (
    <div className="filter-dropdown-container" ref={filterDropdownRef}>
      {" "}
      <div
        className={`filter-container ${isOpen ? "open" : ""}`}
        onClick={toggleFilterDropdown}
      >
        <span className="period-choice">{sortSelectedOption.label}</span>
        <button className={isOpen ? "rotate" : ""}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#6f7383", height: "10px", width: "10px" }}
          />
        </button>
      </div>
      <div className={isOpen ? "filter-dropdown-content" : ""}>
        {isOpen && (
          <div className="filter-dropdown-options">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="filter-option"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
