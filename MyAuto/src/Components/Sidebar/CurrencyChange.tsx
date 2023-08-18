import "./CurrencyChange.css";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const CurrencyChange: React.FC = () => {
  const {
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    selectedCurrencyIndex,
    setSelectedCurrencyIndex,
  } = useContext(AppContext);
  const handleCurrencyToggle = () => {
    setSelectedCurrencyIndex(selectedCurrencyIndex === 0 ? 1 : 0);
  };

  const handlePriceToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const newPriceTo = value !== "" ? parseFloat(value) : 0;
    setPriceTo(Number.isNaN(newPriceTo) ? "" : value);
  };

  const handlePriceFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const newPriceTo = value !== "" ? parseFloat(value) : 0;
    setPriceFrom(Number.isNaN(newPriceTo) ? "" : value);
  };

  return (
    <main className="currency-main">
      <div className="header">
        Price
        <div className="button-box">
          <button
            className={`lari-btn ${
              selectedCurrencyIndex === 0 ? "selected" : ""
            }`}
            onClick={handleCurrencyToggle}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="11"
              viewBox="0 0 10 11"
            >
              <path d="M8.914 11V9.311H5.251a2.938 2.938 0 0 1-1.643-.46 3 3 0 0 1-1.089-1.3 4.608 4.608 0 0 1-.384-1.94 5 5 0 0 1 .343-1.987A2.543 2.543 0 0 1 3.59 2.399v3.372h.894v-3.64a2.492 2.492 0 0 1 .48-.044 2.936 2.936 0 0 1 .5.044v3.64h.894V2.4a2.469 2.469 0 0 1 1.134 1.24 5.547 5.547 0 0 1 .343 2.132H10a6.022 6.022 0 0 0-.439-2.324 4.874 4.874 0 0 0-1.263-1.8A4.534 4.534 0 0 0 6.359.629V0h-.894v.472L5.229.465Q5.148.458 4.993.458q-.347 0-.51.015V0h-.894v.631a4.67 4.67 0 0 0-1.891.982A4.823 4.823 0 0 0 .442 3.284 4.872 4.872 0 0 0 0 5.33a5.7 5.7 0 0 0 .229 1.61 4.62 4.62 0 0 0 .672 1.4 3.294 3.294 0 0 0 1.056.968v.058H.546V11Z" />
            </svg>
          </button>
          <button
            className={`dollar-btn ${
              selectedCurrencyIndex === 1 ? "selected" : ""
            }`}
            onClick={handleCurrencyToggle}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="14"
              viewBox="0 0 9 14"
            >
              <path
                data-name="$"
                d="M2.518 8.564H.544a3.8 3.8 0 0 0 1.022 2.506 3.783 3.783 0 0 0 2.45.966v1.19h.828v-1.19a4.359 4.359 0 0 0 1.72-.424 3.707 3.707 0 0 0 1.071-.8 2.62 2.62 0 0 0 .553-.917 2.6 2.6 0 0 0 .156-.771 7.425 7.425 0 0 0-.049-.8 2.226 2.226 0 0 0-.315-.9 3.024 3.024 0 0 0-.826-.861 4.839 4.839 0 0 0-1.6-.693q-.2-.056-.371-.1l-.339-.076V3.212a1.033 1.033 0 0 1 .81.4 1.472 1.472 0 0 1 .35.952h1.988a3.209 3.209 0 0 0-.308-1.26 2.783 2.783 0 0 0-.686-.892 3.178 3.178 0 0 0-.973-.56 5.033 5.033 0 0 0-1.181-.274V.5h-.828v1.078a4.667 4.667 0 0 0-1.218.245 3.291 3.291 0 0 0-1.036.574 2.8 2.8 0 0 0-.718.915 2.782 2.782 0 0 0-.273 1.26 2.569 2.569 0 0 0 .235 1.171 2.325 2.325 0 0 0 .637.784 3.337 3.337 0 0 0 .9.5q.5.189 1.022.329.14.028.259.063t.189.063v2.93a1.955 1.955 0 0 1-1.078-.588 1.72 1.72 0 0 1-.417-1.26Zm2.326 1.848V7.724a3.381 3.381 0 0 1 1.169.5.983.983 0 0 1 .343.819 1.152 1.152 0 0 1-.14.581 1.385 1.385 0 0 1-.357.413 1.641 1.641 0 0 1-.49.259 2.555 2.555 0 0 1-.525.116Zm-.828-7.2v2.282a2.3 2.3 0 0 1-.966-.406.889.889 0 0 1-.294-.714 1.162 1.162 0 0 1 .1-.511 1.048 1.048 0 0 1 .288-.36 1.219 1.219 0 0 1 .406-.217 1.54 1.54 0 0 1 .466-.074Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="from-to-ratio">
        <input
          id="4"
          type="text"
          placeholder="From"
          className="currency-input"
          onChange={handlePriceFromChange}
          autoComplete="off"
          value={priceFrom}
        />
        {" - "}
        <input
          id="5"
          type="text"
          placeholder="To"
          className="currency-input"
          onChange={handlePriceToChange}
          autoComplete="off"
          value={priceTo}
        />
      </div>
    </main>
  );
};

export default CurrencyChange;
