import { Outlet } from "react-router-dom";
import { LanguageSelector } from "../src/shared/components/LanguageSelector.jsx";
import { Navbar } from "./shared/components/Navbar.jsx";

// import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Outlet />
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
