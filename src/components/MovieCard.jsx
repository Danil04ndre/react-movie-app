import { Link } from "react-router-dom";
import "../css/MovieCard.css";

const MovieCard = ({ el, type }) => {
  const bg = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${el.poster_path} )`,
  };
  const link = `/${type}/${el.id}`;
  return (
    <>
      <Link to={link}>
        <div className="movie-card" style={bg}>
          <div className="rgba-card">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>
        <p className="p">{el.name || el.title}</p>
      </Link>
    </>
  );
};

export default MovieCard;
