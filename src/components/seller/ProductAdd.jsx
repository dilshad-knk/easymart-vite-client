// import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/axios.js';
import { ToastContainer, toast } from 'react-toastify';
import useProductCategories from '../../Utils/useProductCategories.js';



function ProductAdd({handleAddProductClick}) {


    const [validated, setValidated] = useState(false);
    const [product,setProduct] = useState({
        name:'',
        description:'',
        price:'',
        category:'',
        stock:'',
        image:'',
        


    });

    const categories = useProductCategories();
    
    const navigate = useNavigate();
    
    

    const handleCategoryChange = (e) => {
      const categoryId = e.target.value;
      setProduct({ ...product, category: categoryId });
    };


 
   
    const handleSubmit = async (event) => {

     
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        
        event.stopPropagation();
        console.log('checkvalidity error')
        
      }  else{
        
        
        const formData = new FormData();
        
        	formData.append('name',product.name);
        	formData.append('description',product.description);
        	formData.append('price',product.price);
        	formData.append('category',product.category);
          formData.append('stock', product.stock);
        	formData.append('image',product.image);
        	
      

        
        
        try {
        
      

        	
		const res = await instance.post('/sellers/addProduct', formData, {
              headers:{
                'Content-Type':'multipart/form-data',
              },
              withCredentials:true
            }
            );
            
            

				
		if (!res.data.success) {
		  toast.error(res.data.message);
		
		} else {
		  toast.success(res.data.message);
      
		  await new Promise((resolve) => setTimeout(resolve, 2000));
      handleAddProductClick()

		 
		}

        } catch (error) {
        
        	 toast.error("catch error");
        	
        
        }
        
  
      }
       
      setValidated(true);
     
    
     
    };
  return (
    <Container>
    
    	 <ToastContainer 
        position="top-center"
        autoClose={1000}
        />
        <Row>
            <Col>
                    <h3 className='my-4 text-dark fs-1 mb-5'>Add New Product :</h3>
            </Col>
        </Row>
        <Row>
            <Col md={6} className="mx-auto">
              <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-4" controlId="formGroupName">
                        <Form.Label className='fw-bold'>Product Name</Form.Label>
                        <Form.Control
                          className='shadow-none'
                          type="text"
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
                         onChange={(e)=> setProduct({...product,description:e.target.value})}
                         required
                        

                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Category" className="mb-4">
                        <Form.Label className="fw-bold">Category</Form.Label>
                        <Form.Select
                            defaultValue=""
                            onChange={handleCategoryChange}
                            required
                        >
                          <option value="" disabled hidden>Choose...</option>
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
                          defaultValue='0'
                          placeholder="No.of Items"
                          onChange={(e)=> setProduct({...product,stock:e.target.value})}
                          
                        />
                         
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className="fw-bold">Upload Product Photo</Form.Label>
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
                
            </Col>
        </Row>
    </Container>
  )
}

export default ProductAdd