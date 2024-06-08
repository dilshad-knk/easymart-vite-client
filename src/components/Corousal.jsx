import React, { useState } from "react";
import { Carousel, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

const Corousal = () => {
  return (
    <div>
      <Carousel className="py-2 py-md-0 ">
        <Carousel.Item className="">
          <Link to="electronics--gadgets">
            <ImageCorousal
              img="https://res.cloudinary.com/dnjqczxfd/image/upload/v1717636324/2106.q703.016.S.m004.c10.household_appliance_realistic_vd1sbo.jpg"
              text="slide"
            />

            <Carousel.Caption className=" m-0 p-2">
              <h1 className="pt-2"> Shop Now</h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="fashion--apparel">
            <ImageCorousal
              img="https://res.cloudinary.com/dnjqczxfd/image/upload/v1716438654/samples/ecommerce/cld-sample-5.jpg"
              text="slide"
            />
            <Carousel.Caption className=" m-0 p-2">
              <h1 className="pt-2"> Shop Now</h1>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Corousal;

const ImageCorousal = ({ img, text }) => {
  const [loaded, setLoaded] = useState(false);


  const handleImageLoad = () => {
    setLoaded(true);
  };


  
      
    return (
      <>
 
        <img
          className="d-block w-100"
          style={{ maxHeight: "600px", objectFit: "cover" }}
          src={img}
          alt={text}
          onLoad={handleImageLoad}
        />
   
       {!loaded && 
       <Placeholder animation="glow">
          <Placeholder className='bg-secondary' xs={12} style={{ height: "400px" }} />
        </Placeholder>}
    
    </>
          
  );
};
