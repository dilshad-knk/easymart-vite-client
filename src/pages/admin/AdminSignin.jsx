
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import instance from '../../axios/axios';
import AdminDashboard from './AdminDashboard';
import { adminAuthSuccess } from '../../redux/adminAuthenticate';
import { showSuccessAlert, showFailureAlert } from '../../Utils/toastifyAlert';

function AdminSignin() {

    const [validated, setValidated] = useState(false);
    const [userEmail,setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userPassword,setuserPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleUserEmail = (event) => {
      const email = event.target.value.trim();
      setUserEmail(email)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    
      if (email === "") {
          setEmailError(<ul><li> Enter your email</li></ul>);
         return false
        
      } else if (!emailPattern.test(email)) {
          setEmailError(<ul><li>Enter a valid email address</li></ul>);
          return false;

      } else {
          setEmailError("");
          return true;
      }
    }


    const handlePassword = (event)=>{

      const password = event.target.value.trim();
      setuserPassword(password);

        if(!password){
          setPasswordError(<ul><li>Fill your Password</li></ul>);

          return false;
        } else {
          setPasswordError('') 
          return true;
        }


    }

    const handleSubmit = async(e)=>{

      e.preventDefault();
     
      const isEmailValid = handleUserEmail({ target: { value: userEmail } });
      const isPasswordValid = handlePassword({ target: { value: userPassword } });
     
      const form = e.currentTarget
      if (!navigator.onLine) {
        showFailureAlert('No internet connection. Please try again when you are online.');
        return;
      }
      if (form.checkValidity() === false || !isEmailValid || !isPasswordValid ) {
        e.stopPropagation();
        setValidated(false);
      } else {
        // If the form is valid, proceed with form submission
        setValidated(true);
    
        // request to your backend
       
        try {

          let res = await instance.post('/admin/login', {
             email: userEmail,
             password: userPassword,
           },{withCredentials: true, 
          })
          

          if (res.data.success){
            
            showSuccessAlert(res.data.message);
            
            dispatch(adminAuthSuccess(res.data))

            navigate('/admin/dashboard')

           
          }
         
            

         


          
     
        } catch (error) {
          if (error.response && error.response.data && error.response.data.msg) {
            showFailureAlert(error.response.data.msg);
          } else {
              // If the expected properties are not present, provide a generic error message
              showFailureAlert("An error occurred during the request");
          }
        }
      }
    }

    return (

            <Container>
            
              <Row>
                <Col>
                  <h3 className='my-4 text-dark fs-1 mb-5'>Sign In :</h3>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mx-auto">
                  <Form noValidate    onSubmit={handleSubmit} >
                    <Form.Group className="mb-4" controlId="formGroupEmail">
                      <Form.Label className='fw-bold'>Email</Form.Label>
                      <Form.Control
                        className='shadow-none'
                        type="email"
                        placeholder="Enter Address"
                        value={userEmail}
                        onChange={handleUserEmail}
                        required
                      />
      
                      {emailError && <p className='p-1' style={{ color: 'red' }}>{emailError}</p>}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupPassword">
                      <Form.Label className='fw-bold'>Password</Form.Label>
                      <Form.Control
                        className='shadow-none'
                        type="password"
                        placeholder="Enter Password"
                        value={userPassword}
                        onChange={handlePassword}
                        required
                      />
                      {passwordError && <p className='p-1'  style={{ color: 'red' }}>{passwordError}</p>}
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center p-4">
                      <Button type="submit" variant="primary">Submit</Button>
                    </Form.Group>
                  </Form>
                </Col>
                <Col className=' text-center mx-5'>
                  <div className='border  py-5 mx-5'>
                      
                    <NavLink to="/admin/register" >
                      <Button variant="primary" className='' >Register</Button>
                    </NavLink>
                  </div>
              </Col>
              </Row>
              
              
      
            </Container>


    )

}

export default AdminSignin;
