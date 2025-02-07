import React from "react";
import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../pages/About";

function MainLayout(props) {
  const { name, children } = props;
  return (
    <>
      <Header />
      {/* dynamic component */}
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
