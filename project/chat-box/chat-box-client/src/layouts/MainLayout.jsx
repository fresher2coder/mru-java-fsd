import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
`;
function MainLayout({ children }) {
  return (
    <MainContainer>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </MainContainer>
  );
}

export default MainLayout;
