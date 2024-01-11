import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../../pages/HomePage";
import { SignUp } from "../../../pages/SignUp";
import { UserPage } from "../../../pages/UserPage";
import App from "../../App";
import { Activation } from "../../../pages/Activation";
import { Login } from "../../../pages/Login";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "*",
        index: true,
        Component: Home,
      },
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/activation/:token",
        Component: Activation,
      },
      {
        path: "/user/:id",
        Component: UserPage,
      },
      {
        path: "/signin",
        Component: Login,
      },
    ],
  },
]);
