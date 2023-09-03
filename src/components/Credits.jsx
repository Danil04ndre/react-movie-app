import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeContext from "../context/HomeContext";

import "../css/Credits.css";
const Credits = ({ id }) => {
  const { category } = useParams();
  const { apiKey } = useContext(HomeContext);
  const [dataCredits, setDataCredits] = useState([]);
  useEffect(() => {
    const getCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      setDataCredits(json.cast.slice(0, 5));
    };
    getCredits();
  }, [category, id]);
  return (
    <div className="credits-content">
      {dataCredits.map((el, i) => {
        return (
          <div className="credits-item" key={i}>
            <div
              className="credits-img"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${el.profile_path})`,
              }}
            ></div>
            <p>{el.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Credits;
