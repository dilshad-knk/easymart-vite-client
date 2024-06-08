import React from "react";
import { Card, CardBody, CardTitle, Container } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container>
      <Card className="p-2 shadow">
        <CardTitle className="fw-bold pt-3 px-3">About Us:</CardTitle>
        <CardBody>
            <p>Welcome to Easy Mart, your one-stop destination for all your shopping needs. Founded by Mohamed Dilshad, Easy Mart aims to revolutionize the way you shop by offering a convenient and hassle-free online platform. Our extensive selection of products spans across various categories including groceries, electronics, fashion, home essentials, and more.</p>

            <p>At Easy Mart, we are committed to providing our customers with an exceptional shopping experience. Our team works tirelessly to curate the finest products from trusted brands, ensuring quality and affordability. With user-friendly navigation and secure payment options, we strive to make your shopping experience seamless and enjoyable.</p>
           
            <p>As a customer-centric company, we value your feedback and continuously strive to improve our services. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations every step of the way. Join us at Easy Mart and discover a world of convenience, variety, and savings.</p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AboutUs;
