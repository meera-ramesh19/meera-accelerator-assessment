it("renders a list of animes", () => {
  cy.visit("http://localhost:3000/");
  cy.get(".anime-item").should("have.length.at.least", 1);
  // confirm the application is showing two items
});
