
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer";
import Subnavbar from "../components/Subnavbar";
import { Container } from "react-bootstrap";
import MainNavbar from '../components/MainNavbar';
import instance from '../axios/axios';
import { userAuthSuccess } from '../redux/userAuthenticate';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from '../redux/cartSlice';

function MainLayout() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.themeStatus.darkMode);

  useEffect(() => {
    const checkUser = async () => {
      
      try {
      
        let res = await instance.get('/user/verify')

      
         
          if(res.data.success){
           dispatch(userAuthSuccess(res.data))
           dispatch(addToCart(res.data.user.cart));

        }
        
    
  
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        console.log(error);
      }
    };
    checkUser();
  }, []);
  return (
    <>
      <Container fluid className={`d-flex p-0 m-0 flex-column   ${darkMode? 'dark-mode' : 'light-mode'}`} style={{ minHeight: '100vh'}}>
          <MainNavbar/>
          <Subnavbar/>
          <main className="flex-grow-1 px-3">
            <Outlet /> 
          </main>
          <footer className='p-0'><Footer/></footer>
      </Container>

    
    </>
  );
}

export default MainLayout;
