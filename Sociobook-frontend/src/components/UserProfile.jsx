import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import AddQuestionTopic from "./AddQuestionTopic";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(null);
  const [topics, setTopics] = useState([]);
  const [followedTopics, setFollowedTopics] = useState([]);
  const [reload, setReload] = useState(false);

  const [editAvatar, setEditAvatar] = useState(0);

  const { user, id, token } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async () => {
      setReload(false);
      const userData = await Axios.get(
        `http://localhost:3001/users/current/${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = userData.data;
      setUserInfo(data);
      const topicIds = data.topics.map((item) => item.topicId);

      setFollowedTopics(topicIds);

      const allTopics = await Axios.get(
        "http://localhost:3001/topics/allTopics"
      );

      setTopics(allTopics.data.topicInfo);
      console.log(topics);
    };

    getUserInfo();
  }, [reload]);

  const handleProfileChanges = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (image) formData.append("avatar", image);
    else formData.append("avatar", null);

    formData.append("topics", JSON.stringify(followedTopics));

    const res = await Axios.put(
      `http://localhost:3001/users/update/${user}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status == 200) setReload(true);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl m-10">Welcome {user}</h1>
      <div className="flex">
        <div className="m-6 w-1/2">
          <h3 className="text-xl">Firstname: {userInfo.firstname}</h3>
          <h3 className="text-xl">Lastname: {userInfo.lastname}</h3>
          <h3 className="text-xl">User Id: {userInfo.id}</h3>
          <h3 className="text-xl">Email: {userInfo.email}</h3>
        </div>
        <div className="w-1/2">
          <img
            src={
              userInfo.avatar !== ""
                ? userInfo.avatar
                : "https://res.cloudinary.com/dczpa34xo/image/upload/v1716357859/user_image_u3y3ie.jpg"
            }
            className="m-auto"
          />
          <div>
            {editAvatar ? (
              <input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
                className="ml-72 mt-6"
              />
            ) : null}
          </div>
          <button
            onClick={() => setEditAvatar(1 - editAvatar)}
            className="ml-80 mt-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12"
          >
            Edit Avatar
          </button>
        </div>
      </div>
      <div className="m-10">
        <h2 className="font-semibold text-lg mb-7">Followed Topics: </h2>
        <div className="flex">
          {Object.keys(userInfo).length > 0 &&
            userInfo.topics.map((item) => {
              return (
                <div className="h-16 w-28 bg-green-600 flex mr-6 justify-center">
                  <h3 className="font-semibold m-auto">{item.topicName}</h3>
                </div>
              );
            })}
        </div>
      </div>

      <div className="m-10">
        <h2 className="font-semibold text-lg mb-6">Follow New Topics: </h2>
        <div className="flex">
          {topics &&
            topics.map((item) => {
              return userInfo.topics.some(
                (topic) => topic.topicId === item.id
              ) ? null : (
                <AddQuestionTopic
                  name={item.name}
                  tid={item.id}
                  setSelectedTopics={setFollowedTopics}
                  selectedTopics={followedTopics}
                  profile="UserProfile"
                />
              );
            })}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleProfileChanges}
          className="mt-10 mb-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
