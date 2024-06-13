import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination"
import useGetProducts from "../Utils/products";

// Custom useQuery hook to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("q"); // Extracts the 'q' parameter from the query string
  


  const {
    products,
    totalPages,
    loading,
    currentPage,
    totalItems,
    setQuery,
    setCurrentPage,
    updateCategoryName,
  } = useGetProducts(undefined,undefined,undefined,query);

  useEffect(() => {
    setQuery(query);
  }, [query, setQuery]);


  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (loading) {
    
    return (
      <Row>
        {[...Array(8)].map((_, index) => (
          <Col key={index} xs={12} className="py-3" sm={6} md={4} lg={3}>
            <Placeholder as={Card} animation="glow">
              <Placeholder xs={12} style={{ height: "200px" }} />
            </Placeholder>
          </Col>
        ))}
      </Row>
    );
  }


  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <h3>"{totalItems}" products found</h3>
  
     
     {products.length === 0 ? (
      <h5 className="py-5">
       <>
         No products listed in the keyword {`"${query}"`} . You can list your
         products here by becoming a seller.
         <Link to="/sellers">Click here</Link> to become a seller.
       </>
       </h5>
     ) : (
       ""
     )}
  
   <Row>
     {products.map((product) => (
       <Col key={product.id} xs={12} className="py-3" sm={6} md={4} lg={3}>
         <Link
           to={`/${product.category.name}/${product._id}`}
           state={{ product: product }}
           className="text-decoration-none"
         >
           <Card className="shadow">
             <Card.Img
               variant="top"
               src={import.meta.env.VITE_SERVER_URL + product.image}
               className="custom-card-img p-1"
             />
             <Card.Body>
               <div className=" title-wrapper">
                 <Card.Title className="m-0">{product.name}</Card.Title>
               </div>
               <div className="mb-2 mt-4 d-flex justify-content-between">
                 <Card.Text className="m-0 fw-bolder">
                   <span className="fw-bold">Price :</span> {product.price}
                 </Card.Text>
                 <Card.Text className="m-0">
                   <span className="fw-bold">
                     {product.stock ? "In Stock" : "Out of Stock"}
                   </span>{" "}
                 </Card.Text>
               </div>
             </Card.Body>
           </Card>
         </Link>
       </Col>
     ))}
   </Row>
   <Row>
     <CustomPagination
       totalPages={totalPages}
       currentPage={currentPage}
       onPageChange={onPageChange}
     />
   </Row>
    </div>
  );
};

export default SearchResults;
