const fetch = require("node-fetch");

exports.handler = async function () {
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const query = `
  query getAllGenres {
    reference_list (
        value: { lable: "genre" }
        ) {
      values {
        value
      }
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
  // .then((result) => {
  //   return {
  //     statusCode: 200,
  //     body: response,
  //   };
  // })
  // .catch((err) => {
  //   console.log(err);
  //   console.log("teset");
  //   return {
  //     statusCode: 500,
  //     body: err,
  //   };
  // });

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
