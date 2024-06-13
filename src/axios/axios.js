import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/userAuthenticate";





const instance = axios.create({
    baseURL:'https://ecommerce-easymart-back.onrender.com',
    withCredentials: true,
});


// instance.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response && error.response.status === 401) {
//         console.log('session expired');
       
//         window.location.reload()
       
//       }
//       return Promise.reject(error);
//     }
//   );
  



export default instance;




export const Interceptor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
                    

    useEffect(() => {
        const interceptor = instance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    console.log('interceptor');
                    dispatch(userLogout());
                    navigate('/signin')
                }
                return Promise.reject(error);
            }
        );

        
        return () => {
            instance.interceptors.response.eject(interceptor);
        };
    }, []); 

    
    return null;
};






