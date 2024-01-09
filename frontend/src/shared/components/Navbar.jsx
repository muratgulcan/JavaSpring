import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Navbar() {
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
    </>
  );
}
