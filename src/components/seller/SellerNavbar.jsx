import React from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Modal,
  Nav,
  NavDropdown,
  NavItem,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import "../Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../redux/darkModeReducer";

function SellerNavbar() {
  const expand = "lg";

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.themeStatus.darkMode);

  const toggleDarkMode = () => {
    dispatch(setDarkMode());
  };

  const varient = darkMode ? "dark" : "primary";

  const bgColor = darkMode ? "dark" : "primary";
  const borderColor = darkMode ? "white" : "dark";
  const bgColor1 = darkMode ? "white" : "primary";

  return (
    <Navbar
      key={expand}
      expand={expand}
      sticky="top"
      bg={bgColor}
      className="px-lg-4 "
    >
      <Container fluid>
        <Navbar.Brand>
          <NavLink
            to="/"
            className="text-decoration-none d-flex align-items-center text-white"
          >
            <h2 className="text-white fw-bold">Easy</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-lightning-charge-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
            </svg>
            <h2 className="text-white fw-bold">Mart</h2>
          </NavLink>
        </Navbar.Brand>

        <Nav className="justify-content-end pe-3">
          <Button variant={varient} onClick={toggleDarkMode} className="mb-1">
            {darkMode ? (
              <FaRegMoon className="text-white fs-5" />
            ) : (
              <FiSun className="text-white fs-5" />
            )}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SellerNavbar;
