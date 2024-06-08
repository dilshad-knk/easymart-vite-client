import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Nav,
  Container,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { BsCart3, BsShop } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/darkModeReducer";
import SignInUp from "../components/user/SignInUp";
import "./MainNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const expand = "lg";
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.themeStatus.darkMode);
  const cart = useSelector(state => state.cart.cart);

  const [searchTerm, setSearchTerm] = useState('');

  const cartLength = cart ? cart.length : 0;
  const navigate = useNavigate()
  const toggleDarkMode = () => {
    dispatch(setDarkMode());
  };

  
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      e.preventDefault();
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };






  

  const varient = darkMode ? "dark" : "primary";
  const bgColor = darkMode ? "dark" : "primary";
  const bgColor1 = darkMode ? "white" : "primary";

  return (
    <Navbar
      key={expand}
      expand={expand}
      sticky="top"
      bg={bgColor}
      className="px-lg-4"
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
        <Form className="d-flex text-dark w-25 d-none d-md-block">
          <Form.Control
            type="text"
            value={searchTerm}
            onKeyDown={handleSearch}
            onChange={handleChange}
            placeholder="Search for products..."
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          className={`border border-secondary bg-${bgColor1} shadow-none`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className={`flex-grow-0 bg-${bgColor}`}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="text-white" id={`offcanvasNavbarLabel-expand-${expand}`}>
              Easy Mart
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
              <NavLink
                to="/sellers"
                className="text-decoration-none px-1 py-2 hover-custom d-flex align-items-center text-white me-2 bord-white"
              >
                <BsShop className="me-2" />
                <span>Seller</span>
              </NavLink>

              <SignInUp />
              <NavLink
                to="/cart"
                className="text-decoration-none py-2 px-1 hover-custom d-flex align-items-center text-white me-2 bord-white"
              >
                <BsCart3 className="fs-5 mb-1 me-1" />
                <span> Cart</span>
                <span className="badge bg-secondary ms-1">{cartLength}</span>
              </NavLink>
              <Button
                variant={varient}
                onClick={toggleDarkMode}
                className="mb-1"
              >
                {darkMode ? (
                  <FaRegMoon className="text-white fs-5" />
                ) : (
                  <FiSun className="text-white fs-5" />
                )}
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
