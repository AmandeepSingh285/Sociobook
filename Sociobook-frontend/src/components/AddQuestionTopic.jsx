import React, { useState } from "react";

const AddQuestionTopic = ({
  name,
  tid,
  setSelectedTopics,
  selectedTopics,
  profile,
}) => {
  const [taken, setTaken] = useState(0);

  const handleClick = () => {
    if (taken == 0) {
      setSelectedTopics([...selectedTopics, tid]);
      setTaken(1);
    } else {
      setSelectedTopics(selectedTopics.filter((item) => item != tid));
      setTaken(0);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: taken ? "green" : "red" }}
      className={profile === "AddQuestion" ? "w-full" : "w-24 h-20 mr-6 mt-2"}
    >
      <div>
        <h5>{name}</h5>
      </div>
    </button>
  );
};

export default AddQuestionTopic;
