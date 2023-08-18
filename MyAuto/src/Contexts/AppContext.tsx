import React, { createContext } from "react";

interface CategOption {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

interface ProductOption {
  car_id: number;
  status_id: number;
  user_id: number;
  dealer_user_id: number;
  paid_add: number;
  photo: string;
  pic_number: number;
  prod_year: number;
  prod_month: number;
  man_id: number;
  car_model: string;
  price: number;
  price_usd: number;
  first_deposit: number;
  price_value: number;
  fuel_type_id: number;
  gear_type_id: number;
  drive_type_id: number;
  door_type_id: number;
  color_id: number;
  saloon_color_id: number;
  cylinders: number;
  car_run: number;
  car_run_km: number;
  car_run_dim: number;
  engine_volume: number;
  airbags: number;
  abs: boolean;
  esd: boolean;
  el_windows: boolean;
  conditioner: boolean;
  leather: boolean;
  disks: boolean;
  nav_system: boolean;
  central_lock: boolean;
  hatch: boolean;
  right_wheel: boolean;
  alarm: boolean;
  board_comp: boolean;
  hydraulics: boolean;
  chair_warming: boolean;
  climat_control: boolean;
  obstacle_indicator: boolean;
  customs_passed: boolean;
  client_name: string;
  client_phone: number;
  model_id: number;
  location_id: number;
  parent_loc_id: number;
  tech_inspection: boolean;
  checked_for_duplicates: boolean;
  order_number: number;
  stickers: any;
  changable: boolean;
  auction: boolean;
  has_turbo: boolean;
  for_rent: boolean;
  rent_daily: boolean;
  rent_purchase: boolean;
  rent_insured: boolean;
  rent_driver: boolean;
  currency_id: number;
  vehicle_type: number;
  category_id: number;
  vin: string;
  user_type: any;
  prom_color: number;
  special_persons: boolean;
  back_camera: boolean;
  car_desc: string;
  order_date: string;
  video_url: string;
  hp: number;
  hours_used: number;
  photo_ver: number;
  checked: boolean;
  lang_type_id: number;
  el_starter: number;
  start_stop: boolean;
  trunk: boolean;
  windshield: boolean;
  inspected_in_greenway: boolean;
  license_number: string;
  words_checked: number;
  is_payd: boolean;
  condition_type_id: number;
  primary_damage_type: number;
  secondary_damage_type: number;
  auction_has_key: number;
  is_auction: number;
  saloon_material_id: number;
  map_lat: number;
  map_long: number;
  zoom: number;
  predicted_price: string;
  hdd: number;
  map_title: string;
  has_catalyst: number;
  tmp: string;
  views: number;
  dealerId: any;
  has_logo: any;
  logo_ver: any;
  active_ads: any;
  dealer_title: any;
  has_predicted_price: boolean;
  pred_first_breakpoint: number;
  pred_second_breakpoint: number;
  pred_min_price: number;
  pred_max_price: number;
  comfort_features: number[];
}

interface GroupedModelOption {
  man_name: string;
  options: ModelOption[];
}

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

type Search = {
  Mans: string;
  Cats: string;
  PriceTo: string;
  PriceFrom: string;
  ForRent: string;
};

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

interface OrderingOption {
  value: string;
  label: string;
}

interface PeriodOption {
  value: string;
  label: string;
}

interface FilterOption {
  type: string;
  id: string;
  label: string;
  mod_id?: string;
}

interface AppContextInterface {
  priceFrom: string;
  setPriceFrom: React.Dispatch<React.SetStateAction<string>>;
  priceTo: string;
  setPriceTo: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrencyIndex: number;
  setSelectedCurrencyIndex: React.Dispatch<React.SetStateAction<number>>;
  catSelectedOptions: CategOption[];
  setCatSelectedOptions: React.Dispatch<React.SetStateAction<CategOption[]>>;
  isCategCloseButtonSelected: boolean;
  setIsCategCloseButtonSelected: React.Dispatch<React.SetStateAction<boolean>>;
  pairManModel: GroupedModelOption[];
  manSelectedOptions: ManOption[];
  setManSelectedOptions: React.Dispatch<React.SetStateAction<ManOption[]>>;
  modelSelectedOptions: ModelOption[];
  setModSelectedOptions: React.Dispatch<React.SetStateAction<ModelOption[]>>;
  setManIsCloseButtonSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setModIsCloseButtonSelected: React.Dispatch<React.SetStateAction<boolean>>;
  isModCloseButtonSelected: boolean;
  isManCloseButtonSelected: boolean;
  saleSelectedOption: string;
  setSaleSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  mans_options: ManOption[];
  cats_options: CategOption[];
  setSearchButton: React.Dispatch<React.SetStateAction<Search>>;
  prod_options: ProductOption[];
  prodsLoading: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>;
  setPerSelectedOption: React.Dispatch<React.SetStateAction<PeriodOption>>;
  setSortSelectedOption: React.Dispatch<React.SetStateAction<OrderingOption>>;
  filters: FilterOption[];
  searchButton: Search;
  sortSelectedOption: OrderingOption;
  perSelectedOption: PeriodOption;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meta: Meta;
  setMeta: React.Dispatch<React.SetStateAction<Meta>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

export const AppContext = createContext<AppContextInterface>({
  priceFrom: "",
  setPriceFrom: () => {},
  priceTo: "",
  setPriceTo: () => {},
  selectedCurrencyIndex: 0,
  setSelectedCurrencyIndex: () => {},
  catSelectedOptions: [],
  setCatSelectedOptions: () => {},
  isCategCloseButtonSelected: false,
  setIsCategCloseButtonSelected: () => {},
  pairManModel: [],
  manSelectedOptions: [],
  setManSelectedOptions: () => {},
  modelSelectedOptions: [],
  setModSelectedOptions: () => {},
  setManIsCloseButtonSelected: () => {},
  setModIsCloseButtonSelected: () => {},
  isModCloseButtonSelected: false,
  isManCloseButtonSelected: false,
  saleSelectedOption: "",
  setSaleSelectedOption: () => {},
  mans_options: [],
  cats_options: [],
  setSearchButton: () => {},
  prod_options: [],
  prodsLoading: false,
  setFilters: () => {},
  setPerSelectedOption: () => {},
  setSortSelectedOption: () => {},
  filters: [],
  searchButton: { Mans: "", Cats: "", PriceTo: "", PriceFrom: "", ForRent: "" },
  sortSelectedOption: { value: "", label: "Sort" },
  perSelectedOption: { value: "", label: "Period" },
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  meta: { total: 0, per_page: 0, current_page: 0, last_page: 0 },
  setMeta: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});
