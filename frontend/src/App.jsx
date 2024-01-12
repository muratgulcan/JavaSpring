import { Outlet } from "react-router-dom";
import { LanguageSelector } from "../src/shared/components/LanguageSelector.jsx";
import { Navbar } from "./shared/components/Navbar.jsx";
import { AuthenticationContext } from "./shared/state/context.jsx";

// import './App.css'

function App() {
  return (
    <>
      <AuthenticationContext>
        <Navbar />
        <div className="container mt-3">
          <Outlet />
          <LanguageSelector />
        </div>
      </AuthenticationContext>
    </>
  );
}

export default App;
