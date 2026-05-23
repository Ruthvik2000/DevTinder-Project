import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";


const Feed = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const feed = useSelector((store) => store.feed);
    

    const getFeed= async() =>{

        try{
            const res = await axios.get(
                BASE_URL+"/feed",
                {withCredentials:true,}
            );
            // If backend returns { data: [...] }
            //const feed_list = res?.data?.data || res?.data || [];
            dispatch(addFeed(res.data || []));
        }catch(err){
        if (err?.res?.status === 401) {
            navigate("/login");
            return;
        }
        console.log("Feed Error",err);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (feed===null || feed === undefined) {
        return <h1 className="flex justify-center mt-20">Loading...</h1>;
    }


    // Empty state
	if (feed.length <= 0) {
		return (
			<div className="hero min-h-[60vh] bg-base-200 rounded-2xl">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-4xl font-bold">You reached the end!</h1>
						<p className="py-6 opacity-80">
							No more profiles right now. Check back later or update your
							interests.
						</p>
						<button className="btn btn-primary" onClick={getFeed}>
							Refresh Feed
						</button>
					</div>
				</div>
			</div>
		);
	}

    return(
        feed &&(
        <div className="flex flex-col items-center gap-4 my-5">
            {feed && feed.map((user) => <UserCard key={user._id} user={user} />)}
            {/* <UserCard user={feed[0]} /> */}
        </div>
        )
    );
};

export default Feed;