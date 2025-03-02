import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: rgb(128, 83, 0);
  color: white;
  text-align: center;
  padding: 1rem;

  width: 100%;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.3);
`;

const FooterText = styled.h5`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(248, 210, 144);

  &:hover {
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Your Website - All Rights Reserved</FooterText>
    </FooterContainer>
  );
};

export default Footer;
