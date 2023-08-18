import "./ManDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface ManDropdownProps {
  options: ManOption[];
}

const ManDropdown: React.FC<ManDropdownProps> = ({ options }) => {
  const {
    setManSelectedOptions,
    manSelectedOptions,
    isManCloseButtonSelected,
    setManIsCloseButtonSelected,
    modelSelectedOptions,
    setModSelectedOptions,
    setModIsCloseButtonSelected,
  } = useContext(AppContext);
  const [manTerm, setManTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const manInputRef = useRef<HTMLInputElement>(null);
  const manDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        manDropdownRef.current &&
        !manDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setManTerm("");
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [manSelectedOptions]);

  const handleCheckboxChange = (option: ManOption) => {
    const isSelected = manSelectedOptions.some(
      (manSelectedOption) => manSelectedOption.man_id === option.man_id
    );

    let updatedManSelectedOptions: ManOption[];

    if (isSelected) {
      updatedManSelectedOptions = manSelectedOptions.filter(
        (manSelectedOption) => manSelectedOption.man_id !== option.man_id
      );
      if (updatedManSelectedOptions.length === 0 && isManCloseButtonSelected) {
        setManIsCloseButtonSelected(false);
      }
    } else {
      updatedManSelectedOptions = [...manSelectedOptions, option];
      if (!isManCloseButtonSelected) {
        setManIsCloseButtonSelected(true);
      }
    }

    updatedManSelectedOptions.sort((a, b) => a.man_id.localeCompare(b.man_id));
    setManSelectedOptions(updatedManSelectedOptions);

    const updatedModSelectedOptions = modelSelectedOptions.filter((model) => {
      updatedManSelectedOptions.some(
        (manOption) => manOption.man_id === model.man_id.toString()
      );
    });

    if (updatedModSelectedOptions.length === 0) {
      setModIsCloseButtonSelected(false);
    }

    setModSelectedOptions(updatedModSelectedOptions);

    if (manInputRef.current) {
      manInputRef.current.placeholder = updatedManSelectedOptions
        .map((selectedOption) => selectedOption.man_name)
        .join(", ");
    }
  };

  const handleManTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManTerm(event.target.value);
  };

  function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word?.replace(word[0], word[0]?.toUpperCase());
      })
      .join(" ");
  }

  const toggleManDropdown = () => {
    if (isManCloseButtonSelected) {
      setManSelectedOptions([]);
      setManIsCloseButtonSelected(!isManCloseButtonSelected);
      setModSelectedOptions([]);
      setModIsCloseButtonSelected(false);
    } else {
      if (manInputRef?.current?.placeholder === "Manufacturer") {
        setManTerm("");
      }
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    if (!isOpen && !isManCloseButtonSelected) {
      setIsOpen(true);
      manInputRef?.current?.focus();
      // }
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setManTerm("");
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setManSelectedOptions([]);
    setManIsCloseButtonSelected(false);
    setModSelectedOptions([]);
    setModIsCloseButtonSelected(false);
  };

  const filteredOptions = options
    .filter((option) =>
      option.man_name.toLowerCase().startsWith(manTerm.toLowerCase())
    )
    .sort((a, b) => a.man_name.localeCompare(b.man_name));

  return (
    <div className="man-dropdown-container" ref={manDropdownRef}>
      {" "}
      <div
        onClick={handleContainerClick}
        className={`man-container ${
          manSelectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          id="2"
          placeholder={
            manSelectedOptions.length > 0
              ? manSelectedOptions
                  .map((selectedOption) => toTitleCase(selectedOption.man_name))
                  .join(", ")
              : "Manufacturer"
          }
          value={manTerm}
          onChange={handleManTermChange}
          ref={manInputRef}
          onClick={() => {
            setIsOpen(true);
          }}
          autoComplete="off"
        />
        <button
          onClick={toggleManDropdown}
          className={
            isManCloseButtonSelected ? "rotate-x" : isOpen ? "rotate" : ""
          }
        >
          {isManCloseButtonSelected ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div className={isOpen ? "man-dropdown-content" : ""}>
        {isOpen && (
          <div className="man-dropdown">
            <div className="man-dropdown-options">
              {filteredOptions.length === 0 ? (
                <span>No records</span>
              ) : (
                filteredOptions.map((option) => (
                  <label key={option.man_id}>
                    <input
                      type="checkbox"
                      id={option.man_id}
                      checked={manSelectedOptions.some(
                        (selectedOption) =>
                          selectedOption.man_id === option.man_id
                      )}
                      onChange={() => {
                        handleCheckboxChange(option);
                        setIsChecked(!isChecked);
                      }}
                    />
                    {manSelectedOptions.some(
                      (selectedOption) =>
                        selectedOption.man_id === option.man_id
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
                    {toTitleCase(option.man_name)}
                  </label>
                ))
              )}
            </div>

            {manSelectedOptions.length > 0 && (
              <div className="man-dropdown-buttons">
                <button
                  className="man-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="man-close-button"
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

export default ManDropdown;
