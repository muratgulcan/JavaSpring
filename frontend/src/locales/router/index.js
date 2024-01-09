import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../../pages/HomePage";
import { SignUp } from "../../../pages/SignUp";

export default createBrowserRouter([
  {
    path: "*",
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
]);
