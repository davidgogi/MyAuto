import { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./SaleRentDropdown.css";
import { AppContext } from "../../Contexts/AppContext";

interface SaleRentDropdownProps {
  options: string[];
}

const SaleRentDropdown: React.FC<SaleRentDropdownProps> = ({ options }) => {
  const { saleSelectedOption, setSaleSelectedOption } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCloseButtonSelected, setIsCloseButtonSelected] = useState(false);
  const saleRentdropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        saleRentdropdownRef.current &&
        !saleRentdropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (option: string) => {
    setSaleSelectedOption(option);
    setIsCloseButtonSelected(true);
  };

  const toggleDropdown = () => {
    if (isCloseButtonSelected) {
      setSaleSelectedOption("");
      setIsCloseButtonSelected(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    if (!isOpen && !isCloseButtonSelected) {
      setIsOpen(true);
    }
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSaleSelectedOption("");
    setIsCloseButtonSelected(false);
  };

  return (
    <div className="sale-rent-dropdown-container" ref={saleRentdropdownRef}>
      <div
        onClick={handleContainerClick}
        className={`sale-rent-container ${
          saleSelectedOption ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          id="1"
          placeholder={saleSelectedOption ? saleSelectedOption : "Deal type"}
          readOnly
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <button
          onClick={toggleDropdown}
          className={
            isCloseButtonSelected && saleSelectedOption !== ""
              ? "rotate-x"
              : isOpen
              ? "rotate"
              : ""
          }
        >
          {isCloseButtonSelected && saleSelectedOption !== "" ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div className={isOpen ? "sale-rent-dropdown-content" : ""}>
        {isOpen && (
          <div className="sale-rent-dropdown">
            <div className="sale-rent-dropdown-options">
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={saleSelectedOption === option}
                    onChange={() => {
                      handleOptionChange(option);
                      setIsChecked(!isChecked);
                    }}
                  />
                  {saleSelectedOption === option ? (
                    <span className="custom-checkbox-checked">
                      <FontAwesomeIcon
                        className="checkbox-icon"
                        icon={faCheck}
                        style={{ height: "10px", width: "10px" }}
                      />
                    </span>
                  ) : (
                    <span className="custom-checkbox-unchecked"></span>
                  )}
                  {option}
                </label>
              ))}
            </div>
            {saleSelectedOption && (
              <div className="sale-rent-dropdown-buttons">
                <button
                  className="sale-rent-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="sale-rent-close-button"
                  onClick={() => setIsOpen(false)}
                >
                  Choose
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleRentDropdown;
