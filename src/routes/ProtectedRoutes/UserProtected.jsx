
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from '../../axios/axios.js'


const UserProtected = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  
  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );

  const navigate = useNavigate();



  useEffect(() => {
    const verifyToken = async () => {
      try {
        let res = await instance.get('/user/verify')
        if (res.data.success) {
          setIsVerified(true);
       

        } else {
          navigate('/signin');
        }
      } catch (error) {

        console.error('Token verification failed', error);
        navigate('/signin');
      } finally {
        setIsLoading(false);
      }
    };
    if (!isUserAuthenticated) {
      verifyToken();
    } else {
      setIsLoading(false);
      setIsVerified(true);
    }
  }, [isUserAuthenticated, navigate]);

  return isUserAuthenticated ? children : null;
};

export default UserProtected;
