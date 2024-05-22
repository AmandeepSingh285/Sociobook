import React, { useState } from "react";
import QuestionContext from "./QuestionContext";

const QuestionContextProvider = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [questionSearch, setQuestionSearch] = useState([]);

  return (
    <QuestionContext.Provider
      value={{ reload, setReload, questionSearch, setQuestionSearch }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
