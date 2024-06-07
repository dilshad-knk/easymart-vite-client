import App from "../pages/App"
import CategorySection from "../pages/CategorySection"
import MoreDetails from "../pages/MoreDetails"
import UserSignin from "../pages/user/UserSignin"
import UserSignUp from "../pages/user/UserSignUp"
import React from 'react'
import Cart from "../pages/user/Cart"
import profile from "../pages/user/Profile"
import Loading from "../components/Loading"
import Profile from "../pages/user/Profile"
import SearchResults from "../pages/SearchResults"
import UserProtected from "./ProtectedRoutes/UserProtected"
import CheckoutPage from "../pages/user/CheckoutPage"
   
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
       

      ] 
     return userRoutes
   }
   
   export default UserRoutes

                          
            