import fetch from "node-fetch";
import { useState, useEffect } from "react";
import Section from "./components/section";

function App() {
  let [genres, setGenres] = useState(null);
  let fetchdata = async () => {
    const response = await fetch(".netlify/functions/getGenres");
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  };
  // console.log("test");
  useEffect(() => {
    fetchdata();
  }, []);
  //genres();
  return (
    <>
      {genres
        ? genres.map((genre) => {
            return <Section key={genre.value} genre={genre.value} />;
          })
        : ""}
    </>
  );
}

// const response = fetch("/.netlify/functions/getGenres");
// const responseBody = response.JSON();
// console.log(responseBody);
// console.log("test");
export default App;
