import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../state/context";
import { ProfileImage } from "./ProfileImage";

export function Navbar() {
  const { t } = useTranslation();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const onClickLogout = () => {
    dispatch({ type: "logout-success" });
  };
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
                    <ProfileImage width={30} />{" "}
                    <span className="ms-2">{authState.username}</span>
                  </Link>
                </li>
                <li className="navbar nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    onClick={onClickLogout}
                  >
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
