import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";


const Navbar = () => {
  const user= useSelector((store) => store.user); // WE will get the logged in user data(fisrtname,lastname,about,photourl,skills)
  //console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout= async() =>{    
    try{
      await axios.post(BASE_URL + "/logout", {}, { withCredentials : true});
      //clear the data of user and feed of loggedINUser from reduxstore and navigate  to login
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    }catch(err){
      //Error logic: redirect to error page}
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-300 px-5 shadow-sm flex justify-between">
        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl">
        DevTinder
        </Link>

        {user && (
        <div className="flex items-center gap-4">
        {/* Welcome Message */}
        <div className= "text-green-400 font-semibold px-3 py-2 rounded-xl bg-gray-800">
          👋 Welcome, {user.firstName}! 
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end mx-5 flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition">
            <div className="w-10 rounded-full border border-gray-500">
              <img
                alt="User avatar"
                src={user.photoUrl}
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-4 z-[9999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between hover:bg-gray-800 rounded-md p-2">
                Profile <span className="badge badge-success">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections" className="justify-between hover:bg-gray-800 rounded-md p-2">
                Connections <span className="badge badge-error">💗</span>
              </Link></li>
            <li>
              <Link to="/requests" className="justify-between hover:bg-gray-800 rounded-md p-2">
                Requests <span className="badge">👁️</span>
              </Link></li>
            <li>
              <button onClick={handleLogout} className=" text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md">Logout</button></li> 
          </ul>
        </div>
      </div>
      )}
    </div>
  );
};

export default Navbar;