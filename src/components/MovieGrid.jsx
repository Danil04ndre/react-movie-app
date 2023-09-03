import { useCallback, useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useParams, useNavigate } from "react-router-dom";
import HomeContext from "../context/HomeContext";
import "../css/MovieGrid.css";
import Loader from "./Loader";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const { keyword } = useParams();
  const { apiKey } = useContext(HomeContext);
  const [keywo, setKeywo] = useState(keyword);
  const [valueInput, setValueInput] = useState("");
  const [loader, setLoader] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getList = async () => {
      if (keyword == undefined) {
        if (category == "movies") {
          let res = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                accept: "application/json",
              },
            }
          );
          let json = await res.json();
          setItems(json.results);
          setTotalPages(json.total_pages);
        } else {
          let res = await fetch(
            "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                accept: "application/json",
              },
            }
          );
          let json = await res.json();
          setItems(json.results);
          setTotalPages(json.total_pages);
        }
      } else {
        let res = await fetch(
          `https://api.themoviedb.org/3/search/${category == "movies" ? "movie" : "tv"}?include_adult=false&language=en-US&page=1&query=${keywo}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              accept: "application/json",
            },
          }
        );
        let json = await res.json();
        setItems(json.results);
        setTotalPages(json.total_pages);
      }
    };
    getList();
    setTimeout(() => {
      if (items.length == 0) {
        setLoader(false);
      }
    }, 3000);
  }, [category, keyword]);

  const loadMore = async () => {
    if (keyword == undefined) {
      if (category == "movies") {
        setPages(pages + 1);
        let res = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pages}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              accept: "application/json",
            },
          }
        );
        let json = await res.json();
        setItems([...items, ...json.results]);
      } else {
        setPages(pages + 1);
        let res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pages}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              accept: "application/json",
            },
          }
        );
        let json = await res.json();
        setItems([...items, ...json.results]);
      }
    } else {
      setPages(pages + 1);
      let res = await fetch(
        `https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=${pages}&query=${keywo}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      );
      let json = await res.json();
      setItems([...items, ...json.results]);
    }
  };

  const handleChange = (e) => {
    setKeywo(e.target.value);
  };

  const handleBuscar = useCallback(() => {
    if (keywo.length > 0) {
      setTimeout(() => {
        setKeywo("");
      }, 1000);

      navigate(`/${category}/search/${keywo}`);
      setValueInput(keywo);
    }
  }, [keywo, category, history]);

  return (
    <>
      <div className="content-movie-input">
        <div className="input">
          <input
            type="text"
            onChange={handleChange}
            value={keywo}
            placeholder={
              category == "movies" ? "Buscar pelicula" : "Buscar serie"
            }
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="movie-grid">
          {items.map((elm, i) => (
            <MovieCard category={category} el={elm} key={i} type={category} />
          ))}
        </div>
      ) : loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="no-data">
          <h3>NO SE ENCONTRARON RESULTADOS PARA LA BUSQUEDA &quot;{valueInput}&quot;</h3>
        </div>
      )}

      {pages < totalPages ? (
        <button className="show-more-btn" onClick={loadMore}>
          Mostrar Mas
        </button>
      ) : null}
    </>
  );
};

export default MovieGrid;
