import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // default English

  // عند بداية التطبيق
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
      document.dir = savedLang === "ar" ? "rtl" : "ltr";
    } else {
      // default = English
      localStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
      document.dir = "ltr";
    }
  }, []);

  // تغيير اللغة
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);

    document.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// hook جاهز للاستخدام
export const useLanguage = () => useContext(LanguageContext);
