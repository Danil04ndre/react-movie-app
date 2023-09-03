import { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import HomeContext from "../context/HomeContext";
import MovieCard from "./MovieCard";

const MovieList = ({ type }) => {
  const {
    listMoviePopular,
    getListMoviesPopular,
    getListMoviesTv,
    listMovieTv,
  } = useContext(HomeContext);

  useEffect(() => {
    if (type == "popular") {
      getListMoviesPopular(type);
    } else {
      getListMoviesTv(type);
    }
  }, []);

  return (
    <div className="movie-list">
      {type == "popular" ? (
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
          {listMoviePopular.map((el, index) => {
            return (
              <SwiperSlide key={index}>
                <MovieCard el={el} type="movie" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
          {listMovieTv.map((el, index) => {
            return (
              <SwiperSlide key={index}>
                <MovieCard el={el} type="tv" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
