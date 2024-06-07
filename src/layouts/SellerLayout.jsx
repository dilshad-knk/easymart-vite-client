import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SellerNavbar from '../components/seller/SellerNavbar';


const SellerLayout = () => {
  return (
    <div>
        <SellerNavbar/>
      <main>
        <Outlet />
      </main>
      <footer className='p-0'><Footer/></footer>
    </div>
  );
};

export default SellerLayout;
