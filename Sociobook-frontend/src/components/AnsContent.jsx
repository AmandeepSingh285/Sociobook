import React, { useState, useContext } from "react";
import Comments from "./Comments";
import QuestionContext from "../context/QuestionContext";
import UserContext from "../context/UserContext";
import Axios from "axios";

const AnsContent = ({
  content,
  aid,
  username,
  avatar,
  comments,
  qid,
  setEdit,
  setAnsSection,
  setNewAns,
  uid,
  setEditId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const { setReload } = useContext(QuestionContext);
  const { id, token } = useContext(UserContext);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAnsDelete = async (event) => {
    event.preventDefault();

    const res = await Axios.delete(
      `http://localhost:3001/answers/del/${aid}/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReload(true);
  };

  return (
    <div className="m-5">
      <div className="rounded border-solid border-2 p-3">
        <div className="flex">
          <img src={avatar} className="h-6 w-6 m-2 rounded-xl" />
          <h3 className="m-2 font-semibold text-sm">{username}</h3>
        </div>
        <div>
          <h5 className="text-sm mb-4">Answer ID: {aid}</h5>
        </div>

        <div className="mt-6 text-lg">{content}</div>

        <div className="mt-5 flex">
          <button onClick={toggleComments}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
          {uid == id ? (
            <div className="ml-auto">
              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded h-8 mr-6"
                onClick={() => {
                  setEdit(true);
                  setAnsSection(true);
                  setNewAns(content);
                  setEditId(aid);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-700 hover:bg-red-400 text-white font-bold py-1 px-4 border-b-4 border-red-700 hover:border-red-500 rounded h-8 m-auto"
                onClick={handleAnsDelete}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {showComments ? (
        <Comments comments={comments} ansId={id} qid={qid} />
      ) : null}
    </div>
  );
};

export default AnsContent;
