import {Nav,Col} from 'react-bootstrap';
import React, { useState } from 'react';
import SellerAdministration from './SellerAdministration';
import AddDeleteEditPC from './AddDeleteEditPC';


export default function SubNav() {

const [activeIndex, setActiveIndex] = useState(0);

  return (

    <>
    
        <Col>
        
             <Nav>
                <NavItem
                    title="Sellers"
                    isActive={activeIndex === 0}
                    onShow={() => setActiveIndex(0)}
                >
                    
                </NavItem>
                <NavItem
                    title="Add/Delete/Edit Product Category"
                    isActive={activeIndex === 1}
                    onShow={() => setActiveIndex(1)}
                ></NavItem>
                <NavItem
                    title="HomePageEdit"
                    isActive={activeIndex === 2}
                    onShow={() => setActiveIndex(2)}
                ></NavItem>
            </Nav>
        </Col>
        <Col>
       
             {activeIndex === 0 && <SellerAdministration />}
             {activeIndex === 1 && <AddDeleteEditPC />}



        </Col>
           

    </>
  );
}





function NavItem ({
    title,
    children,
    isActive,
    onShow

}) {


return(

    <Nav.Item className={`mx-3 p-0 border ${isActive && 'border-bottom-0 bg-primary text-white'}`}>
    <section className="panel px-2 pt-2">
      <h5 onClick={onShow}>{title}</h5>
      {isActive && <div>{children}</div>}
    </section>
  </Nav.Item>

)
   
}