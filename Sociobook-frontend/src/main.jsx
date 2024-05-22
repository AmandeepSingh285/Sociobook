import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import "./index.css";
import Layout from "./Layout.jsx";
import Error from "./components/Error.jsx";
import Home from "./components/Home.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import QuestionContextProvider from "./context/QuestionContextProvider.jsx";
import Question from "./components/Question.jsx";
import QuestionSearch from "./components/QuestionSearch.jsx";
import AddQuestion from "./components/AddQuestion.jsx";
import UserProfile from "./components/UserProfile.jsx";
import CreateTopic from "./components/CreateTopic.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/user/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "question/:qid",
        element: <Question />,
      },
      {
        path: "question/search",
        element: <QuestionSearch />,
      },
      {
        path: "addQuestion",
        element: <AddQuestion />,
      },
      {
        path: "yourProfile",
        element: <UserProfile />,
      },
      {
        path: "createTopic",
        element: <CreateTopic />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <QuestionContextProvider>
        <RouterProvider router={router} />
      </QuestionContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
