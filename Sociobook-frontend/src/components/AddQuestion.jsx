import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AddQuestionTopic from "./AddQuestionTopic";

const AddQuestion = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [question, setQuestion] = useState("");
  const { id, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      if (!token) {
        navigate("/error");
      }

      const res = await Axios.get("http://localhost:3001/topics/allTopics");

      setTopics(res.data.topicInfo);
    };

    fetchTopics();
  }, []);

  const handleNewQuestion = async () => {
    if (selectedTopics.length == 0 || question.length == 0) return;

    const res = await Axios.post(
      "http://localhost:3001/questions/create",
      {
        content: question,
        topics: selectedTopics,
        user: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res);

    if (res.status == 200) {
      navigate("/user/home");
    } else {
      navigate("/error");
    }
  };

  return (
    <div className="rounded border-solid border-2 m-5 p-3">
      <div className="m-3 p-3">
        <h1 className="text-xl font-bold">Enter Question: </h1>
      </div>
      <div>
        <textarea
          className="border-solid border-5 border-gray-500 w-full h-32 p-4"
          placeholder="Type Question Here"
          onChange={(event) => setQuestion(event.target.value)}
        />
      </div>
      <div className="m-3 p-3">
        <h3 className="text-l font-semibold">Select Topics: </h3>
      </div>
      <div className="flex">
        {topics &&
          topics.map((item) => {
            return (
              <div className="w-28 h-20 border-solid border-2 rounded m-6 flex justify-center">
                <AddQuestionTopic
                  name={item.name}
                  tid={item.id}
                  setSelectedTopics={setSelectedTopics}
                  selectedTopics={selectedTopics}
                  profile="AddQuestion"
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleNewQuestion}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded h-12 m-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
