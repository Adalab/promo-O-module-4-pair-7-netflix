const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(
    `Server listening at http://localhost:${serverPort}`
  );
});
server.get("/movies", (req, res) => {
  const filterGender = req.query.gender;
  const cleanedMovies = movies.movies;
  const filteredMovies =
    cleanedMovies.filter((movie) => {
      if (filterGender === "") {
        return movie;
      } else {
        return (
          movie.gender === filterGender
        );
      }
    });
  res.json({
    success: true,
    movies: filteredMovies,
  });
});
