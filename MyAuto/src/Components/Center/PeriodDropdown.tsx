import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./PeriodDropdown.css";
import { AppContext } from "../../Contexts/AppContext";

interface PeriodOption {
  value: string;
  label: string;
}

const PeriodDropdown: React.FC = () => {
  const periods: PeriodOption[] = [
    { value: "1h", label: "1 hour" },
    { value: "2h", label: "2 hours" },
    { value: "3h", label: "3 hours" },
    { value: "1d", label: "1 day" },
    { value: "2d", label: "2 days" },
    { value: "3d", label: "3 days" },
    { value: "1w", label: "1 week" },
    { value: "2w", label: "2 weeks" },
    { value: "3w", label: "3 weeks" },
  ];
  const { setFilters, filters, setPerSelectedOption, perSelectedOption } =
    useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const periodDropdownRef = useRef<HTMLDivElement>(null);

  const togglePeriodDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: PeriodOption) => {
    setPerSelectedOption(option);
    setIsOpen(false);
    const filteredFilters = filters.filter((filter) => filter.type !== "t");
    setFilters([
      ...filteredFilters,
      { id: option.value, label: option.label, type: "t" },
    ]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      periodDropdownRef.current &&
      !periodDropdownRef.current.contains(event.target as Node)
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

  const filteredOptions = periods.filter(
    (option) => option.value !== perSelectedOption?.value
  );

  return (
    <div className="period-dropdown-container" ref={periodDropdownRef}>
      {" "}
      <div
        className={`period-container ${isOpen ? "open" : ""}`}
        onClick={togglePeriodDropdown}
      >
        <span className="period-choice">
          {perSelectedOption ? perSelectedOption.label : "Period"}
        </span>
        <button className={isOpen ? "rotate" : ""}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#6f7383", height: "10px", width: "10px" }}
          />
        </button>
      </div>
      <div className={isOpen ? "period-dropdown-content" : ""}>
        {" "}
        {isOpen && (
          <div className="period-dropdown-options">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="period-option"
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

export default PeriodDropdown;
