import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header";
import LeftSideBar from "./components/LeftSideBar";
import Main from "./components/main";
import RightSideBar from "./components/RightSideBar";
import Footer from "./components/footer";

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
