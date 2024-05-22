import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import Axios from "axios";
import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [question, setQuestion] = useState("");
  const { user, token } = useContext(UserContext);
  const { setQuestionSearch } = useContext(QuestionContext);
  const navigate = useNavigate();

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleQueryQuestion = async (event) => {
    event.preventDefault();

    let tempQues = question;
    tempQues = tempQues.trimEnd();
    tempQues = tempQues.split(" ").join("%20");

    const res = await Axios.get("http://localhost:3001/questions/search", {
      params: { content: tempQues },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setQuestion("");
    setQuestionSearch(res.data);
    console.log(res.data);
    navigate("/user/question/search");
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="grid grid-cols-6 gap-4">
          <div>
            <Link to="/user/home">
              <img
                className="mx-auto h-10 w-auto"
                src={logo}
                alt="Sociobook"
                style={{ height: 100, width: 300 }}
              />
            </Link>
          </div>
          <div className="col-span-3 m-5">
            <form method="POST" onSubmit={handleQueryQuestion}>
              <input
                className="w-10/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-3/5 p-3"
                placeholder="Search a Question"
                onChange={handleQuestion}
                value={question}
              />
              <button className="m-5 p-2" type="submit">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex justify-center">
            <Link to="/user/createTopic" className="flex justify-center">
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded h-12 m-auto">
                New Topic
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <h3 className="mt-auto mb-auto mr-3">{user}</h3>
            <button onClick={() => navigate("/user/yourProfile")}>
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
