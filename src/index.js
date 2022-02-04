const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const users = require("./data/users.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//Motor de plantillas
server.set("view engine", "ejs");

//Enpoint to 1 movie
server.get("/movie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const foundMovie = movies.movies.find((movie) => movie.id === movieId);
  res.render("movie", foundMovie);
});

//servidor de estáticos
const staticServerPath = "./public";
server.use(express.static(staticServerPath));

const staticServerPathStyles = "./src/styles";
server.use(express.static(staticServerPathStyles));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", (req, res) => {
  const filterGender = req.query.gender;
  const cleanedMovies = movies.movies;
  const filteredMovies = cleanedMovies.filter((movie) => {
    if (filterGender === "") {
      return movie;
    } else {
      return movie.gender === filterGender;
    }
  });
  res.json({
    success: true,
    movies: filteredMovies,
  });
});

//POST login

server.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  if (users.find((user) => user.email === email)) {
    if (users.find((user) => user.password === pass)) {
      res.json({
        success: true,
        userId: "123",
      });
    } else {
      res.json({
        success: false,
        errorMessage: "Contraseña incorrecta",
      });
    }
  } else {
    res.json({
      success: false,
      errorMessage: "Usuario no encontrado",
    });
  }
});

//servidor de estáticos (imágenes)
const staticServerPathImg = "./src/public-movies-images";
server.use(express.static(staticServerPathImg));
