import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { en, hi } from "./lang"

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
}
const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem("lng");
    return storedLang || "en"; // Return stored language or default to "en"
  } catch (error) {
    console.error("Error fetching stored language preference:", error);
    return "en"; // Fallback to "en" in case of an error
  }
};

// Initialize i18next with the stored language preference
const initI18n = async () => {
  const lng = await getStoredLanguage();
  i18next.use(initReactI18next).init({
    debug: false,
    compatibilityJSON: "v3",
    lng: lng,
    fallbackLng: "en",
    resources: resources,
  });
};
initI18n();

export default i18next
