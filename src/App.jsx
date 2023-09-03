import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogs from "./pages/Catalogs";
import Details from "./pages/Details";
import { HomeProvider } from "./context/HomeContext";

function App() {
  return (
    <>
      <HomeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Catalogs />} />
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/:category/search/:keyword" element={<Catalogs />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </HomeProvider>
    </>
  );
}

export default App;
