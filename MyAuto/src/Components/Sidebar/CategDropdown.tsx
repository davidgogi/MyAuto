import "./CategDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

interface CategOption {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

interface CategDropdownProps {
  options: CategOption[];
}

const CategDropdown: React.FC<CategDropdownProps> = ({ options }) => {
  const {
    catSelectedOptions,
    setCatSelectedOptions,
    setIsCategCloseButtonSelected,
    isCategCloseButtonSelected,
  } = useContext(AppContext);

  const [categTerm, setCategTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const categInputRef = useRef<HTMLInputElement>(null);
  const categDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categDropdownRef.current &&
        !categDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (categInputRef?.current?.placeholder === "Category") {
          setCategTerm("");
        }
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: CategOption) => {
    const isSelected = catSelectedOptions.some(
      (selectedOption) => selectedOption.category_id === option.category_id
    );

    let updatedSelectedOptions: CategOption[];

    if (isSelected) {
      updatedSelectedOptions = catSelectedOptions.filter(
        (selectedOption) => selectedOption.category_id !== option.category_id
      );
      if (updatedSelectedOptions.length === 0 && isCategCloseButtonSelected) {
        setIsCategCloseButtonSelected(false);
      }
    } else {
      updatedSelectedOptions = [...catSelectedOptions, option];
      if (!isCategCloseButtonSelected) {
        setIsCategCloseButtonSelected(true);
      }
    }

    // Sort the updated selected options by category_id
    updatedSelectedOptions.sort((a, b) => a.category_id - b.category_id);

    setCatSelectedOptions(updatedSelectedOptions);

    if (categInputRef.current) {
      categInputRef.current.placeholder = updatedSelectedOptions
        .map((selectedOption) => selectedOption.title)
        .join(", ");
    }
  };

  // const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
  //   event.stopPropagation();
  //   handleContainerClick();
  // };

  const handleCategTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategTerm(event.target.value);
  };

  const toggleCategDropdown = () => {
    if (isCategCloseButtonSelected) {
      setCatSelectedOptions([]);
      setIsCategCloseButtonSelected(!isCategCloseButtonSelected);
    } else {
      if (categInputRef?.current?.placeholder === "Category") {
        setCategTerm("");
      }
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    if (!isOpen && !isCategCloseButtonSelected) {
      setIsOpen(true);
      categInputRef?.current?.focus(); // Set focus on the categ input field
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setCategTerm("");
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setCatSelectedOptions([]);
    setIsCategCloseButtonSelected(false);
  };

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().startsWith(categTerm.toLowerCase())
  );

  return (
    <div className="categ-dropdown-container" ref={categDropdownRef}>
      <div
        onClick={handleContainerClick}
        className={`categ-container ${
          catSelectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          id="3"
          placeholder={
            catSelectedOptions.length > 0
              ? catSelectedOptions
                  .map((selectedOption) => selectedOption.title)
                  .join(", ")
              : "Category"
          }
          value={categTerm}
          onChange={handleCategTermChange}
          ref={categInputRef}
          onClick={() => {
            setIsOpen(true);
          }}
          autoComplete="off"
        />
        <button
          onClick={toggleCategDropdown}
          className={
            isCategCloseButtonSelected ? "rotate-x" : isOpen ? "rotate" : ""
          }
        >
          {isCategCloseButtonSelected ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div className={isOpen ? "categ-dropdown-content" : ""}>
        {" "}
        {isOpen && (
          <div className="categ-dropdown">
            <div className="categ-dropdown-options">
              {filteredOptions.length === 0 ? (
                <span>No records</span>
              ) : (
                filteredOptions.map((option) => (
                  <label key={option.category_id}>
                    <input
                      type="checkbox"
                      checked={catSelectedOptions.some(
                        (selectedOption) =>
                          selectedOption.category_id === option.category_id
                      )}
                      onChange={() => {
                        handleCheckboxChange(option);
                        setIsChecked(!isChecked);
                      }}
                    />
                    {catSelectedOptions.some(
                      (selectedOption) =>
                        selectedOption.category_id === option.category_id
                    ) ? (
                      <span className="custom-checkbox-checked">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ height: "10px", width: "10px" }}
                        />
                      </span>
                    ) : (
                      <span className="custom-checkbox-unchecked"></span>
                    )}
                    {option.title}
                  </label>
                ))
              )}
            </div>

            {catSelectedOptions.length > 0 && (
              <div className="categ-dropdown-buttons">
                <button
                  className="categ-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="categ-close-button"
                  onClick={handleCloseWithSelection}
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

export default CategDropdown;
