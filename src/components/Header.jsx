import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "../css/Header.css";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundColor:
          scrollPosition >= 10 ? "rgb(12, 11, 11)" : "transparent",
        padding: scrollPosition >= 10 ? "5px" : "0",
      }}
    >
      <div className="header-container">
        <div className="logo">
          <Link to="/">MovieDB</Link>
        </div>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Peliculas
          </NavLink>
          <NavLink
            to="/tv"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            TV Series
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
