import { useContext, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "../css/HeroSlide.css";
import Modal from "./Modal";
import HomeContext from "../context/HomeContext";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const { movieItems, trailer, setModalOpen, modalOpen } =
    useContext(HomeContext);

  const refSwiper = useRef();

  useEffect(() => {
    if (modalOpen) {
      refSwiper.current.swiper.autoplay.stop();
    } else {
      refSwiper.current.swiper.autoplay.start();
    }
  }, [modalOpen]);

  return (
    <>
      <div className="content-hero-slide">
        <Swiper
          ref={refSwiper}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
        >
          {movieItems.map((el, i) => (
            <SwiperSlide key={i}>
              <div
                className="img"
                onClick={() => setModalOpen(false)}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${el.backdrop_path})`,
                }}
              ></div>
              <div className="hero-info">
                <div className="content-info">
                  <div className="info-txt">
                    <h2>{el.title}</h2>
                    <p>{el.overview}</p>
                    <Link className="watch" to={`/movie/${el.id}`}>Ver pelicula</Link>

                    <button onClick={() => trailer(el.id)}>Ver trailer</button>

                    <Modal />
                  </div>
                  <div className="info-img">
                    <div
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${el.poster_path})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroSlide;
