import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTeacher from "../hooks/useTeacher";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const { user } = useAuth();
  const [isTeacher, , category] = useTeacher();

  const axiosSecure = useAxiosSecure();
  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto border flex flex-col md:flex-row gap-5">
      <div className="avatar m-4">
        <div className=" h-44 w-44 ">
          <img
            className="rounded-md object-cover"
            src={
              userInfo.image ||
              "https://i.ibb.co.com/ThfJGYb/453178253-471506465671661-2781666950760530985-n.png"
            }
            alt="profile picture"
          />
        </div>
      </div>
      <div className="my-auto">
        <h2 className="text-2xl font-semibold text-blue-400 ">
          {" "}
          {userInfo.name}
        </h2>
        <h3 className="text-xl  mb-2 ">{userInfo.email}</h3>
        <p>
          Role :{" "}
          {userInfo.role
            ? userInfo.role
            : isTeacher === "approved"
            ? `Teacher (${category})`
            : "User"}
        </p>
        <p>Phone number : {userInfo.number}</p>
        <div>
          <Button
            onClick={() => {
              document.getElementById("my_modal_4").showModal();
              setUserId(userInfo._id);
            }}
          >
            <FaEdit className="text-2xl mr-2" />
            Update Profile
          </Button>
          <UpdateProfile
            refetch={refetch}
            userId={userId}
            userInfo={userInfo}
          ></UpdateProfile>
        </div>
      </div>
    </div>
  );
};

export default Profile;
