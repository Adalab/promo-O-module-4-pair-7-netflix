const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//servidor de estáticos
const staticServerPath = "./public";
server.use(
  express.static(staticServerPath)
);

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

//servidor de estáticos (imágenes)
const staticServerPathImg =
  "./src/public-movies-images";
server.use(
  express.static(staticServerPathImg)
);
