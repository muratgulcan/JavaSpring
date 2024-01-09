import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../../pages/HomePage";
import { SignUp } from "../../../pages/SignUp";
import App from "../../App";

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
    ],
  },
]);
