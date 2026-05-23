import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) =>{
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user?.skills || []);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async() =>{
      //clearing the errors
      setError("");
      try{
        const res = await axios.post(
          BASE_URL + "/profile/edit",
          {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          }, 
          { withCredentials: true }
        );
        console.log(res.data);
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }catch(err){
            setError(err?.response?.data || err.message || "Something went wrong");
      }
    };

    return(
    <>
    <div className="flex justify-center my-10 max">
        <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
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

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number" 
                    value={age ?? ""}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> Photo URL</span>
                  </div>
                  <input
                    type="text" 
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.split(","))}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  ></textarea>
                </label>

                </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, about, age, gender , skills}}/>
    </div>
    {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
    );
}

export default EditProfile;