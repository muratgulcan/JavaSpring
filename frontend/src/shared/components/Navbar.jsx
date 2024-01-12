import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/context";

export function Navbar() {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Nyxanite
          </Link>
          <ul className="navbar-nav ">
            {authState.id === 0 && (
              <>
                <li className="navbar nav-item">
                  <Link className="nav-link" to="/signup">
                    {t("signUp")}
                  </Link>
                </li>
                <li className="navbar nav-item">
                  <Link className="nav-link" to="/signin">
                    {t("signIn")}
                  </Link>
                </li>
              </>
            )}
            {authState.id > 0 && (
              <>
                <li className="navbar nav-item">
                  <Link className="nav-link" to={`/user/${authState.id}`}>
                    {t("myProfile")}
                  </Link>
                </li>
                <li className="navbar nav-item">
                  <span className="nav-link" role="button">
                    {t("logout")}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
