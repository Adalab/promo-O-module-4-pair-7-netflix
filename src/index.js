const express = require("express");
const cors = require("cors");
const movies = require("./movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get("/movies", (req, res) => {
  const cleanedMovies = movies.movies;
  console.log(req.query.gender);
  const filteredMovies = cleanedMovies.filter((movie) => {
    console.log(movie.gender);
    movie.gender === req.query.gender;
  });
  console.log(filteredMovies);
  res.json(filteredMovies);
});
