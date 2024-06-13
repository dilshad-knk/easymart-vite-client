import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import IndianStates from '../../Utils/IndianStates';
import instance from '../../axios/axios';





function SignUp() {


  const [validated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userPassword, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState([]);
  const [confirmUserPassword, setConfirmUserPassword] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState([]);
  const [address, setAddress] = useState('');
  const [addressError, setaddressError] = useState('');
  const [state, setState] = useState("Choose...");
  const [stateError, setstateError] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeError, setpincodeError] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeNameError, setStoreNameError] = useState('');

  
  



  const navigate = useNavigate();




  const handleUserName = (event) => {

    const name = event.target.value
    setUserName(name)

    if (name === "") {
      setUserNameError(<ul><li>Please enter your name</li></ul>);
      return false

    } else if (name.length < 3) {
      setUserNameError(<ul><li>Enter a valid Name</li></ul>);
      return false


    } else if (!/^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$/.test(name)) {
  setUserNameError(<ul><li>Username should only contain alphanumeric characters, spaces, or underscores</li></ul>);
  return false;

    } else {
      setUserNameError("");

      return true
    }

  };

  const handleUserEmail = (event) => {
    const email = event.target.value.trim();
    setUserEmail(email)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {
      setEmailError(<ul><li> Please enter your email</li></ul>);
      return false

    } else if (!emailPattern.test(email)) {
      setEmailError(<ul><li>Please enter a valid email address</li></ul>);
      return false

    } else {
      setEmailError("");
      return true
    }
  }

  const handlePassword = (event) => {
    const password = event.target.value.trim();
    setPassword(password);

    let errorMessages = [];


    if (password.length < 8) {
      errorMessages.push("Password should be at least 8 characters");
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errorMessages.push("Password should contain at least one uppercase letter, one lowercase letter, and one number.");
    }

    setPasswordError(
      errorMessages.length > 0 ? (
        <ul style={{ color: 'red' }}>
          {errorMessages.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : null
    );

    return (errorMessages.length === 0)

  }

  const handleConfirmPassword = (event) => {
    const confirmPassword = event.target.value.trim()
    setConfirmUserPassword(confirmPassword)


    if (confirmPassword !== userPassword) {
      setConfirmPasswordError(<ul><li>Passwords do not match.</li></ul>);

      return false;

    } else {
      setConfirmPasswordError("");
      return true;
    }

  }

  const handleAddress = (event) => {

    const address = event.target.value;
    setAddress(address)

    if (address === "") {
      setaddressError(<ul><li>Please enter your Address</li></ul>);
      return false

    } else if (address.length < 3) {
      setaddressError(<ul><li>Enter a valid Address</li></ul>);
      return false



    } else {
      setaddressError("");

      return true
    }

  };

  const handleState = (event) => {

    const state = event.target.value;
    setState(state)

    if (state === "Choose...") {
      setstateError(<ul><li>Please enter your State</li></ul>);;
      return false

    } else {
      setstateError("");

      return true
    }

  };

  const handlePincode = (event) => {

    const pincode = event.target.value.trim();
    setPincode(pincode)

    if (pincode === "") {
      setpincodeError(<ul><li>Please enter your Pincode</li></ul>);;
      return false

    }  else if (pincode.length < 5) {
      setpincodeError(<ul><li>Enter a valid Pincode</li></ul>);
      return false
    
    } else {
      setpincodeError("");

      return true
    }

  };

  const handleStoreNAme = (event) => {

    const name = event.target.value;
    setStoreName(name)

    if (name === "") {
      setStoreNameError(<ul><li>Please enter your store name</li></ul>);
      return false

    } else {
      setStoreNameError("");

      return true
    }

  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = handleUserName({ target: { value: userName } });
    const isEmailValid = handleUserEmail({ target: { value: userEmail } });
    const isPasswordValid = handlePassword({ target: { value: userPassword } });
    const isConfirmPasswordValid = handleConfirmPassword({ target: { value: confirmUserPassword } });
    const isConfirmaddressValid = handleAddress({ target: { value: address } });
    const isConfirmstateValid = handleState({ target: { value: state } });
    const isConfirmpincodeValid = handlePincode({ target: { value: pincode } });
    const isConfirmstoreValid = handleStoreNAme({ target: { value: storeName } });



    const form = event.currentTarget;

    if (form.checkValidity() === false || !isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isConfirmaddressValid || !isConfirmstateValid || !isConfirmpincodeValid || !isConfirmstoreValid) {
      event.stopPropagation();
      toast.error('fill the valid details')
     
    } else {
      // If the form is valid, proceed with form submission


      // request to your backend

      try {

        let res = await instance.post('/sellers/register', {

          fullName: userName,
          email: userEmail,
          password: userPassword,
          storeName,
          businessAddress: {
            address,
            state,
            pincode
        }
        })

        if (res.data.success) {
          toast.success(res.data.message);


          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate('/sellers/signin');
        }




      } catch (error) {


        //if (error.response.data.message.includes('E11000')) {


       //   toast.error(`Email is already registered`)

       // } else {

          toast.error('Failed to Register')
        //}
      }



    }
  }

  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />
      <Row>
        <Col>
          <h3 className='my-4 text-dark fs-1 mb-5'>Create Seller Account :</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
      <Col md={5}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formGroupName">
            <Form.Label className='fw-bold'>Name</Form.Label>
            <Form.Control
              className='shadow-none'
              type="text"
              placeholder="Enter name"
              value={userName}
              onChange={handleUserName}
              required
            />
            {userNameError && <div className='p-1' style={{ color: 'red' }}>{userNameError}</div>}
          </Form.Group>

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
            {emailError && <div className='p-1' style={{ color: 'red' }}>{emailError}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label className='fw-bold'>Password</Form.Label>
            <Form.Control
              className='shadow-none'
              type="password"
              placeholder="Enter Password"
              value={userPassword}
              onChange={handlePassword}
              autoComplete="new-password"
              required
            />
            {passwordError && <div className='text-danger' >{passwordError}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupConfirmPassword">
            <Form.Label className='fw-bold'>Confirm Password</Form.Label>
            <Form.Control
              className='shadow-none'
              type="password"
              placeholder="Re-enter Password"
              value={confirmUserPassword}
              onChange={handleConfirmPassword}
              autoComplete="new-password"
              required
            />
            {ConfirmPasswordError && <div className='p-1' style={{ color: 'red' }}>{ConfirmPasswordError}</div>}
          </Form.Group>
        </Form>
      </Col>

      <Col md={5}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="storeGroupName">
            <Form.Label className='fw-bold'>Store Name</Form.Label>
            <Form.Control
              className='shadow-none'
              type="text"
              placeholder="Enter store name"
              value={storeName}
              onChange={handleStoreNAme}
              required
            />
            {storeNameError && <div className='p-1' style={{ color: 'red' }}>{storeNameError}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridAddress2">
            <Form.Label className='fw-bold'>Business Address</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              value={address}
              onChange={handleAddress}
              required
            />
            {addressError && <div className='p-1' style={{ color: 'red' }}>{addressError}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridState">
            <Form.Label className='fw-bold'>State</Form.Label>
            <Form.Select value={state} onChange={handleState} isInvalid={!!stateError}>
              <option>Choose...</option>
              {IndianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
            {stateError && <div className='p-1' style={{ color: 'red' }}>{stateError}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridZip">
            <Form.Label className='fw-bold'>Pincode</Form.Label>
            <Form.Control
              placeholder="Pin"
              value={pincode}
              onChange={handlePincode}
              required
            />
            {pincodeError && <div className='p-1' style={{ color: 'red' }}>{pincodeError}</div>}
          </Form.Group>

          
        </Form>
      </Col>
      <Col md={12}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="d-flex justify-content-center p-4">
            <Button type="submit" variant="primary">Submit</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
    </Container>

  )


}

export default SignUp
