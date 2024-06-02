import React from "react";

const HomeTopic = ({ topicName, topicId }) => {
  return (
    <div>
      <h2 className="text-black font-bold text-xl mb-2">
        Topic Name: {topicName}
      </h2>
      <p className="text-sm">Topic ID: {topicId}</p>
    </div>
  );
};

export default HomeTopic;
