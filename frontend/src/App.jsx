import { Outlet } from "react-router-dom";
import { LanguageSelector } from "../src/shared/components/LanguageSelector.jsx";
import { Navbar } from "./shared/components/Navbar.jsx";
import { useState } from "react";
import { Login } from "../pages/Login/index.jsx";

// import './App.css'

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
  });

  const onLoginSuccess = (data) => {
    setAuthState(data);
  };

  return (
    <>
      <Navbar authState={authState} />
      <div className="container mt-3">
        <Login onLoginSuccess={onLoginSuccess} />
        {/* <Outlet /> */}
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
