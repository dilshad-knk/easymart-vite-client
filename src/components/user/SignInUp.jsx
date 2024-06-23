import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, DropdownDivider, Form, Modal, Nav, NavDropdown, NavItem, NavLink, Navbar, Offcanvas } from 'react-bootstrap'
import { FaRegUser } from "react-icons/fa";
import {  Link, useLocation } from 'react-router-dom';
import UserSignin from '../../pages/user/UserSignin'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/userAuthenticate';
import { clearCart } from '../../redux/cartSlice';
import instance from '../../axios/axios';


export default function SignInUp() {
  
  const [modalShow, setModalShow] = useState(false);

  const user = useSelector(state => state.user);
 
  
  const handleToggleModal = () => {
    setModalShow(!modalShow); 
};
  




  return (
    <div >
    <Nav.Link className='hover-custom d-flex align-items-center text-white  me-2 bord-white' onClick={handleToggleModal}  >        
        {!user.isUserAuthenticated 

            ? <>
                <FaRegUser  className='me-1' /> 
                <span>Login/SignUp</span>
              </>
            : <UserDropdown user={user}/>

        }         
    </Nav.Link>
  
{!user.isUserAuthenticated &&
   <LoginModal modalShow={modalShow} handleToggleModal={handleToggleModal}/>
}
  </div>

  )
}


function UserDropdown ({user}){

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()

  const handleMouseEnter = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = async() => {
    let res = await instance.post('/user/logout')

    dispatch(userLogout());
    dispatch(clearCart());

    
  }

  return(


        <Dropdown show={isOpen} onClick={handleMouseEnter} className='position-relative'   >
          <Dropdown.Toggle as={NavLink} className='text-white d-flex align-items-center' id="dropdown-custom-components" >
              <FaRegUser className='me-1 text-white'/>
              <span>{user.user.name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu position-absolute"aria-labelledby="dropdown-custom-components" onMouseLeave={handleMouseLeave}  >
            <Dropdown.Item eventKey="1" className=' d-flex align-items-center'> <Link className='text-decoration-none d-flex align-items-center' to='/profile'> <FaRegUser className='me-1'/>Profile</Link></Dropdown.Item>
            <Dropdown.Item eventKey="#link2" className=' d-flex align-items-center'> <Link className='text-decoration-none d-flex align-items-center' to='/profile#link1'> My Orders</Link></Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item  className='text-center'><Button  className='bg-danger' onClick={handleLogout}>Logout</Button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>



  )
}



export function LoginModal({modalShow,handleToggleModal}) {

  return (
    <Modal
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={modalShow} onHide={handleToggleModal}
   >
         <Modal.Header closeButton className='bg-primary border'>
       <Modal.Title id="contained-modal-title-vcenter text-center">
         User Login
       </Modal.Title>
       </Modal.Header>
       <Modal.Body>
           <UserSignin closeModal={handleToggleModal}/>
       </Modal.Body>

   </Modal>
  )

}