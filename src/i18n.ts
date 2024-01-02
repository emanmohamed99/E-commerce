
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import Arabic from "./Languages/Arabic.json"
import English from "./Languages/English.json"
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: English
      },
      ar: {
        translation: Arabic
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });
