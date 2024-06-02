import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";
import HomeContent from "./HomeContent";
import HomeTopic from "./HomeTopic";

const Home = () => {
  const [error, setError] = useState(false);
  const [homeData, setHomeData] = useState(null);

  let navigate = useNavigate();
  const { user, id, token, homeReload, setHomeReload } =
    useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError(true);
        return;
      }

      try {
        setHomeReload(false);
        const res = await Axios.get("http://localhost:3001/", {
          params: { username: user },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let data = res.data;
        console.log(data);

        // data = data.filter(item => item !== null);

        const homePageData = data.map((item) => {
          let currData = item.data;
          currData = currData.filter((item) => item !== null);

          const quesAnsList = currData.map((val) => {
            return {
              ansContent: val.ansContent,
              ansId: val.ansId,
              ansUser: val.ansUser,
              content: val.content,
              id: val.id,
              user: val.user,
            };
          });

          return {
            topicName: item.topicName,
            topicId: item.topicId,
            data: quesAnsList,
          };
        });

        console.log(homePageData);

        setHomeData(homePageData);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, [token, homeReload]);

  if (error) {
    navigate("/error");
  }

  return (
    <div className="min-h-screen">
      {homeData &&
        homeData.map((item, index) => {
          return (
            <div key={index} className="p-5 m-7">
              <HomeTopic topicName={item.topicName} topicId={item.topicId} />
              {item.data.map((value, quesAnsIndex) => {
                return (
                  <HomeContent
                    content={value.content}
                    id={value.id}
                    ansContent={value.ansContent}
                  />
                );
              })}
            </div>
          );
        })}

      <footer className="sticky flex flex-row-reverse top-[92vh] pb-4">
        <Link to="/user/addQuestion">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded-full mr-7">
            +
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
