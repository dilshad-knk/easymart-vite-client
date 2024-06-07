import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Dropdown, Form, Modal, Nav, NavDropdown, NavItem, Navbar, Offcanvas } from 'react-bootstrap'
import { BsShop } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {  NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../redux/darkModeReducer';
import SignInUp from './user/SignInUp';


function Header() {

  const expand = 'lg';

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.themeStatus.darkMode);
  const cartLength = useSelector(state => state.cart.cart.length)



  const toggleDarkMode = () => {

        dispatch(setDarkMode());
  };
  
  const varient = darkMode ? 'dark' : 'primary';
  
  const bgColor = darkMode ? 'dark' : 'primary';
  const borderColor = darkMode ? 'white' : 'dark';
  const bgColor1 = darkMode ? 'white' : 'primary';


  
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller');

 
  return (
  
   <Navbar key={expand} expand={expand} sticky='top' bg={bgColor}  className="px-lg-4 ">
    <Container fluid>
      <Navbar.Brand  >
          <NavLink to='/' className='text-decoration-none d-flex align-items-center text-white'>
          
          <h2 className='text-white fw-bold'>Easy</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-lightning-charge-fill"  viewBox="0 0 16 16">
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
            </svg>
            <h2 className='text-white fw-bold'>Mart</h2>    
          
          
          </NavLink>
            
                      
            </Navbar.Brand>
      {!isSellerRoute && <Form className="d-flex text-dark w-25">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"

            />
          </Form>}
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className={`border border-secondary bg-${bgColor1} shadow-none`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
        className={`flex-grow-0 bg-${bgColor}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            Offcanvas
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
               
                <NavLink to='/seller/dashboard'  className={({isActive})  => (isActive ? 'text-decoration-none d-flex align-items-center text-white  activeLink px-2 me-2' : 'text-decoration-none d-flex align-items-center text-white px-2 me-2 bord-white')}>
                        <BsShop className='me-2' />
                        <span>Seller</span>
               
                </NavLink>
                

                {!isSellerRoute && 
                
                  <SignInUp />
                }


                {!isSellerRoute &&
                <NavLink to="/cart" className='text-decoration-none px-1 hover-custom d-flex align-items-center text-white  me-2 bord-white '>
                  <BsCart3 className='fs-5 mb-1 me-1'/>
                  <span> Cart</span>
                  <span className="badge bg-secondary ms-1">{cartLength}</span>
              </NavLink>
                }
                <Button variant={varient} onClick={toggleDarkMode} className='mb-1'>
                        
                        {darkMode ? <FaRegMoon className='text-white fs-5' /> : <FiSun  className='text-white fs-5' />}

                  </Button>

          </Nav>
          
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
    </Navbar>
              


  )
}

export default Header