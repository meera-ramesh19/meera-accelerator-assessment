const db = require("../db/dbConfig");

const getAllAnimes = async () => {
  const animes = await db.any("SELECT * FROM animes");
  return animes;
};

const getOneAnime = async (animeId) => {
  const anime = await db.oneOrNone("SELECT * FROM animes WHERE id=$1", animeId);
  return anime;
};

const createOneAnime = async (name, description) => {
  const newAnime = await db.one(
    "INSERT INTO animes (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return newAnime;
};

const updateOneAnime = async (id, body) => {
  const { name, description } = body;
  const updatedAnime = await db.one(
    "UPDATE animes SET name=$1, description=$2 WHERE id=$3 RETURNING *",
    [name, description, id]
  );
  return updatedAnime;
};

const deleteOneAnime = async (id) => {
  const deletedAnime = await db.oneOrNone(
    "DELETE FROM animes WHERE id=$1 RETURNING *",
    id
  );
  return deletedAnime;
};

module.exports = {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
};
