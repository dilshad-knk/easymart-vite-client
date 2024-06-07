
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtected = ({ children }) => {
  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/');
    }
  }, [isUserAuthenticated, navigate]);

  return isUserAuthenticated ? children : null;
};

export default UserProtected;
