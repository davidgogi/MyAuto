import { useState, useContext } from "react";
import "./GroupModelDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../Contexts/AppContext";

interface ModelOption {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: number;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
}

interface GroupModelDropdownProps {
  model_group: string;
  options: ModelOption[];
  handleCheckboxChange: (option: ModelOption) => void;
  modelInputRef: React.RefObject<HTMLInputElement>;
}

const GroupModelDropdown: React.FC<GroupModelDropdownProps> = ({
  model_group,
  options,
  handleCheckboxChange,
  modelInputRef,
}) => {
  const {
    setModIsCloseButtonSelected,
    modelSelectedOptions,
    setModSelectedOptions,
  } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAllModelCheck = () => {
    const areAllOptionsSelected = options.every((option) =>
      modelSelectedOptions.some(
        (selectedOption) => selectedOption.model_id === option.model_id
      )
    );

    let updatedModSelectedOptions: ModelOption[];

    if (areAllOptionsSelected) {
      updatedModSelectedOptions = modelSelectedOptions.filter(
        (selectedOption) =>
          !options.some((option) => option.model_id === selectedOption.model_id)
      );
    } else {
      const optionsToAdd = options.filter(
        (option) =>
          !modelSelectedOptions.some(
            (selectedOption) => selectedOption.model_id === option.model_id
          )
      );
      updatedModSelectedOptions = [...modelSelectedOptions, ...optionsToAdd];
    }

    if (updatedModSelectedOptions.length === 0) {
      setModIsCloseButtonSelected(false);
    } else {
      setModIsCloseButtonSelected(true);
    }
    setModSelectedOptions(updatedModSelectedOptions);

    if (modelInputRef.current) {
      modelInputRef.current.placeholder = updatedModSelectedOptions
        .map((selectedOption) => selectedOption.model_name)
        .join(", ");
    }
  };

  const areAllOptionsChecked = options.every((option) =>
    modelSelectedOptions.some(
      (selectedOption) => selectedOption.model_id === option.model_id
    )
  );

  const areSomeOptionsChecked = options.some((option) =>
    modelSelectedOptions.some(
      (selectedOption) => selectedOption.model_id === option.model_id
    )
  );

  const toggleSubDropdown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div key={model_group} className="group-dropdown">
      {model_group && (
        <div className="model-group-chevron">
          <label>
            <input type="checkbox" onChange={handleAllModelCheck} />
            {areAllOptionsChecked ? (
              <span className="custom-checkbox-checked">
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ height: "10px", width: "10px" }}
                />
              </span>
            ) : areSomeOptionsChecked ? (
              <span className="custom-checkbox-checked">
                <FontAwesomeIcon
                  icon={faMinus}
                  style={{ height: "10px", width: "10px" }}
                />
              </span>
            ) : (
              <span className="custom-checkbox-unchecked"></span>
            )}
            <span className="dropdown-title">{model_group}</span>
          </label>
          <span
            className={`chevron-icon ${isDropdownOpen ? "rotate" : ""} `}
            onClick={toggleSubDropdown}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{
                height: "8px",
                width: "8px",
                color: "rgb(111, 115, 131)",
              }}
            />
          </span>
        </div>
      )}
      {isDropdownOpen && (
        <div className="grouped-dropdown-content">
          {options.map((option) => (
            <label key={option.model_id}>
              <input
                type="checkbox"
                checked={modelSelectedOptions.some(
                  (selectedOption) =>
                    selectedOption.model_id === option.model_id
                )}
                onChange={() => {
                  handleCheckboxChange(option);
                  setIsChecked(!isChecked);
                }}
              />
              {modelSelectedOptions.some(
                (selectedOption) => selectedOption.model_id === option.model_id
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
              {option.model_name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupModelDropdown;
