import React ,{useState}from 'react'
import { Accordion, Button, Col, Container, Row ,Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductAdd from "./ProductAdd";

function SellerHeader(isVerified) {

  const [showProductAdd, setShowProductAdd] = useState(false);

  const handleButtonClick = () => {
    setShowProductAdd((prevShowProductAdd) => !prevShowProductAdd);
  };


  return (
    <Container>
        
        <Row>
        <Col className='mx-auto'>
          <Button onClick={handleButtonClick}>
            {showProductAdd ? 'Seller Dashboard' : 'Add Product'}
          </Button>
          {showProductAdd && isVerified && <ProductAdd />}
        </Col>
      </Row>
              
    </Container>
  )
}

export default SellerHeader