import { createContext, useEffect, useState } from "react";

const HomeContext = createContext();

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDViMzNlNTYxOGUwOGMxNGUxN2RjNzg1OWQ5MWUzYyIsInN1YiI6IjY0ZThlYjM0MDZmOTg0MDBjYTU1NmJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDEJr7XS-9ulfZLegC8iuUyVSn_L1DhNTKiqTT9eHKY";

const HomeProvider = ({ children }) => {
  const [movieItems, setMovieItems] = useState([]);
  const [keyVideo, setKeyVideo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [listMoviePopular, setListMoviesPopular] = useState([]);
  const [listMovieTv, setListMoviesTv] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        });
        const json = await res.json();
        setMovieItems(json.results.slice(8, 14));
      } catch (err) {
        alert(err)
      }
    };
    getMovies();
  }, []);

  const trailer = async (id) => {
    setModalOpen(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );
    const json = await res.json();
    const { key } = json.results.find((key) => key.name === "Official Trailer");
    setKeyVideo(key);
  };
  const getListMoviesPopular = async (type) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      setListMoviesPopular(json.results);
    } catch (err) {
      alert(err)
    }
  };
  const getListMoviesTv = async (type) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      );
      const json = await res.json();

      setListMoviesTv(json.results);
    } catch (err) {
      alert(err)
    }
  };
  const data = {
    movieItems,
    trailer,
    keyVideo,
    setKeyVideo,
    modalOpen,
    setModalOpen,
    listMoviePopular,
    getListMoviesPopular,
    getListMoviesTv,
    listMovieTv,
    apiKey,
  };

  return <HomeContext.Provider value={data}>{children}</HomeContext.Provider>;
};

export { HomeProvider };
export default HomeContext;
