import { useContext, useEffect, useState } from "react";
import HomeContext from "../context/HomeContext";
import '../css/Videos.css'

const Videos = ({ id,category }) => {
  const [video, setVideo] = useState([]);
  const { apiKey } = useContext(HomeContext);
  useEffect(() => {
    const getVideo = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${category == 'movies' || category == 'movie' ? 'movie' : 'tv'}/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }

      );
      const json = await res.json();
      setVideo(json.results.slice(0, 4));
    };
    getVideo();
  }, [id]);

  return (
    <>
  <div className="content-videos">
    {video.length > 0 ? video.map((el, i) => (
      <div key={i}>
        <h3>{el.name}</h3>
        <iframe
          src={`https://www.youtube.com/embed/${el.key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      </div>
    )) : <h3>NO SE ENCONTRARON VIDEOS DISPONIBLES PARA ESTA PELICULA</h3>}
  </div>
</>
  );
};

export default Videos;
