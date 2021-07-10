const fetch = require("node-fetch");

exports.handler = async function (event) {
  // console.log("this is the eventbody");
  // console.log(event.body);
  const body = JSON.parse(event.body);
  // console.log(body);
  const genre = body.genre;
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  console.log(event.body);
  const query = `
  query {
    movies_by_genre (value: {genre: ${JSON.stringify(genre)}}
    options: {pageSize: 6 pageState: ${JSON.stringify(body.pageState)}}) 
    {values {
            title
        duration
        thumbnail
        }
     pageState   
    }

  }
  
    `;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN,
    },
  });
  // console.log(event.body);
  try {
    const responseBody = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
