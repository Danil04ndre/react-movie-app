import { useContext } from "react";
import HomeContext from "../context/HomeContext";

const Frame = () => {
  const { keyVideo, modalOpen } = useContext(HomeContext);

  return modalOpen ? (
    <iframe
      src={`https://www.youtube.com/embed/${keyVideo}`}
      title="Trailer"
      allowFullScreen
    ></iframe>
  ) : null;
};

export default Frame;