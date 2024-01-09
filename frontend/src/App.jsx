import { Link, Outlet } from "react-router-dom";
import { LanguageSelector } from "../src/shared/components/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";

// import './App.css'

function App() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Nyxanite
          </Link>
          <ul className="navbar-nav ">
            <li className="navbar nav-item">
              <Link className="nav-link" to="/signup">
                {t("signUp")}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-3">
        <Outlet />
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
