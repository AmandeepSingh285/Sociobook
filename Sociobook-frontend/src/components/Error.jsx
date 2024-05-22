import React from "react";

const Error = (props) => {
  return (
    <div className="flex justify-center mx-8 mt-8">
      <div>
        <h1>{props.statusCode}</h1>
      </div>
      <div>
        <h4>{props.messages}</h4>
      </div>
    </div>
  );
};

export default Error;
