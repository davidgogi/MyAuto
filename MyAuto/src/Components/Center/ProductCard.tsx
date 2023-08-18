import { useState, useEffect, useMemo, useContext } from "react";
import "./ProductCard.css";
import Carousel from "././Carousel";
import { AppContext } from "../../Contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

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

const ProductCard: React.FC = () => {
  const {
    selectedCurrencyIndex,
    setSelectedCurrencyIndex,
    setSearchButton,
    setManSelectedOptions,
    setModSelectedOptions,
    setCatSelectedOptions,
    setPriceFrom,
    setPriceTo,
    prod_options,
    mans_options,
    setSortSelectedOption,
    setPerSelectedOption,
    setFilters,
    prodsLoading,
    meta,
    currentPage,
    setCurrentPage,
  } = useContext(AppContext);
  const [modelList, setModelList] = useState<Array<[number, string]>>([]);

  const modelCache: Record<number, ModelOption[]> = {};

  const getModelName = useMemo(
    () =>
      async (man_id: number, model_id: number): Promise<string> => {
        if (modelCache[man_id]) {
          const foundModel = modelCache[man_id].find(
            (model) => model.model_id === model_id
          );
          if (foundModel) {
            return foundModel.model_name;
          }
        }

        const url = `https://api2.myauto.ge/en/getManModels?man_id=${man_id}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          const foundModel = data.data.find(
            (model: ModelOption) => model.model_id === model_id
          );
          if (foundModel) {
            if (!modelCache[man_id]) {
              modelCache[man_id] = [foundModel];
            } else {
              modelCache[man_id].push(foundModel);
            }
            return foundModel.model_name;
          }
        } catch (error) {
          console.error("Error:", error);
        }

        return "";
      },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const updatedModelList: Array<[number, string]> = [];

      for (const product of prod_options) {
        const modelName = await getModelName(product.man_id, product.model_id);
        updatedModelList.push([product.model_id, modelName]);
      }

      setModelList(updatedModelList);
    };

    fetchData();
  }, [getModelName, prod_options]);

  // useEffect(() => {
  //   setTotalPages(Math.ceil(prod_options.length / prod_optionsPerPage));
  //   currentPage > Math.ceil(prod_options.length / prod_optionsPerPage) &&
  //     setCurrentPage(1);
  // }, [prod_options]);

  const handleCurrencyToggle = () => {
    setSelectedCurrencyIndex(selectedCurrencyIndex === 0 ? 1 : 0);
  };

  function mapFuelType(fuelTypeId: number): string {
    switch (fuelTypeId) {
      case 8:
        return "CNG";
      case 6:
        return "Hybrid";
      case 7:
        return "Electronic";
      case 3:
        return "Diesel";
      case 2:
        return "Petrol";
      default:
        return "Unknown";
    }
  }

  function mapGearType(gearTypeId: number): string {
    switch (gearTypeId) {
      case 2:
        return "Automatic";
      case 3:
        return "Tiptronic";
      case 1:
        return "Manual";
      case 4:
        return "Variator";
      case 0:
        return "";
      default:
        return "Unknown";
    }
  }

  function getManName(man_id: string): string {
    const foundMan = mans_options.find((man) => man.man_id === man_id);
    return foundMan ? foundMan.man_name : "";
  }

  function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word?.replace(word[0], word[0]?.toUpperCase());
      })
      .join(" ");
  }

  function mapDoorType(doorTypeId: number): string {
    return doorTypeId % 2 === 0 ? "Left" : "Right";
  }

  function getTimeDifference(orderDate: string) {
    const currentDate: Date = new Date();
    const orderDateObj: Date = new Date(orderDate);

    const differenceInMilliseconds: number =
      currentDate.getTime() - orderDateObj.getTime();
    const differenceInSeconds: number = Math.floor(
      differenceInMilliseconds / 1000
    );
    const differenceInMinutes: number = Math.floor(differenceInSeconds / 60);
    const differenceInHours: number = Math.floor(differenceInMinutes / 60);
    const differenceInDays: number = Math.floor(differenceInHours / 24);
    const differenceInMonths: number = Math.floor(differenceInDays / 30);
    const differenceInYears: number = Math.floor(differenceInDays / 365);

    return differenceInMinutes < 2
      ? "a minute ago"
      : differenceInMinutes < 60
      ? `${differenceInMinutes} minutes ago`
      : differenceInHours < 2
      ? "an hour ago"
      : differenceInHours < 24
      ? `${differenceInHours} hours ago`
      : differenceInDays < 2
      ? "a day ago"
      : differenceInDays < 30
      ? `${differenceInDays} days ago`
      : differenceInMonths < 2
      ? "a month ago"
      : differenceInMonths < 12
      ? `${differenceInMonths} months ago`
      : differenceInYears < 2
      ? "a year ago"
      : `${differenceInYears} years ago`;
  }

  const handleClearButton = () => {
    setSearchButton({
      Mans: "",
      Cats: "",
      PriceTo: "",
      PriceFrom: "",
      ForRent: "",
    });
    setManSelectedOptions([]);
    setModSelectedOptions([]);
    setCatSelectedOptions([]);
    setPriceFrom("");
    setPriceTo("");
    setSortSelectedOption({
      value: "",
      label: "Sort",
    });
    setPerSelectedOption({
      value: "",
      label: "Period",
    });
    setFilters([]);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // const indexOfLastProduct = currentPage * prod_optionsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - prod_optionsPerPage;
  // const currentProd_options = prod_options.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  return prod_options.length > 0 ? (
    !prodsLoading ? (
      <div className="all-prod_options">
        {prod_options.map((product) => (
          <div key={product.car_id} className="product-card">
            <div className="card-photo">
              {" "}
              <Carousel
                imageBaseUrl={`https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_{PHOTO_INDEX}.jpg`}
                photo_ver={product.photo_ver}
              />
            </div>

            <div className="card-info">
              <header>
                <div className="long-info">
                  {product.for_rent && (
                    <div className="parent-for-rent">
                      {" "}
                      <div className="for-rent-icon">For rent</div>
                    </div>
                  )}
                  <p>{toTitleCase(getManName(product.man_id.toString()))}</p>

                  {(() => {
                    const [modelId, modelName] =
                      [...modelList].find(
                        ([modelId]) => modelId === product.model_id
                      ) || [];
                    return <p key={modelId}>{modelName}</p>;
                  })()}

                  <p className="car-model-del">{product.car_model}</p>
                  <p className="years-number">{product.prod_year} y</p>
                </div>

                <div className="short-info">
                  {product.customs_passed ? (
                    <div className="customs-check">
                      {" "}
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ height: "10px", width: "10px" }}
                      />{" "}
                      <span>Customs-cleared</span>
                    </div>
                  ) : (
                    <div className="customs-uncheck">
                      {" "}
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ height: "10px", width: "10px" }}
                      />{" "}
                      <span>Customs-uncleared</span>
                    </div>
                  )}
                </div>
              </header>
              <div className="product-info">
                <aside className="left">
                  <p>
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.525 0c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 4.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V5.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77V8.086h1.18v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17a.67.67 0 0 0 .395-.13l1.88-1.393a.648.648 0 0 0 .263-.52V8.086H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V1.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525Zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 10.7H5.959L4.742 9.498a.662.662 0 0 0-.465-.19h-.282V5.965h.282a.662.662 0 0 0 .465-.19Z"
                        fill="#9CA2AA"
                      />
                    </svg>
                    {product.engine_volume / 1000}{" "}
                    {mapFuelType(product.fuel_type_id)}
                  </p>
                  <p>
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x=".6"
                        y="7.6"
                        width="10.8"
                        height="7.8"
                        rx="1.2"
                        stroke="#8C929B"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M6 5v5"
                        stroke="#8C929B"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12v1.5"
                        stroke="#8C929B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="6"
                        cy="2.5"
                        r="1.8"
                        stroke="#8C929B"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M3 10v3m6-3v3"
                        stroke="#8C929B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {mapGearType(product.gear_type_id)}
                  </p>
                </aside>
                <center>
                  <p>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="6.3"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                      />
                      <circle
                        cx="7"
                        cy="7"
                        r="1.3"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M11 7a4 4 0 1 0-8 0"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="m8 6 1.5-1.5"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {product.car_run_km} km
                  </p>

                  <p>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="6.3"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                      />
                      <circle
                        cx="7"
                        cy="7"
                        r="1.3"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                      />
                      <path
                        d="m8.5 7 4-1.5M5.214 7 1 6.299M7 8.5V13"
                        stroke="#9CA2AA"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {mapDoorType(product.door_type_id)}
                  </p>
                </center>
                <aside className="right">
                  {product.price_value === 0 || product.price_value === null ? (
                    <p className="product-price-neg">Price negotiable</p>
                  ) : (
                    <p className="product-price">
                      {selectedCurrencyIndex === 0
                        ? Math.floor(product.price_value).toLocaleString(
                            "en-US"
                          )
                        : Math.floor(product.price_usd).toLocaleString("en-US")}
                    </p>
                  )}

                  {product.price_value !== 0 &&
                    product.price_value !== null && (
                      <div className="button-box">
                        <button
                          className={`lari-btn ${
                            selectedCurrencyIndex === 0 ? "selected" : ""
                          }`}
                          onClick={handleCurrencyToggle}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                          >
                            <path d="M8.914 11V9.311H5.251a2.938 2.938 0 0 1-1.643-.46 3 3 0 0 1-1.089-1.3 4.608 4.608 0 0 1-.384-1.94 5 5 0 0 1 .343-1.987A2.543 2.543 0 0 1 3.59 2.399v3.372h.894v-3.64a2.492 2.492 0 0 1 .48-.044 2.936 2.936 0 0 1 .5.044v3.64h.894V2.4a2.469 2.469 0 0 1 1.134 1.24 5.547 5.547 0 0 1 .343 2.132H10a6.022 6.022 0 0 0-.439-2.324 4.874 4.874 0 0 0-1.263-1.8A4.534 4.534 0 0 0 6.359.629V0h-.894v.472L5.229.465Q5.148.458 4.993.458q-.347 0-.51.015V0h-.894v.631a4.67 4.67 0 0 0-1.891.982A4.823 4.823 0 0 0 .442 3.284 4.872 4.872 0 0 0 0 5.33a5.7 5.7 0 0 0 .229 1.61 4.62 4.62 0 0 0 .672 1.4 3.294 3.294 0 0 0 1.056.968v.058H.546V11Z" />
                          </svg>{" "}
                        </button>
                        <button
                          className={`dollar-btn ${
                            selectedCurrencyIndex === 1 ? "selected" : ""
                          }`}
                          onClick={handleCurrencyToggle}
                        >
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
                          </svg>{" "}
                        </button>
                      </div>
                    )}
                </aside>
              </div>
              <footer>
                <div className="views-time">
                  <p>{product.views} views</p>
                  <p className="dot"> •</p>
                  <p>{getTimeDifference(product.order_date)}</p>
                </div>
                <div className="right-icons">
                  <svg className="comment" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.917 7a.75.75 0 0 1 .75-.75h4.666a.75.75 0 0 1 0 1.5H5.667a.75.75 0 0 1-.75-.75Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.72 2.006C2.463 1.264 3.496.87 4.667.87h6.666c1.17 0 2.204.394 2.947 1.136.743.743 1.137 1.777 1.137 2.947v4c0 1.17-.394 2.205-1.137 2.947-.58.58-1.336.947-2.197 1.08v.727c0 1.136-1.263 1.8-2.198 1.178m-.001 0-2.777-1.848h-2.44c-1.17 0-2.204-.394-2.947-1.137C.977 11.158.583 10.124.583 8.953v-4c0-1.17.394-2.204 1.137-2.947m1.06 1.061c-.423.424-.697 1.057-.697 1.886v4c0 .83.273 1.463.697 1.887.424.424 1.057.697 1.887.697h2.666a.75.75 0 0 1 .416.125l2.834 1.886v-1.261a.75.75 0 0 1 .75-.75c.83 0 1.463-.274 1.887-.697.423-.424.697-1.057.697-1.887v-4c0-.83-.274-1.462-.697-1.886-.424-.424-1.057-.697-1.887-.697H4.667c-.83 0-1.463.273-1.887.697Z"
                    />
                  </svg>
                  <svg className="eye" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.197 1.864a.75.75 0 1 0-1.06-1.061l-2.18 2.179C10.764 2.182 9.41 1.737 8 1.737c-2.671 0-5.078 1.575-6.706 4.133C.9 6.49.727 7.27.727 8.003c0 .734.172 1.514.567 2.133V5.87v4.267c.464.728.994 1.379 1.573 1.935L.803 14.136a.75.75 0 0 0 1.06 1.061l4.98-4.98.009-.008 3.357-3.357.008-.008 4.98-4.98ZM9.623 5.316l1.249-1.248C9.969 3.52 8.992 3.237 8 3.237c-2.035 0-4.015 1.197-5.44 3.439h-.001c-.205.321-.332.801-.332 1.327 0 .526.127 1.006.332 1.327.41.644.874 1.209 1.37 1.681l1.387-1.388a3.134 3.134 0 0 1 4.307-4.307ZM6.363 8A1.634 1.634 0 0 1 8.5 6.44L6.44 8.5a1.632 1.632 0 0 1-.078-.5Zm6.534-3.298a.75.75 0 0 1 1.054.115c.26.323.517.672.755 1.047.395.62.568 1.399.568 2.133s-.173 1.513-.568 2.133c-1.628 2.558-4.034 4.133-6.706 4.133a6.892 6.892 0 0 1-2.678-.552.75.75 0 1 1 .583-1.382A5.394 5.394 0 0 0 8 12.763c2.035 0 4.015-1.198 5.44-3.439h.001c.205-.321.332-.802.332-1.327 0-.526-.127-1.006-.332-1.327a10.065 10.065 0 0 0-.659-.912.75.75 0 0 1 .115-1.055Zm-1.82 3.9a.75.75 0 1 0-1.475-.271 1.627 1.627 0 0 1-1.278 1.278.75.75 0 1 0 .272 1.475 3.126 3.126 0 0 0 2.481-2.481Z"
                    />
                  </svg>
                  <svg className="heart" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.686 2.168a4.292 4.292 0 0 0-.495.421l-.128.132L8 2.79l-.063-.07-.128-.13a4.292 4.292 0 0 0-.495-.422A3.373 3.373 0 0 0 5.3 1.5C2.585 1.5 1 3.877 1 6.304c0 2.375 1.191 4.437 3.137 6.096C5.505 13.567 7.295 14.5 8 14.5c.705 0 2.495-.933 3.863-2.1C13.81 10.74 15 8.68 15 6.304 15 3.877 13.415 1.5 10.7 1.5a3.37 3.37 0 0 0-2.014.668Zm-2.01 1.55C6.238 3.292 5.79 3.1 5.3 3.1c-1.549 0-2.7 1.348-2.7 3.204 0 1.784.881 3.434 2.575 4.879a11.28 11.28 0 0 0 1.899 1.295c.306.164.568.283.768.356.07.026.122.042.158.052.036-.01.088-.026.158-.052.2-.073.463-.192.769-.356a11.21 11.21 0 0 0 1.898-1.295C12.519 9.738 13.4 8.088 13.4 6.304c0-1.856-1.151-3.204-2.7-3.204-.49 0-.939.191-1.375.619l-.097.099L8 5.17 6.772 3.818l-.097-.1Z"
                    />
                  </svg>
                </div>
              </footer>
            </div>
          </div>
        ))}

        <div className="pagination-bar">
          {currentPage !== 1 && (
            <>
              {" "}
              <button onClick={() => handlePageChange(1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.414"
                  height="8.829"
                  viewBox="0 0 13.414 8.829"
                >
                  <g transform="translate(1 1.414)">
                    <path
                      d="M12,12,9,9l3-3"
                      transform="translate(-1 -6)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                        strokeLinejoin: "round",
                      }}
                    />
                    <path
                      d="M12,12,9,9l3-3"
                      transform="translate(-6 -6)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                        strokeLinejoin: "round",
                      }}
                    />
                    <line
                      y2="6"
                      transform="translate(0)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                      }}
                    />
                  </g>
                </svg>
              </button>
              <button onClick={() => handlePageChange(currentPage - 1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5.414"
                  height="8.829"
                  viewBox="0 0 5.414 8.829"
                >
                  <path
                    d="M12,12,9,9l3-3"
                    transform="translate(-8 -4.586)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2px",
                    }}
                  />
                </svg>
              </button>
            </>
          )}
          {Array.from({ length: meta.last_page }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = currentPage === pageNumber;
            const isWithinRange =
              pageNumber >=
                Math.max(
                  currentPage -
                    (currentPage > meta.last_page - 3
                      ? 7 - (meta.last_page - currentPage+1)
                      : 3),
                  1
                ) &&
              pageNumber <=
                Math.min(
                  currentPage + (currentPage < 4 ? 7 - currentPage : 3),
                  meta.last_page
                );

            if (isWithinRange) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handlePageChange(pageNumber);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={isCurrentPage ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {currentPage !== meta.last_page && (
            <>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5.414"
                  height="8.829"
                  viewBox="0 0 5.414 8.829"
                >
                  <path
                    d="M9,12l3-3L9,6"
                    transform="translate(-7.586 -4.586)"
                    style={{
                      fill: "none",
                      stroke: "rgb(253, 65, 0)",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2px",
                    }}
                  />
                </svg>
              </button>
              <button onClick={() => handlePageChange(meta.last_page)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.414"
                  height="8.829"
                  viewBox="0 0 13.414 8.829"
                >
                  <g transform="translate(-1134.586 -2682.586)">
                    <path
                      d="M9,12l3-3L9,6"
                      transform="translate(1127 2678)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                        strokeLinejoin: "round",
                      }}
                    />
                    <path
                      d="M9,12l3-3L9,6"
                      transform="translate(1132 2678)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                        strokeLinejoin: "round",
                      }}
                    />
                    <line
                      y2="6"
                      transform="translate(1147 2684)"
                      style={{
                        fill: "none",
                        stroke: "rgb(253, 65, 0)",
                        strokeLinecap: "round",
                        strokeWidth: "2px",
                      }}
                    />
                  </g>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    ) : (
      <div className="all-prod_options">
        {prod_options.map((product) => (
          <div key={product.car_id} className="product-card">
            <div className="card-photo">
              {" "}
              <Carousel imageBaseUrl={""} photo_ver={1} />
            </div>

            <div className="card-info">
              <header>
                <div className="long-info">
                  <p
                    style={{
                      background: "lightgray",
                      width: "80%",
                      height: "15px",
                      borderEndStartRadius: "6px",
                      borderTopLeftRadius: "6px",
                    }}
                  ></p>
                  <p
                    style={{
                      background: "lightgray",
                      width: "60%",
                      height: "15px",
                    }}
                  ></p>
                  <p
                    style={{
                      background: "lightgray",
                      width: "70%",
                      height: "15px",
                    }}
                  ></p>
                  <p
                    style={{
                      background: "lightgray",
                      width: "50%",
                      height: "15px",
                      borderEndEndRadius: "6px",
                      borderTopRightRadius: "6px",
                    }}
                  ></p>
                </div>

                <div className="short-info">
                  <div className="customs-uncheck"></div>
                </div>
              </header>
              <div className="product-info">
                <aside className="left">
                  <p
                    style={{
                      background: "lightgray",
                      width: "70%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  >
                    {" "}
                  </p>
                  <p
                    style={{
                      background: "lightgray",
                      width: "60%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  >
                    {" "}
                  </p>
                </aside>
                <center>
                  <p
                    style={{
                      background: "lightgray",
                      width: "50%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  >
                    <span className="grey-place"></span>
                  </p>

                  {/* Display empty field */}
                  <p
                    style={{
                      background: "lightgray",
                      width: "70%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  ></p>
                </center>
                <aside className="right">
                  {/* Display empty field */}
                  <p className="product-price-neg"></p>
                </aside>
              </div>
              <footer>
                <div className="views-time">
                  <p
                    style={{
                      background: "lightgray",
                      width: "30%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  ></p>
                  <p className="dot"> •</p>
                  <p
                    style={{
                      background: "lightgray",
                      width: "50%",
                      height: "15px",
                      borderRadius: "6px",
                    }}
                  ></p>
                </div>
                <div className="right-icons">
                  <svg className="comment" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.917 7a.75.75 0 0 1 .75-.75h4.666a.75.75 0 0 1 0 1.5H5.667a.75.75 0 0 1-.75-.75Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.72 2.006C2.463 1.264 3.496.87 4.667.87h6.666c1.17 0 2.204.394 2.947 1.136.743.743 1.137 1.777 1.137 2.947v4c0 1.17-.394 2.205-1.137 2.947-.58.58-1.336.947-2.197 1.08v.727c0 1.136-1.263 1.8-2.198 1.178m-.001 0-2.777-1.848h-2.44c-1.17 0-2.204-.394-2.947-1.137C.977 11.158.583 10.124.583 8.953v-4c0-1.17.394-2.204 1.137-2.947m1.06 1.061c-.423.424-.697 1.057-.697 1.886v4c0 .83.273 1.463.697 1.887.424.424 1.057.697 1.887.697h2.666a.75.75 0 0 1 .416.125l2.834 1.886v-1.261a.75.75 0 0 1 .75-.75c.83 0 1.463-.274 1.887-.697.423-.424.697-1.057.697-1.887v-4c0-.83-.274-1.462-.697-1.886-.424-.424-1.057-.697-1.887-.697H4.667c-.83 0-1.463.273-1.887.697Z"
                    />
                  </svg>
                  <svg className="eye" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.197 1.864a.75.75 0 1 0-1.06-1.061l-2.18 2.179C10.764 2.182 9.41 1.737 8 1.737c-2.671 0-5.078 1.575-6.706 4.133C.9 6.49.727 7.27.727 8.003c0 .734.172 1.514.567 2.133V5.87v4.267c.464.728.994 1.379 1.573 1.935L.803 14.136a.75.75 0 0 0 1.06 1.061l4.98-4.98.009-.008 3.357-3.357.008-.008 4.98-4.98ZM9.623 5.316l1.249-1.248C9.969 3.52 8.992 3.237 8 3.237c-2.035 0-4.015 1.197-5.44 3.439h-.001c-.205.321-.332.801-.332 1.327 0 .526.127 1.006.332 1.327.41.644.874 1.209 1.37 1.681l1.387-1.388a3.134 3.134 0 0 1 4.307-4.307ZM6.363 8A1.634 1.634 0 0 1 8.5 6.44L6.44 8.5a1.632 1.632 0 0 1-.078-.5Zm6.534-3.298a.75.75 0 0 1 1.054.115c.26.323.517.672.755 1.047.395.62.568 1.399.568 2.133s-.173 1.513-.568 2.133c-1.628 2.558-4.034 4.133-6.706 4.133a6.892 6.892 0 0 1-2.678-.552.75.75 0 1 1 .583-1.382A5.394 5.394 0 0 0 8 12.763c2.035 0 4.015-1.198 5.44-3.439h.001c.205-.321.332-.802.332-1.327 0-.526-.127-1.006-.332-1.327a10.065 10.065 0 0 0-.659-.912.75.75 0 0 1 .115-1.055Zm-1.82 3.9a.75.75 0 1 0-1.475-.271 1.627 1.627 0 0 1-1.278 1.278.75.75 0 1 0 .272 1.475 3.126 3.126 0 0 0 2.481-2.481Z"
                    />
                  </svg>
                  <svg className="heart" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.686 2.168a4.292 4.292 0 0 0-.495.421l-.128.132L8 2.79l-.063-.07-.128-.13a4.292 4.292 0 0 0-.495-.422A3.373 3.373 0 0 0 5.3 1.5C2.585 1.5 1 3.877 1 6.304c0 2.375 1.191 4.437 3.137 6.096C5.505 13.567 7.295 14.5 8 14.5c.705 0 2.495-.933 3.863-2.1C13.81 10.74 15 8.68 15 6.304 15 3.877 13.415 1.5 10.7 1.5a3.37 3.37 0 0 0-2.014.668Zm-2.01 1.55C6.238 3.292 5.79 3.1 5.3 3.1c-1.549 0-2.7 1.348-2.7 3.204 0 1.784.881 3.434 2.575 4.879a11.28 11.28 0 0 0 1.899 1.295c.306.164.568.283.768.356.07.026.122.042.158.052.036-.01.088-.026.158-.052.2-.073.463-.192.769-.356a11.21 11.21 0 0 0 1.898-1.295C12.519 9.738 13.4 8.088 13.4 6.304c0-1.856-1.151-3.204-2.7-3.204-.49 0-.939.191-1.375.619l-.097.099L8 5.17 6.772 3.818l-.097-.1Z"
                    />
                  </svg>
                </div>
              </footer>
            </div>
          </div>
        ))}
      </div>
    )
  ) : (
    <div className="not-found">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="76.461"
        height="80"
        viewBox="0 0 76.461 80"
      >
        <path
          fill="#ffce99"
          d="M24.956 68.096V35.159a13.275 13.275 0 0 1 26.549 0v32.937z"
          opacity=".504"
        />
        <path
          d="M73.483 76.875h-4.792v-8.779a1.563 1.563 0 0 0-1.562-1.562h-3.487V35.221A25.381 25.381 0 0 0 38.29 9.866h-.119a25.381 25.381 0 0 0-25.353 25.355v31.315H9.333a1.563 1.563 0 0 0-1.562 1.563v8.779H2.977a1.563 1.563 0 1 0 0 3.125h70.506a1.563 1.563 0 0 0 0-3.125zm-57.54-41.654a22.252 22.252 0 0 1 22.228-22.23h.119a22.253 22.253 0 0 1 22.227 22.23v31.315H39.793V51.878a6.287 6.287 0 1 0-3.125 0v14.655H15.943zm22.29 13.728a3.139 3.139 0 1 1 3.162-3.139 3.154 3.154 0 0 1-3.162 3.139zM10.894 76.875v-7.217h54.672v7.217zM38.231 5.85a1.563 1.563 0 0 0 1.563-1.562V1.563a1.563 1.563 0 0 0-3.125 0v2.724a1.563 1.563 0 0 0 1.562 1.563zm36.668 30.635h-2.738a1.563 1.563 0 0 0 0 3.125h2.738a1.563 1.563 0 0 0 0-3.125zM4.301 39.61a1.563 1.563 0 0 0 0-3.125H1.562a1.563 1.563 0 1 0 0 3.125zm57.922-23.872a1.558 1.558 0 0 0 1.1-.455l1.936-1.927a1.563 1.563 0 0 0-2.2-2.215l-1.936 1.927a1.563 1.563 0 0 0 1.1 2.67zm-49.087-.454a1.563 1.563 0 0 0 2.2-2.215L13.4 11.142a1.563 1.563 0 0 0-2.2 2.215z"
          fill="#272a37"
        />
      </svg>
      <h3>Ads not found </h3>
      <p>
        There are no vehicles available at this time that match your search
        criteria. Consider expanding your search or save this search to get
        notified when matching inventory is available.
      </p>
      <button onClick={handleClearButton}>Clear Filter</button>
    </div>
  );
};

export default ProductCard;
