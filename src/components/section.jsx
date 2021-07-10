import { useState, useEffect } from "react";
import Card from "./Card";
import "../App.css";

function Section(props) {
  console.log("this is the props");
  console.log(props);
  let [movies, setMovies] = useState(null);
  let [pageState, setPageState] = useState(null);
  let fetchdata = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: props.genre, pageState: pageState }),
    });
    const responseBody = await response.json();
    console.log(responseBody);
    // console.log(responseBody.data.movies_by_genre.values);
    setMovies(responseBody.data.movies_by_genre.values);
    setPageState(responseBody.data.movies_by_genre.pageState);
  };
  // console.log("test");
  useEffect(() => {
    fetchdata();
  }, []);
  //genres();
  return (
    <>
      <p>{props.genre}</p>
      <div className="movies">
        {movies
          ? movies.map((movie, index) => {
              return <Card key={index} movie={movie} />;
            })
          : ""}
        <button
          className="button"
          onClick={() => {
            setPageState(pageState);
            fetchdata();
          }}
        ></button>
      </div>
    </>
  );
}

export default Section;
