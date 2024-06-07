import React, { useState } from "react";
import {  Dropdown, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import useProductCategories from "../Utils/useProductCategories";
import { Link, } from "react-router-dom";
import { useSelector } from "react-redux";

const Subnavbar = () => {
  const categories = useProductCategories();
  const darkMode = useSelector((state) => state.themeStatus.darkMode);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);



  const handleMouseEnter = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleMouseLeavemain = () => {
    setExpanded(false);
  };

  const mainCategories = categories.slice(0, 5);
  const overflowCategories = categories.slice(5);


 
  const handleNavItemClick = () => {
    if (window.innerWidth <= 992) {
      setExpanded(false);
    }
  };
  return (
    <Navbar
    className={darkMode ? 'dark-mode' : 'light-mode'}
    expand="lg"
    expanded={expanded}
    onMouseLeave={handleMouseLeavemain} 
  >
    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      className={`mx-2 shadow-none ${darkMode? 'dark-mode border-white' : 'light-mode' } `}
      onClick={() => setExpanded(!expanded)} 
    >
      Categories
    </Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav" className="px-3">
      <Nav className="mr-auto">
        {mainCategories.map((category) => (
          <Nav.Link
            as={Link}
            to={`${category.slug}`}
            key={category._id}
            onClick={handleNavItemClick}
            className={`mx-2 shadow-none ${darkMode? 'dark-mode border-white' : 'light-mode' } `}
            
          >
            {category.name}
          </Nav.Link>
        ))}
        {overflowCategories.length > 0 && (
           <Dropdown show={isOpen} onClick={handleMouseEnter} className='position-relative d-flex align-items-center'   >
            <Dropdown.Toggle as={NavLink} className='text-white d-flex align-items-center '  >
               <p className="px-2 m-0">More Categories</p>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu position-absolute" aria-labelledby="dropdown-custom-components"  onMouseLeave={handleMouseLeave}  >
            {overflowCategories.map((category,index) => (
              <Dropdown.Item 
               eventKey={index}
                as={Link}
                to={`${category.slug}`}
                key={category._id}
                onClick={handleNavItemClick}
              >
                {category.name}
                </Dropdown.Item>    ))}

              </Dropdown.Menu>
          </Dropdown>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default Subnavbar;
