import fetch from "node-fetch";
import { useState, useEffect } from "react";
import Section from "./components/section";

function App() {
  const genres = async () => {
    const response = await fetch(".netlify/functions/getGenres");
    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);
    console.log("test");
  };

  useEffect(() => {
    genres();
  });
  console.log("test");
  //genres();
  return (
    <>
      <Section />
    </>
  );
}
// const response = fetch("/.netlify/functions/getGenres");
// const responseBody = response.JSON();
// console.log(responseBody);
// console.log("test");
export default App;
