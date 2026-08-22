// Storage utility functions for frontend persistence

export const getStorageData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

export const setStorageData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
  }
};

export const removeStorageData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};

export const getWhatsAppLink = (phone, text) => {
  const cleanPhone = String(phone || "").replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(text || "");
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};
