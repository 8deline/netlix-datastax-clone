import { useState, useEffect } from "react";
import Card from "./Card";

function Section(props) {
  let [movies, setMovies] = useState(null);
  let fetchdata = async () => {
    const response = await fetch(".netlify/functions/getMovies");
    const responseBody = await response.json();
    // console.log(responseBody);
    // console.log(responseBody.data.movies_by_genre.values);
    setMovies(responseBody.data.movies_by_genre.values);
  };
  // console.log("test");
  useEffect(() => {
    fetchdata();
  }, []);
  //genres();
  return (
    <>
      <p>{props.genre}</p>
      {movies
        ? movies.map((movie, index) => {
            return <Card className="movies" key={index} movie={movie} />;
          })
        : ""}
    </>
  );
}

export default Section;
