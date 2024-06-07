
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtected = ({ children }) => {
  const isSellerAuthenticated = useSelector(
    (state) => state.seller.isSellerAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSellerAuthenticated) {
      navigate('/sellers');
    }
  }, [isSellerAuthenticated, navigate]);

  return isSellerAuthenticated ? children : null;
};

export default SellerProtected;
