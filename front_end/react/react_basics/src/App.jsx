import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/layout/Header";
import LeftSideBar from "./components/layout/LeftSideBar";
import Main from "./components/layout/Main";
import RightSideBar from "./components/layout/RightSideBar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <LeftSideBar />
        <Main />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
