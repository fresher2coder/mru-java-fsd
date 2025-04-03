import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

function Home() {
  return <HomeContainer>Welcome to the Home Page</HomeContainer>;
}

export default Home;
