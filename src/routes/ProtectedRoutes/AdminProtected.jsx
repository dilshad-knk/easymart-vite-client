import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({ children }) => {
  const isadminAuthenticated = useSelector(
    (state) => state.admin.isadminAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isadminAuthenticated) {
      navigate('/admin-login');
    }
  }, [isadminAuthenticated, navigate]);

  return isadminAuthenticated ? children : null;
};

export default AdminProtected;
