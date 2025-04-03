import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #333;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 15px;
  padding: 0;
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 5px 10px;
  transition: color 0.3s ease-in-out;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid white;
  }

  &:hover {
    color: #f4a261;
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #e63946;
  }
`;
function Header() {
  const { state, logout } = useAuth();
  return (
    <StyledHeader>
      <Title>User Management</Title>
      <Nav>
        <NavList>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>

          {!state.isAuthenticated ? (
            <>
              <li>
                <StyledNavLink to="/register">Register</StyledNavLink>
              </li>
              <li>
                <StyledNavLink to="/login">Login</StyledNavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <StyledNavLink to="/chat">Chat</StyledNavLink>
              </li>

              <li>
                <LogoutLink onClick={logout}>Logout</LogoutLink>
              </li>
            </>
          )}
        </NavList>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
