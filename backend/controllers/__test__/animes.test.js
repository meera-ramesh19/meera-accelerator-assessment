const supertest = require("supertest");
const app = require("../../app");
const {
  updateOneAnime,
  createOneAnime,
  getOneAnime,
} = require("../../queries/animes");
const db = require("../../db/dbConfig");
describe("/animes", () => {
  it("GET /animes should respond with a list of animes", async () => {
    const res = await supertest(app).get("/animes");
    if (res.body.length > 0) {
      expect(
        res.body.every(
          (anime) =>
            typeof anime.description === "string" &&
            anime.description.length > 0
        )
      ).toBeTruthy();
    }
  });
  it("POST /animes should allow a user to create a new anime and add it to the database", async () => {
    const res = await supertest(app).post("/animes").send({
      name: "Fake anime",
      description: "This anime does not exist.",
    });
    const dbRecord = await db.one(
      "SELECT * FROM animes WHERE name='Fake anime'"
    );
    expect(dbRecord).toBeTruthy();
    await db.one("DELETE FROM animes WHERE name='Fake anime' RETURNING *");
  });
  
  it("PUT /animes/:animeId should update the data for an existing anime in the database", async () => {
    const fakeAnime = await createOneAnime(
      "Fake anime2",
      "This is also a fake anime"
    );
    expect(fakeAnime.id).toBeTruthy();
    const res = await supertest(app).put(`/animes/${fakeAnime.id}`).send({
      name: "fakeanime3",
      description: "new description",
    });
    const updatedAnime = await getOneAnime(fakeAnime.id);
    expect(updatedAnime).toEqual({
      name: "fakeanime3",
      description: "new description",
      id: fakeAnime.id,
    });
    await db.one("DELETE FROM animes WHERE name='fakeanime3' RETURNING *");
  });
  it("DELETE /animes/:animeId should delete the provided anime from the database", async () => {
    const fakeAnime = await createOneAnime(
      "Fake anime200",
      "This is also a fake anime"
    );
    await supertest(app).delete(`/animes/${fakeAnime.id}`);
    const deletedAnime = await db.oneOrNone(
      `SELECT * FROM animes where name='Fake anime200'`
    );
    expect(deletedAnime).toBeFalsy();
  });
});
