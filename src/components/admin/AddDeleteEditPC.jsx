import React, { useState, useEffect } from 'react';
import { Container, Row,Col,Button,Table,Form, Modal} from 'react-bootstrap';
import instance from '../../axios/axios';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { showFailureAlert,showSuccessAlert } from '../../Utils/toastifyAlert';
import { CiEdit } from "react-icons/ci";




export default function AddDeleteEditPC() {

  const [categories, setCategories] = useState([]);




  useEffect(() => {
    fetchCategories();
  }, []);




  const fetchCategories = async () => {
    try {
      const response = await instance.get('/category/fetch', { withCredentials: true });
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching pending categories:', error);
    }
  };


  return (
    <Col className='m-md-5' >
             
              <Table striped bordered hover>
                  <thead>
                  <tr>
                        <td colSpan="4" className="text-center">
                           

                                    <AddCategory fetchCategories={fetchCategories} />
                          
                        </td>
                     </tr>
                    <tr className='text-center'>
                      <th>No</th>
                      <th>Category</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                        {categories && categories.length > 0 ? ( 
                            categories.map((c,index) => (
                            <tr key={c._id} className='text-center'>
                                <td>{index+1}</td>
                                <td>{c.name}</td>
                                <td><EditCategory id={c._id} name={c.name} fetchCategories={fetchCategories}/></td>
                              
                                <td>
                                <DeleteUser id ={c._id}  fetchCategories={fetchCategories}/>
                                </td>
                            </tr>
                            ))
                        ) : ( 
                            <tr>
                                <td colSpan="4" className="text-center text-danger">
                               Loading
                                </td>
                          </tr>
                        )}
                </tbody>

                </Table>
            </Col>
  )
}





function AddCategory ({fetchCategories} ){

    const [category, setCategory] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         
            let res = await instance.post('/category/add', {
                name : category
              },{withCredentials: true, 
             })

            if (res.data.success) {
               
                showSuccessAlert(res.data.message)
                fetchCategories()

            } 
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.message);
                alert(error.response.data.message)

            } else {
                // If the expected properties are not present, provide a generic error message
                toast.error("An error occurred ");
                alert("An error occurred ")

            }
          }
        }
      

    return(

       <>
           
            <Col>
                <Form className='d-flex m-3'>
                    <Form.Group  className='d-flex w-25' controlId="formBasicEmail">
                        <Form.Control 
                        
                        className='shadow-none'
                        type="text"
                        placeholder="Enter new category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required />
                    </Form.Group>
                    <Button className='py-1 px-3 mx-4' type='submit' onClick={handleSubmit}>
                        Add
                    </Button>
                </Form>

            </Col>
       </>
    )
}




function DeleteUser({id,fetchCategories}) {

   
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  
  
  
  
  const handleConfirm = async()=>{
      
      setShow(false);

       try {

        const res = await instance.delete(`/category/${id}`, {
            withCredentials:true
        });


        if(res.data.success){
            
            showSuccessAlert(res.data.message)
            fetchCategories()
          
          }
        
       } catch (error) {
        
        showFailureAlert(error.response.message)

       }

    }

  return (
    <>
   

        <RiDeleteBinLine onClick={handleShow}/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete the Category?</Modal.Body>
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




function EditCategory({id,name,fetchCategories}) {

  
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true)






const handleSubmit = async(event) => {
  
  setModalShow(false);


  try {

    let res = await instance.put(`/category/${id}`,{
      name 
    },{withCredentials:true})

    if (res.data.success){
      showSuccessAlert(res.data.message);
      fetchCategories()
    
    }
 
   
    
    
  } catch (error) {
    showFailureAlert(error.message)
  }
 
      
  
}


return (
    <Container>
    
    <Row>
        <Col>
              <CiEdit onClick={handleShow}/>
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
            <Form >
                <Form.Group className="mb-4" controlId="formGroupName">
                    <Form.Label className='fw-bold'>Full Name</Form.Label>
                    <Form.Control
                      className='shadow-none'
                      type="text"
                      placeholder="Enter name"
                      
                      onChange={(event) => name = event.target.value}
                      defaultValue={name}
                      required
                      
                    />

                    
                </Form.Group>
                <Form.Group className="d-flex justify-content-center p-4">
                    <Button  variant="primary"  onClick={handleSubmit} >Update</Button>
                </Form.Group>
              
            </Form>
            </Modal.Body>
          
          </Modal>
        </Col>
    </Row>
  </Container>
  )
}


