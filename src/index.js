const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const db = new Database(
  "./src/db/database.db",
  { verbose: console.log }
);
// create and config server
const server = express();
server.use(cors());
server.use(express.json());
//Motor de plantillas
server.set("view engine", "ejs");
//Enpoint to 1 movie
server.get(
  "/movie/:movieId",
  (req, res) => {
    const movieId = req.params.movieId;
    const query = db.prepare(
      "SELECT * FROM movies WHERE id = ?"
    );
    const foundMovie =
      query.get(movieId);
    res.render("movie", foundMovie);
  }
);
//servidor de estáticos
const staticServerPath =
  "./src/public-react";
server.use(
  express.static(staticServerPath)
);
//servidor de estáticos estilos
const staticServerPathStyles =
  "./src/styles";
server.use(
  express.static(staticServerPathStyles)
);
//servidor de estáticos (imágenes)
const staticServerPathImg =
  "./src/public-movies-images";
server.use(
  express.static(staticServerPathImg)
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
  const sort = req.query.sort;

  if (filterGender === "") {
    const query = db.prepare(
      `SELECT * FROM movies ORDER BY title ${sort}`
    );
    const allMovies = query.all();
    return res.json({
      success: true,
      movies: allMovies,
    });
  } else {
    const query = db.prepare(
      `SELECT * FROM movies WHERE gender = ? ORDER BY title ${sort}`
    );
    const foundMovies = query.all(
      filterGender
    );
    if (foundMovies) {
      return res.json({
        success: true,
        movies: foundMovies,
      });
    } /*else {
      return res.json(
        "No hay coincidencias."
      );
    }*/
  }
});
//POST login
server.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const query = db.prepare(
    "SELECT * FROM users WHERE email = ? and password = ?"
  );
  const foundUser = query.get(
    email,
    pass
  );
  if (foundUser) {
    if (foundUser.password === pass) {
      res.json({
        success: true,
        userId: foundUser.id,
      });
    } else {
      res.json({
        success: false,
        errorMessage:
          "Contraseña incorrecta",
      });
    }
  } else {
    res.json({
      success: false,
      errorMessage:
        "Usuario no encontrado",
    });
  }
});
