import App from "../pages/App"
import CategorySection from "../pages/CategorySection"
import MoreDetails from "../pages/MoreDetails"
import UserSignin from "../pages/user/UserSignin"
import UserSignUp from "../pages/user/UserSignUp"
import React from 'react'
import Cart from "../pages/user/Cart"
import Profile from "../pages/user/Profile"
import SearchResults from "../pages/SearchResults"
import UserProtected from "./ProtectedRoutes/UserProtected"
import CheckoutPage from "../pages/user/CheckoutPage"
import AboutUs from "../pages/AboutUs"
import Contact from "../pages/Contact"
import PrivacyPolicy from "../pages/user/PrivacyPolicy"
import TermsCondition from "../pages/user/Terms&Condition"
import CancellationandREfund from "../pages/user/CancellationandREfund"
import ShippingPolicy from "../pages/user/ShippingPolicy"
   
const UserRoutes = (categories) => {

    const userRoutes =  [
        {
          path: "/",
          element: <App />,
        },

        ...categories.map((category) => ({
          path: `/${category.slug}`,
          element: <CategorySection slug={category.slug} categoryName={category.name} />,
        })),
        {
          path : "/:slug/:productId",
          element: <MoreDetails/>
        },
        {path: '/signin',
        element: <UserSignin/>
        },
        {path: '/signup',
        element: <UserSignUp/>
        },
        {path: '/cart',
        element:<UserProtected> <Cart/></UserProtected>
        },
        {path: '/profile',
        element: <UserProtected><Profile/></UserProtected>
        },
        {path: '/checkout',
        element: <UserProtected><CheckoutPage/></UserProtected>
        },
        {path: '/search',
        element: <SearchResults/>
        },
        {path: '/about',
        element: <AboutUs/>
        },
        {path: '/contact',
        element: <Contact/>
        },
        {path: '/PrivacyPolicy',
        element: <PrivacyPolicy/>
        },
        {path: '/TermsConditions',
        element: <TermsCondition/>
        },
        {path: '/CancellationRefundPolicies',
        element: <CancellationandREfund/>
        },
        {path: '/ShippingPolicy',
        element: <ShippingPolicy/>
        },
       

      ] 
     return userRoutes
   }
   
   export default UserRoutes

                          
            