import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () =>{
    const user = useSelector((store) => store.user);
    if (!user) {
        return (
        <div className="flex justify-center my-10 text-lg">
            Loading profile...
        </div>
        );
    }

    return(
        //if the user is present then need to open Editprofile

        <div>
            <EditProfile user={user}/>
        </div>
    );
};

export default Profile;