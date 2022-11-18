import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
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
          reaching:
            "Reaching 100% CO₂ emission reduction target for both new cars and vans by 2035 is possible.",
          theCouncil:
            "The Council and the European Parliament reached a provisional agreement on stricter CO₂ emission performance standards for new cars and vans. Pending a formal adoption, the co-legislators agreed to a 55% CO₂ emission reduction target for new cars and 50% for new vans by 2030 compared to 2021 levels and to a 100% CO₂ emission reduction target for both new cars and vans by 2035.",
          learnMore: "Learn more",
          useCO2:
            "Use CO₂CAR to check the emission levels for your current or next car!",
          // LOGIN
          errorAllFields: "All fields are required",
          errorIncorrectEmail: "Incorrect email format",
          errorIncorrectPassword: "Incorrect password",
          errorNoAccount: "Email not yet registered",
          emailLabel: "E-mail",
          emailPlaceholder: "enter e-mail",
          passwordLabel: "Password",
          passwordPlaceholder: "enter password",
          signInAnd: "Sign in and check your car's emissions!",
          dontHave: "Don't have an account yet? Go to registration instead.",
          continue: "Continue without signing in",
          // REGISTER
          errorPasswordsDifferent: "Entered passwords are different",
          errorWeakPassword:
            "Your password need to contain at least 6 characters",
          errorInvalidEmail: "Invalid email address",
          errorAlreadyExists: "An account with this email already exists",
          password2Label: "Repeated password",
          password2Placeholder: "repeat password",
          signUpAnd: "Sign up and check your car's emissions!",
          signUp: "Sign up",
          alreadyHave: "Already have an account? Go to login instead.",
          // HOME
          calculateYour: "Calculate your car's carbon emission",

          // PROFILE
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
          reaching:
            "Reaching 100% CO₂ emission reduction target for both new cars and vans by 2035 is possible.",
          theCouncil:
            "The Council and the European Parliament reached a provisional agreement on stricter CO₂ emission performance standards for new cars and vans. Pending a formal adoption, the co-legislators agreed to a 55% CO₂ emission reduction target for new cars and 50% for new vans by 2030 compared to 2021 levels and to a 100% CO₂ emission reduction target for both new cars and vans by 2035.",
          learnMore: "Dowiedz się więcej",
          useCO2:
            "Use CO₂CAR to check the emission levels for your current or next car!",
          // LOGIN
          errorAllFields: "All fields are required",
          errorIncorrectEmail: "Incorrect email format",
          errorIncorrectPassword: "Incorrect password",
          errorNoAccount: "Email not yet registered",
          emailLabel: "E-mail",
          emailPlaceholder: "enter e-mail",
          passwordLabel: "Password",
          passwordPlaceholder: "enter password",
          signInAnd: "Sign in and check your car's emissions!",
          dontHave: "Don't have an account yet? Go to registration instead.",
          continue: "Continue without signing in",
          // REGISTER
          errorPasswordsDifferent: "Entered passwords are different",
          errorWeakPassword:
            "Your password needs to contain at least 6 characters",
          errorInvalidEmail: "Invalid email address",
          errorAlreadyExists: "An account with this email already exists",
          password2Label: "Repeated password",
          password2Placeholder: "repeat password",
          signUpAnd: "Sign up and check your car's emissions!",
          signUp: "Sign up",
          alreadyHave: "Already have an account? Go to login instead.",
          // HOME

          // PROFILE
        },
      },
    },
  });
