import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row,Col,Button,Table,Card,Modal,Form } from 'react-bootstrap';
import instance from '../../axios/axios';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams  } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { showFailureAlert,showSuccessAlert } from '../../Utils/toastifyAlert';
import { CiEdit } from "react-icons/ci";
import ProductAdd from '../../components/seller/ProductAdd'
import useProductCategories from '../../Utils/useProductCategories';

export default function MoreEditDltSellerProducts() {
 
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);

    console.log(product,'more');

    const handleAddProductClick = () => {
     
      setShowAddProduct(prevState => !prevState);
    };


    useEffect(() => {
        
        fetchData();
      }, [id]); 
    
      const fetchData = async () => {
        try {
          const response = await instance.get(`/sellers/products/${id}`);


      

          if(response.data.success){
            
            
            setProduct(response.data.product);
  
  
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
 
 
    return (
      <Container>
      {product && (
        <Row >
          <Col md={4} className='py-3 d-flex flex-column sticky'>
            <Card className='p-3'>
              <Card.Img variant="top" src={import.meta.env.VITE_SERVER_URL + product.image} className="img-fluid mw-100 custom-card-img1" />
            </Card>
            <div className='flex-grow-1 border my-2 py-3 d-flex justify-content-center align-items-center'>
                <div className="pe-5">
                  <DeleteProduct id={product._id} fetchData={fetchData} />
                </div>
                <div className="ps-5" onClick={handleAddProductClick}>
                  <EditProduct productprop={product} fetchData={fetchData} handleAddProductClick={handleAddProductClick}/>
                </div>
            </div>
           
          </Col>
          <Col md={8} className='py-3'>
            <h1>{product.name}</h1>
            <Card>
              <Card.Body>

                <Card.Text>
                        <span className='fw-bold'>Stock :</span>{' '}
                       {product.stock}
                </Card.Text>
          
                <Card.Text>
                        <span className='fw-bold'>Price :</span>{' '}
                       {product.price}
                </Card.Text>
               
                <Card.Text>
                  <span className='fw-bold'>Description :</span>{" "}
                  {product.description && (
                    <ul>
                      {product.description.split(/\n|\r\n|\r/g).map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      )}
    </Container>
    
  )
}






function DeleteProduct({id,fetchData}) {

   
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const navigate = useNavigate()
  
  
  
  
  const handleConfirm = async()=>{
      
      setShow(false);

       try {

        const res = await instance.delete(`/sellers/products/${id}`, {
            withCredentials:true
        });

       
        if(res.data.success){
            navigate('/sellers/sellerDashboard')
            showSuccessAlert(res.data.success)
            fetchData()
          
          }
        
       } catch (error) {
        
        showFailureAlert(error.response.message)

       }

    }

  return (
    <>

      <div>




      </div>

        <Button onClick={handleShow} className='px-2  d-flex justify-content-center align-items-center'>
            Delete <RiDeleteBinLine className='ms-1' />
        </Button>
        

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete the Product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
       
    </>
    
  )
}




function EditProduct({productprop,fetchCategories,fetchData,handleAddProductClick}) {

  
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true)
 
  const [product,setProduct] = useState(productprop)
  const navigate = useNavigate()
  const categories = useProductCategories();



  useEffect(() => {
    setProduct(productprop);
  }, [productprop]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct({ ...product, category: categoryId });
  };


  const handleSubmit = async (event) => {

    setModalShow(false)
    event.preventDefault();
    const form = event.currentTarget;

  
      
      const formData = new FormData();
      
        formData.append('name',product.name);
        formData.append('description',product.description);
        formData.append('price',product.price);
        formData.append('category',product.category);
        formData.append('image',product.image);
        formData.append('stock',product.stock);
        
    

      
      
      try {
      
    

        
      const res = await instance.put(`/sellers/products/${product._id}`, formData, {
            headers:{
              'Content-Type':'multipart/form-data',
            },
            withCredentials:true
          }
          );
          
          

  
  if (res.data.success) {
    fetchData()
    showSuccessAlert(res.data.success)
  }
  } catch (error) {
      
         showFailureAlert("catch error");
        
      
      }
   
  
   
  };



return (
    <Container>
    
    <Row>
        <Col>
            
              <Button onClick={handleShow} className='px-3  d-flex justify-content-center align-items-center'>
                Edit<CiEdit/>
              </Button>
        </Col>
    </Row>
    <Row>
        <Col md={6} className="mx-auto">
        
        </Col>
        <Col>

            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow} onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form noValidate  onSubmit={handleSubmit} >
                    <Form.Group className="mb-4" controlId="formGroupName">
                        <Form.Label className='fw-bold'>Product Name</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          defaultValue={product.name}
                          placeholder="Enter Product name"
                          onChange= {(e)=> setProduct({...product,name: e.target.value})}
                          required
                        />
                        
                        
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupAddress">
                        <Form.Label className='fw-bold'>Price</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          defaultValue={product.price}
                          placeholder="Enter price"
                          onChange={(e)=> setProduct({...product,price:e.target.value})}
                          required
                        />
                         
                    </Form.Group>
                  
                    <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='fw-bold'>Description</Form.Label>
                        <Form.Control 
                        as="textarea"
                         rows={3} 
                         placeholder="Enter Description "
                         defaultValue={product.description}
                         onChange={(e)=> setProduct({...product,description:e.target.value})}
                         required
                        

                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Category" className="mb-4">
                        <Form.Label className="fw-bold">Category</Form.Label>
                        <Form.Select
                            
                            onChange={handleCategoryChange}
                            required
                        >
                          <option value="" hidden disabled>Choose...</option>
                            {categories.map(category => (
                              <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </Form.Select>
                      </Form.Group>

                    <Form.Group className="mb-4" controlId="formGroupAddress">
                        <Form.Label className='fw-bold'>Stock</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
                          defaultValue={product.stock}
                          placeholder={`${product.stock} items`}
                          onChange={(e)=> setProduct({...product,stock:e.target.value})}
                          required
                        />
                         
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className="fw-bold">Upload New Product Photo</Form.Label>
                            <Form.Control 
                            className='shadow-none'  
                            type="file" 
                            onChange= {(e)=> setProduct({...product, image: e.target.files[0]})}

                            required />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center p-4">
                        <Button type="submit" variant="primary">Submit</Button>
                        <Button className='mx-5' onClick={handleAddProductClick} >Close</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
          
          </Modal>
        </Col>
    </Row>
  </Container>
  )
}




