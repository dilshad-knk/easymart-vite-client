import { useEffect, useState } from "react";
import useProductCategories from "../Utils/useProductCategories";
import MainLayout from "../layouts/MainLayout";
import App from "../pages/App";
import CategorySection from "../pages/CategorySection";
import MoreDetails from "../pages/MoreDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminSignin from "../pages/admin/AdminSignin"
import AdminProtected from "./ProtectedRoutes/AdminProtected";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../components/NotFound"
import SellerRoutes from "./SellerRoutes";
import SellerLayout from "../layouts/SellerLayout";
import UserRoutes from "./UserRoutes";
import Loading from "../components/Loading";



const RoutesWrapper = () => {
    const [router, setRouter] = useState(null);
    const categories = useProductCategories();
  
    useEffect(() => {
      if (categories.length > 0) {
        const routes = [
          {
            element: <MainLayout />,
            children:UserRoutes(categories),
          },
          {element: <SellerLayout />,
          children: SellerRoutes()
          } ,
    
          {
            path: "/admin-login",
            element: <AdminSignin/>
          },
          {
            path: "/admin/dashboard",
            element: <AdminProtected><AdminDashboard/></AdminProtected>
          },
          {
            path: "/*",
            element: <NotFound/>
          },
          
        ];

        
  
        setRouter(createBrowserRouter(routes));
      }
    }, [categories]);
  
    if (!router) {
      return <Loading/>; 
    }
  
    return <RouterProvider router={router} />;
  };

export default RoutesWrapper