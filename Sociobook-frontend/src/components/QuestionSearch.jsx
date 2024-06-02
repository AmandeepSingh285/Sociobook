import React, { useContext } from "react";
import QuestionContext from "../context/QuestionContext";
import { Link } from "react-router-dom";

const QuestionSearch = () => {
  const { questionSearch } = useContext(QuestionContext);

  return (
    <div>
      {questionSearch.length == 0 ? (
        <h2>No matches for your search</h2>
      ) : (
        <div>
          {questionSearch.map((item) => {
            return (
              <Link to={`/user/question/${item._id}`}>
                <div className="rounded border-solid border-2 m-5 p-3">
                  <div>
                    <h3 className="text-stone-700 font-bold m-5">
                      {item.content}
                    </h3>
                  </div>
                  <div className="flex ml-5 mb-3">
                    <p className="font-thin text-sm">ID: </p>
                    <p className="font-thin text-sm ml-3">{item._id}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionSearch;
