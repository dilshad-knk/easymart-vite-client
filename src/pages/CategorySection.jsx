import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Pagination, Placeholder } from "react-bootstrap";
import useGetProducts from "../Utils/products";
import { Link } from "react-router-dom";
import MoreDetails from "./MoreDetails";
import "../components/style.css";
import CustomPagination from "../components/CustomPagination";

const CategorySection = ({ slug, categoryName }) => {

  const limit = 4;
  const {
    products,
    totalPages,
    loading,
    currentPage,
    setCurrentPage,
    updateCategoryName,
  } = useGetProducts(categoryName,1,limit);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    updateCategoryName(categoryName);
  }, [categoryName]);

  // const filteredProducts = products.filter(product => product.category.name === categoryName);
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
    <div id={slug}>
      <h2>{categoryName}</h2>
     
        {products.length === 0 ? (
         <h5 className="py-5">
          <>
            No products listed in the {categoryName} category. You can list your
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
              to={`/${categoryName}/${product._id}`}
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

export default CategorySection;
