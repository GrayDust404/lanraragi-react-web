import { USE_PAGINATED_SEARCH } from "./constants";

// 保存设置
export const saveSearchSettings = (settings) => {
  localStorage.setItem(USE_PAGINATED_SEARCH, JSON.stringify(settings));
};

// 加载设置
export const loadSearchSettings = () => {
  const savedSetting = localStorage.getItem(USE_PAGINATED_SEARCH);
  return savedSetting ? JSON.parse(savedSetting) : true; // 默认为 true
}; 