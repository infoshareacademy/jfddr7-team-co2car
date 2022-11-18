import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          // NAVIGATION
          home: "Home",
          profile: "Profile",
          signOut: "Sign Out",
          signIn: "Sign In",
          // LANDING PAGE
          theCouncil: "",
          learnMore: "Learn more",
        },
      },
      pl: {
        translation: {
          // NAVIGATION
          home: "Strona główna",
          profile: "Profil",
          signOut: "Wyloguj",
          signIn: "Zaloguj",
          // LANDING PAGE
          learnMore: "Dowiedz się więcej",
        },
      },
    },
  });
