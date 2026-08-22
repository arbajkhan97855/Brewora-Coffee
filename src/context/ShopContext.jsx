import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";
import { faqs as initialFaqs } from "../data/faq";
import { offers as initialOffers } from "../data/offers";
import { galleryItems as initialGallery } from "../data/gallery";
import { shopInfo as initialShopInfo, adminInfo } from "../data/info";
import { getStorageData, setStorageData, removeStorageData } from "../utils/storage";

const ShopContext = createContext();

const initialInquiries = [
  {
    id: "inq-1",
    name: "Vikram Malhotra",
    phone: "+91 98290 12345",
    email: "vikram.m@example.com",
    product: "Premium Arabica Whole Beans (250g)",
    quantity: 4,
    preferredDate: "2026-08-25",
    message: "Need freshly medium-dark roasted beans ground specifically for a standard French Press.",
    status: "New",
    createdAt: "2026-08-22 10:15 AM"
  },
  {
    id: "inq-2",
    name: "Ananya Sharma",
    phone: "+91 94140 88776",
    email: "ananya.s@example.com",
    product: "18-Hour Kyoto Cold Brew",
    quantity: 10,
    preferredDate: "2026-08-26",
    message: "Inquiring about bulk takeaway bottles for a small boutique design studio meeting.",
    status: "Contacted",
    createdAt: "2026-08-21 04:30 PM"
  }
];

export const ShopProvider = ({ children }) => {
  // State initialization with localStorage fallback
  const [products, setProducts] = useState(() => getStorageData("brewora_products", initialProducts));
  const [faqs, setFaqs] = useState(() => getStorageData("brewora_faqs", initialFaqs));
  const [offers, setOffers] = useState(() => getStorageData("brewora_offers", initialOffers));
  const [gallery, setGallery] = useState(() => getStorageData("brewora_gallery", initialGallery));
  const [shopInfo, setShopInfo] = useState(() => getStorageData("brewora_shopInfo", initialShopInfo));
  const [inquiries, setInquiries] = useState(() => getStorageData("brewora_inquiries", initialInquiries));
  
  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  // Global Toast state
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "info" });
    }, 4000);
  };

  const hideToast = () => {
    setToast({ visible: false, message: "", type: "info" });
  };

  // Sync state to localStorage whenever modified
  useEffect(() => {
    setStorageData("brewora_products", products);
  }, [products]);

  useEffect(() => {
    setStorageData("brewora_faqs", faqs);
  }, [faqs]);

  useEffect(() => {
    setStorageData("brewora_offers", offers);
  }, [offers]);

  useEffect(() => {
    setStorageData("brewora_gallery", gallery);
  }, [gallery]);

  useEffect(() => {
    setStorageData("brewora_shopInfo", shopInfo);
  }, [shopInfo]);

  useEffect(() => {
    setStorageData("brewora_inquiries", inquiries);
  }, [inquiries]);

  // Product Operations
  const addProduct = (newProd) => {
    const newId = Date.now();
    const item = {
      id: newId,
      ...newProd,
      price: Number(newProd.price) || 0,
      oldPrice: Number(newProd.oldPrice) || 0,
      rating: Number(newProd.rating) || 4.8,
      reviews: Number(newProd.reviews) || 1,
      available: Boolean(newProd.available),
      featured: Boolean(newProd.featured),
      ingredients: Array.isArray(newProd.ingredients)
        ? newProd.ingredients
        : (newProd.ingredients || "").split(",").map(s => s.trim()).filter(Boolean)
    };
    setProducts((prev) => [item, ...prev]);
    showToast(`Product "${item.name}" added successfully!`, "success");
    return item;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id || String(item.id) === String(id)) {
          return {
            ...item,
            ...updatedData,
            price: Number(updatedData.price) || item.price,
            oldPrice: Number(updatedData.oldPrice) || item.oldPrice,
            rating: Number(updatedData.rating) || item.rating,
            reviews: Number(updatedData.reviews) || item.reviews,
            ingredients: Array.isArray(updatedData.ingredients)
              ? updatedData.ingredients
              : (updatedData.ingredients || "").split(",").map(s => s.trim()).filter(Boolean)
          };
        }
        return item;
      })
    );
    showToast("Product updated successfully!", "success");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id && String(p.id) !== String(id)));
    showToast("Product deleted successfully!", "info");
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
    showToast("Products reset to factory default!", "info");
  };

  // FAQ Operations
  const addFAQ = (newFaq) => {
    const item = {
      id: Date.now(),
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category || "General",
      status: newFaq.status || "Active"
    };
    setFaqs((prev) => [...prev, item]);
    showToast("New FAQ added successfully!", "success");
  };

  const updateFAQ = (id, updatedData) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id || String(f.id) === String(id) ? { ...f, ...updatedData } : f))
    );
    showToast("FAQ updated successfully!", "success");
  };

  const deleteFAQ = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id && String(f.id) !== String(id)));
    showToast("FAQ deleted successfully!", "info");
  };

  // Offer Operations
  const addOffer = (newOffer) => {
    const item = {
      id: Date.now(),
      ...newOffer,
      active: true
    };
    setOffers((prev) => [item, ...prev]);
    showToast("Special offer created successfully!", "success");
  };

  const updateOffer = (id, updatedData) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id || String(o.id) === String(id) ? { ...o, ...updatedData } : o))
    );
    showToast("Offer updated successfully!", "success");
  };

  const deleteOffer = (id) => {
    setOffers((prev) => prev.filter((o) => o.id !== id && String(o.id) !== String(id)));
    showToast("Offer removed successfully!", "info");
  };

  const toggleOfferActive = (id) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id || String(o.id) === String(id) ? { ...o, active: !o.active } : o
      )
    );
  };

  // Gallery Operations
  const addGalleryItem = (newItem) => {
    const item = {
      id: Date.now(),
      title: newItem.title || "Brewora Moment",
      category: newItem.category || "Café Life",
      image: newItem.image,
      caption: newItem.caption || ""
    };
    setGallery((prev) => [item, ...prev]);
    showToast("Image added to gallery!", "success");
  };

  const deleteGalleryItem = (id) => {
    setGallery((prev) => prev.filter((g) => g.id !== id && String(g.id) !== String(id)));
    showToast("Gallery image removed!", "info");
  };

  // Inquiry Operations
  const addInquiry = (data) => {
    const item = {
      id: "inq-" + Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      product: data.product || "General Inquiry",
      quantity: Number(data.quantity) || 1,
      preferredDate: data.preferredDate || new Date().toISOString().split("T")[0],
      message: data.message,
      status: "New",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setInquiries((prev) => [item, ...prev]);
    showToast("Your inquiry has been submitted! Our barista team will contact you shortly.", "success");
    return item;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id || String(inq.id) === String(id) ? { ...inq, status: newStatus } : inq
      )
    );
    showToast(`Inquiry status marked as "${newStatus}"`, "success");
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id && String(i.id) !== String(id)));
    showToast("Inquiry deleted!", "info");
  };

  // Shop Settings Operations
  const updateShopInfo = (newInfo) => {
    setShopInfo((prev) => ({ ...prev, ...newInfo }));
    showToast("Shop information updated successfully across the entire site!", "success");
  };

  const resetShopInfoToDefault = () => {
    setShopInfo(initialShopInfo);
    showToast("Shop settings restored to defaults!", "info");
  };

  // Admin Auth handlers
  const adminLogin = (email, password) => {
    if (email === adminInfo.email && password === adminInfo.password) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAdminLoggedIn(true);
      showToast("Welcome back, Roaster Admin! Logged in successfully.", "success");
      return { success: true };
    }
    return {
      success: false,
      message: "Invalid admin email or password. Check default credentials in info.js."
    };
  };

  const adminLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdminLoggedIn(false);
    showToast("You have been safely logged out.", "info");
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferActive,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        shopInfo,
        updateShopInfo,
        resetShopInfoToDefault,
        adminInfo,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
