import fetch from "node-fetch";
import { useState, useEffect } from "react";
import Section from "./components/section";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

function App() {
  let [genres, setGenres] = useState(null);
  let [limit, setLimit] = useState(4);

  let fetchdata = async () => {
    const response = await fetch(".netlify/functions/getGenres", {
      method: "POST",
      body: JSON.stringify({ limit: limit }),
    });
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
    setLimit(limit + 4);
    console.log(limit);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="container">
        {genres
          ? genres.map((genre) => {
              return <Section key={genre.value} genre={genre.value} />;
            })
          : ""}
      </div>
      <div
        className="bottom-page"
        onMouseEnter={() => {
          fetchdata();
        }}
      ></div>
    </>
  );
}

// const response = fetch("/.netlify/functions/getGenres");
// const responseBody = response.JSON();
// console.log(responseBody);
// console.log("test");
export default App;
