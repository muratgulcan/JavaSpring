import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const imageStyle = {
    marginRight: "8px", // İstenilen boşluğu ayarlayabilirsiniz
  };

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <>
      <img
        style={imageStyle}
        role="button"
        src="https://flagcdn.com/w40/tr.png"
        srcset="https://flagcdn.com/w80/tr.png 2x"
        width="40"
        alt="Turkish"
        onClick={() => onSelectLanguage("tr")}
      ></img>

      <img
        style={imageStyle}
        role="button"
        src="https://flagcdn.com/w40/gb.png"
        srcset="https://flagcdn.com/w80/gb.png 2x"
        width="40"
        alt="English"
        onClick={() => onSelectLanguage("en")}
      ></img>
    </>
  );
}
