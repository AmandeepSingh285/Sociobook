import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import AnsContent from "./AnsContent";
import QuestionContext from "../context/QuestionContext";

const Question = () => {
  const [data, setData] = useState({
    question: "",
    topics: [""],
    user: {},
    answers: {},
  });
  const [error, setError] = useState(false);
  const [ansSection, setAnsSection] = useState(false);
  const [newAns, setNewAns] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();
  const { qid } = useParams();
  const { id, token } = useContext(UserContext);
  const { reload, setReload } = useContext(QuestionContext);

  const handleAnsSection = () => {
    setAnsSection(!ansSection);
  };

  const handleNewAnswer = async (event) => {
    event.preventDefault();

    if (newAns.length == 0) return;

    if (edit) {
      const res = await Axios.put(
        `http://localhost:3001/answers/edit/${editId}`,
        { content: newAns, user: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewAns("");
      setAnsSection(!ansSection);
      setEdit(false);
      setReload(true);
    } else {
      const res = await Axios.post(
        "http://localhost:3001/answers/create",
        { qid: qid, content: newAns, user: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewAns("");
      setAnsSection(!ansSection);
      setReload(true);
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!token) {
        setError(true);
        return;
      }

      try {
        const res = await Axios.get(
          `http://localhost:3001/questions/get/${qid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const question = res.data.question;
        const topics = res.data.topics;
        const askedBy = res.data.user;
        const answers = res.data.answers;

        const quesData = {
          question: question,
          topics: topics,
          user: askedBy,
          answers: answers,
        };

        setData(quesData);
      } catch (error) {
        setError(true);
      }
    };

    setReload(false);
    fetchQuestion();
  }, [reload]);

  if (error) {
    navigate("/error");
  }

  return (
    <div className="m-6 p-5">
      <div className="mb-10">
        <h1 className="font-bold text-xl mb-4">{data.question}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border-1 rounded border-black border-solid">
          <button className="flex" onClick={handleAnsSection}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <h4 className="mr-2 ml-2 font-semibold">Answer</h4>
          </button>
        </div>
        <div className="flex">
          <h4 className="mr-2">By: </h4>
          <div className="font-semibold mr-2">{data.user.username}</div>
          <div>
            <img src={data.user.avatar} className="h-8 w-8 rounded-xl" />
          </div>
        </div>
        <div className="flex">
          <h4 className="mr-3">Topics: </h4>
          {data.topics.map((item) => {
            return <h4 className="mr-2">{item.name}</h4>;
          })}
        </div>
      </div>

      {ansSection ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Post your Views: </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleAnsSection}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <h1 className="mt-7 mb-7 font-bold">{data.question}</h1>
                  <div className="flex justify-center">
                    <textarea
                      className="w-full max-w-3/4 h-4/5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                      style={{ height: 170 }}
                      value={newAns}
                      onChange={(event) => setNewAns(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleNewAnswer}
                  >
                    {edit ? <h4>Edit</h4> : <h4>Post</h4>}
                  </button>

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAnsSection}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      {Object.keys(data.answers).length > 0 &&
        data.answers.map((item) => {
          return (
            <div>
              <AnsContent
                content={item.content}
                aid={item.id}
                avatar={item.user.avatar}
                username={item.user.username}
                comments={item.comments}
                qid={qid}
                setEdit={setEdit}
                setAnsSection={setAnsSection}
                setNewAns={setNewAns}
                uid={item.userId}
                setEditId={setEditId}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Question;
