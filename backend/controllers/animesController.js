const express = require('express');
const animes = express.Router();
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require('../queries/animes');

/* Instructions: Use the following prompts to write the corresponding routes. **Each** route should be able to catch server-side and user input errors(should they apply). Consult the test files to see how the routes and errors should work.*/

//Write a GET route that retrieves all animes from the database and sends them to the client with a 200 status code

animes.get('/', async (req, res) => {
  try {
    const allAnimes = await getAllAnimes();

    const filteredAnimes = allAnimes.filter(
      (anime) =>
        typeof anime.description === 'string' && anime.description.length > 0
    );
    if (filteredAnimes.length > 0) {
      res.status(200).json(filteredAnimes);
    } else {
      res.status(400).json({ message: 'No animes found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Mock server Error', success: false });
  }
});

//Write a POST route that takes user provided data from the request body and creates a new anime in the database. The route should respond with a 200 status code and the new anime.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error

// animes.post('/',  validateAnime, async (req, res) => {

animes.post('/', async (req, res) => {
  const { name, description } = req.body;

  if (
    !name ||
    !description ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    name.length === 0 ||
    description.length === 0
  ) {
    return res.status(400).json({
      message:
        'Name and description are required and must be non-empty strings',
      success: false,
    });
  }

  try {
    const newAnime = await createOneAnime(name, description);
    if (newAnime) {
      res.status(200).json(newAnime);
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(500).json({ message: 'Mock server Error', success: false });
  }
});

//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database. The route should respond with a 200 and the updated anime. The route should be able to handle a non-existent anime id.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error

// animes.put('/:id', validateAnime, validateId, async (req, res) => {

animes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (
    !name ||
    !description ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    name.length === 0 ||
    description.length === 0
  ) {
    return res.status(400).json({
      message:
        'Name and description are required and must be non-empty strings',
      success: false,
    });
  }

  try {
    const anime = await getOneAnime(id);

    if (!anime) {
      res.status(404).json({ message: 'Anime not found', success: false });
    } else {
      const updatedAnime = await updateOneAnime(id, { name, description });
      res.status(200).json(updatedAnime);
    }
  } catch (error) {
    if (error.message === 'Anime not found') {
      res.status(404).json({ message: 'Anime not found', success: false });
    } else {
      res.status(500).json({ message: 'Mock server Error', success: false });
    }
  }
});

//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data. The route should be able to handle a non-existent anime id.

animes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnime = await deleteOneAnime(id);
    if (deletedAnime) {
      res.status(200).json({ success: true, payload: deletedAnime });
    } else {
      res.status(404).json({ message: 'Anime mot found', success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Mock server error' });
  }
});
module.exports = animes;
