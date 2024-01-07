import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SignUp } from "../pages/SignUp/index.jsx";
import "../styles.css";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          signUp: "Sign Up",
          username: "Username",
          email: "E-mail",
          password: "Password",
          rePassword: "Password Repeat",
          passwordMismatch: "Password mismatch",
          genericError: "Unexpected error occured. Please try again.",
        },
      },
      tr: {
        translation: {
          signUp: "Kayıt Ol",
          username: "Kullanıcı Adı",
          email: "E-posta",
          password: "Parola",
          rePassword: "Parola Tekrar",
          passwordMismatch: "Parolanız eşleşmiyor",
          genericError: "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.",
        },
      },
    },
    fallbackLng: "tr",

    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);
