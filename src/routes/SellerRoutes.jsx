import SellerLayout from "../layouts/SellerLayout";
import MoreEditDltSellerProducts from "../pages/seller/MoreEditDltSellerProducts";
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerPage from "../pages/seller/SellerLandingPage";
import SignIn from "../pages/seller/SignIn";
import SignUp from "../pages/seller/SignUp";
import SellerProtected from "./ProtectedRoutes/SellerProtected";

import React from 'react'

const SellerRoutes = () => {
    const sellerRoutes =  [
        {
            path: "/sellers",
            element: <SellerPage />,
        },
        {
            path: "/sellers/signin",
            element: <SignIn />,
        },
        {
            path: "/sellers/signup",
            element: <SignUp />,
        },
        {
            path: "/sellers/dashboard",
            element: <SellerProtected> <SellerDashboard /> </SellerProtected>,
        },
        {
            path: "/sellers/product/:id",
            element: <SellerProtected> <MoreEditDltSellerProducts /></SellerProtected>                  
            
        },
    ]
  return sellerRoutes
}

export default SellerRoutes


