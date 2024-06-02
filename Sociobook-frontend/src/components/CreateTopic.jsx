import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTopic = () => {
  const [topicName, setTopicName] = useState("");
  const { token, setHomeReload } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNewTopic = async (event) => {
    const res = await Axios.post(
      "http://localhost:3001/topics/create",
      { name: topicName, questions: [] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status < 300) {
      setHomeReload(true);
      navigate("/user/home");
    }
  };

  return (
    <div className="m-10">
      <div>
        <h1 className="font-bold text-2xl">Create new topic:</h1>
      </div>
      <div className="mt-10 flex">
        <label className="mr-3 text-xl">Enter new topic name:</label>
        <input
          placeholder="Enter topic Name"
          value={topicName}
          onChange={(event) => setTopicName(event.target.value)}
          className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
        />
      </div>
      <div className="mt-16 flex justify-center">
        <button
          className="mt-10 mb-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12"
          onClick={handleNewTopic}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateTopic;
