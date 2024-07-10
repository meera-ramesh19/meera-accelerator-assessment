// DEPENDENCIES
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("./queries/animes");
const animesController = require("./controllers/animesController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
// app.use(express.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get("/", async (_, res) => {
  res.send("In Pursuit of Accelerator 2");
});
app.use("/animes", animesController);

app.get("*", (_, res) => {
  res.status(404).send("The request you are looking for doesnt exist!");
});

// EXPORT
module.exports = app;
