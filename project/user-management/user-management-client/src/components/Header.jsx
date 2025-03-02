import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const StyledHeader = styled.header`
  background-color: rgb(128, 83, 0);
  padding: 1rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  padding: 10px 20px;
  margin: 0;
  font-size: 1.8rem;
  background-color: rgb(166, 108, 1);
  border-radius: 10px;
  box-shadow: 0px 3px 3px rgb(59, 42, 10);
  width: 100%;
  max-width: 400px;
`;

const Nav = styled.nav`
  margin-top: 1.5rem;
  width: 100%;
  max-width: 800px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.active {
    font-weight: bold;
    text-decoration: underline;
    background-color: rgb(248, 210, 144);
    color: rgb(59, 42, 10);
  }

  &:hover {
    background-color: rgb(248, 210, 144);
    color: rgb(59, 42, 10);
  }
`;

const LogoutLink = styled(StyledNavLink)`
  background-color: rgb(255, 68, 68);
  color: white;

  &:hover {
    background-color: rgb(204, 40, 40);
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
          <li>
            <StyledNavLink to="/about">About</StyledNavLink>
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
                <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
              </li>
              <li>
                <StyledNavLink to="/profile">Profile</StyledNavLink>
              </li>
              <li>
                <LogoutLink to="/logout" onClick={logout}>
                  Logout
                </LogoutLink>
              </li>
            </>
          )}
        </NavList>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
