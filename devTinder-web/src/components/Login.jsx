import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {BASE_URL} from "../utils/constants";
import { useNavigate } from "react-router-dom";


const Login =() =>{
    const [emailId, setEmailId] = useState("ruthvik@gmail.com");
    const [password, setPassword] = useState("Fall@2000");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginFrom, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() =>{
      
      try{
      const res= await axios.post(
        BASE_URL + "/login",
        {emailId,password},
        {withCredentials: true}
    );
    console.log(res.data);
    /*After clicking on the button login the creditinals(emailId,password) will be sent to backend server,
    and the Application server will recieve cookies(which contains tokens) and loogedUser data(firstName,lastname,skills,about,etc__),
    And that loggeduser data will be dispatched now into the appstore using actions,reducers.
    */
    dispatch(addUser(res?.data?.user || res?.data));
    navigate("/")
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
    }

    const handleSignUp = async () => {
      try {
        const res = await axios.post(
          BASE_URL + "/signup",
          {
            firstName,
            lastName,
            emailId,
            password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        dispatch(addUser(res?.data?.data));
        return navigate("/profile");
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    }

    return(
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginFrom ? "Login" : "Signup"}
            </h2>

          {/* ✅ Signup fields should show only when NOT in login mode */}
          {!isLoginFrom && ( 
            <>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text" 
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text" 
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text"> Email</span>
            </div>
            <input
              type="text" 
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text" 
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary"
              onClick={isLoginFrom ? handleLogin : handleSignUp}
            >
              {isLoginFrom ? "Login" : "Signup"}
            </button>
            <p
              className=" text-center cursor-pointer py-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginFrom
                ? "Signup"
                : "Login"}
            </p>             
          </div>
        </div>
      </div>
    );
  };
export default Login;