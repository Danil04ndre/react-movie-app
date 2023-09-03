import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Credits from "../components/Credits";
import Videos from "../components/Videos";
import HomeContext from "../context/HomeContext";

import "../css/Detail.css";
const Details = () => {
  const [dataDetail, setdataDetail] = useState([]);
  const { apiKey } = useContext(HomeContext);
  const { category, id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getDetail = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/${category == 'movies' || category == 'movie' ? 'movie' : 'tv'}/${id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      });
      const json = await res.json();
      setdataDetail(json);
    };
    getDetail();
  }, [category, id]);
  return (
    <>
      <div
        className="detail-backrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${dataDetail.backdrop_path})`,
        }}
      >
        <div className="rgba-d"></div>
      </div>

      <div className="content-detail">
        {dataDetail.success === false ? (
          <div className="err-data">{dataDetail.status_message} <br /> LO SENTIMOS, NO PUDIMOS ENCONTRAR DETALLES DE LA PELICULA </div>
        ) : (
          <>
            <div
              className="detail-poster"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${dataDetail.poster_path})`,
              }}
            ></div>
            <div className="detail-info">
              <h2>{dataDetail.original_title}</h2>
              <div className="genres">
                {dataDetail.genres &&
                  dataDetail.genres.map((el, i) => (
                    <span key={i}>{el.name}</span>
                  ))}
              </div>
              <p>{dataDetail.overview}</p>
              <Credits id={id} />
            </div>
          </>
        )}
      </div>
      <Videos id={id} category={category} />
    </>
  );
};

export default Details;
