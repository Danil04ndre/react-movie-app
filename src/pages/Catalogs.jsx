import { useParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import PageHeader from "../components/PageHeader";
import popcorn from "../assets/popcorn.gif";

const Catalogs = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>
        <div className="content-gif">
          <img src={popcorn}/>
        <h2>{category === "movies" ? "Peliculas" : "TV Series"}</h2>
        </div>
      </PageHeader>

      <div className="container-movie-grid">
        <div className="section">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalogs;
