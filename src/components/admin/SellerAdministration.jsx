import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row,Col,Button,Table } from 'react-bootstrap';
import instance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



function SellerAdministration() {

  const [pendingSellers, setPendingSellers] = useState([]);

  console.log(pendingSellers)

    useEffect(() => {
        fetchPendingSellers();
      }, []);
    
    const fetchPendingSellers = async () => {
        try {
          const response = await instance.get('/admin/sellersUnverified', {
            
            withCredentials: true,
          })
          
          setPendingSellers(response.data.pendingSellers);
        } catch (error) {
          console.error('Error fetching pending sellers:', error);
        }
      };
    
    const handleVerifySeller = async (sellerId) => {
        try {
         
          const res = await instance.put(`/admin/verify-seller/${sellerId}`,null,{withCredentials: true, });
          alert('Seller Verified',res)
          fetchPendingSellers();
        } catch (error) {
          console.error('Error verifying seller:', error);
        }
    
      };







  return (
    <>
            <Col className='m-md-5' >
              <h2><strong>Pending Seller Verifications</strong></h2>
              <Table striped bordered hover>
                  <thead>
                    <tr className='text-center'>
                      <th>Name</th>
                      <th>Email</th>
                      <th>State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                        {pendingSellers && pendingSellers.length > 0 ? ( 
                            pendingSellers.map((seller) => (
                            <tr key={seller._id} className='text-center'>
                                <td>{seller.fullName}</td>
                                <td>{seller.email}</td>
                                <td>{seller.businessAddress.state}</td>
                                <td>
                                <Button variant="danger" onClick={() => handleVerifySeller(seller._id)}>
                                    Verify
                                </Button>
                                </td>
                            </tr>
                            ))
                        ) : ( 
                            <tr>
                                <td colSpan="4" className="text-center text-danger">
                                No sellers to verify.
                                </td>
                          </tr>
                        )}
                </tbody>

                </Table>
            </Col>
    
    
    </>
  )
}

export default SellerAdministration