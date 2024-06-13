import React, { useEffect, useState } from 'react'
import useGetProducts from '../Utils/products';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {


    const {
        products,
        totalPages,
        loading,
        currentPage,
        setCurrentPage,
        updateCategoryName,
      } = useGetProducts();


    const [displayedProducts, setDisplayedProducts] = useState([]);

      useEffect(() => {
        if (products && products.length > 0) {
            const filterProduct = products.filter(product => !displayedProducts.some(displayedProduct => displayedProduct._id === product._id));
            setDisplayedProducts((prevProducts) => [...prevProducts, ...filterProduct]);
        }
    }, [products]);

    
    

      const loadMoreProducts = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };
  return (
    <div>
    <h2 className='my-3'>Featured Products</h2>
    <Row>



    {displayedProducts && displayedProducts.map(product => (

    <Col key={product.id} xs={12} className='py-3' sm={6} md={4} lg={3}>
      <Link to ={`/${product.category.name}/${product._id}`} state={{ product: product }} className='text-decoration-none'>
      
                <Card className='shadow'>
                  <Card.Img variant="top" src={import.meta.env.VITE_SERVER_URL + product.image}   className="custom-card-img p-1"/>
                  <Card.Body>
                    <div className=" title-wrapper">
                      <Card.Title className='m-0'>{product.name}</Card.Title>
                    </div>
                    <div className='mb-2 mt-4 d-flex justify-content-between'>
                          <Card.Text className='m-0 fw-bolder' >
                          <span className='fw-bold'>Price :</span>{' '}
                           {product.price}
                          </Card.Text>
                        <Card.Text className='m-0' >
                         <span className='fw-bold'>{product.stock? "In Stock" : "Out of Stock"}</span>{' '}
                        </Card.Text>
                    </div>
                                  
                  </Card.Body>
           </Card>

        </Link>
        </Col>
        
      ))}

    </Row>
    <Row>
        <Col className='d-flex justify-content-center m-2'>
            {currentPage < totalPages && (
               
                    <Button onClick={loadMoreProducts}>Load More</Button>
              
            ) }
        </Col>
    </Row>

  </div>
  )
}

export default FeaturedProducts