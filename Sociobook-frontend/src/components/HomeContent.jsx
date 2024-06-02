import React from "react";
import { Link } from "react-router-dom";

const HomeContent = ({ content, id, ansContent }) => {
  return (
    <Link to={`/user/question/${id}`}>
      <div className="rounded border-solid border-2 m-5 p-3">
        <div>
          <h4 className="text-stone-700 font-bold">{content}</h4>
        </div>
        <div className="mt-3 text-left">
          <h6>{ansContent}</h6>
        </div>
      </div>
    </Link>
  );
};

export default HomeContent;
