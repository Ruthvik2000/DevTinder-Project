import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { removeFeed } from "../utils/feedSlice";


const Body=()=>{
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async() =>{
        //if (userData) return;
        try{
          const res =await axios.get(BASE_URL + "/profile/view", { withCredentials: true, });
          dispatch(addUser(res.data)); // we will add the user data to the addUser slice after logged in.
          }catch(err){
              if(err?.response?.status == 401){
                dispatch(removeUser());
                dispatch(removeFeed());
                navigate("/login");
                return;
              }
              console.log("Fetch  user failed", err);
          }
    }
    
    //Now we will call the UseEffect to fetch the data only if there is no user_data in the appstore
    useEffect(() => {
      if(!userData){
            fetchUser();
      }
    }, []);

    return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
