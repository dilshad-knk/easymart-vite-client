import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../components/style.css'
import FeaturedProducts from '../components/FeaturedProducts';
import Corousal from '../components/Corousal';
const Home = () => {

  


  return (
  <div>
      <Corousal/>
      <FeaturedProducts/>
      
  </div>
  );
};

export default Home;







