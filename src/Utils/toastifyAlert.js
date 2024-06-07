import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const showSuccessAlert = (message) => {

    toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        });


}



export const showFailureAlert = (message) => {

    toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        });


}