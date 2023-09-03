import HeroSlide from "../components/HeroSlide";
import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";
import "../css/HomeContent.css";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container-movies">
        <div className="section-movies">
          <div className="movies-info">
            <h3>Peliculas</h3>
            <Link to="/movies" className="btn">
              Ver Mas
            </Link>
          </div>
          <MovieList type="popular" />
        </div>
        <div className="section-movies">
          <div className="movies-info">
            <h3>TV Series</h3>
            <Link to="/tv" className="btn">
              Ver Mas
            </Link>
          </div>
          <MovieList type="tv" />
        </div>
      </div>
    </>
  );
};

export default Home;
