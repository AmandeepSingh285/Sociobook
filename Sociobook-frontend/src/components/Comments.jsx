import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import { useNavigate } from "react-router-dom";

const Comments = ({ comments, ansId, qid }) => {
  const [comment, setComment] = useState("");
  const { token, id } = useContext(UserContext);
  const { setReload } = useContext(QuestionContext);
  const navigate = useNavigate();

  const handleCommentPost = async (event) => {
    event.preventDefault();

    const res = await Axios.post(
      "http://localhost:3001/comments/create",
      { ansId: ansId, user: id, content: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComment("");

    if (res.status == 200) setReload(true);
    else navigate("/error");
  };

  return (
    <div className="ml-4 mt-5">
      <div className="flex">
        <h5 className="mr-6">Add new comment: </h5>
        <textarea
          className="w-3/4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] h-8 mr-6"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          className="h-8 w-1/12 bg-red-500 hover:bg-red-400 text-white font-bold border-b-4 border-red-700 hover:border-red-500 rounded"
          onClick={handleCommentPost}
        >
          Post
        </button>
      </div>

      {comments && comments.length > 0 ? (
        <div>
          <h3 className="font-bold mt-5">Comments: </h3>
          {comments.map((item, index) => {
            return (
              <div className="flex m-6 border-solid border-gray-600 rounded border-3">
                <h6 className="mr-3">{index + 1}.</h6>
                <h4 className="mr-4 font-semibold">{item.username}</h4>
                <h4>{item.content}</h4>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
