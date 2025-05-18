import { envConfigs } from "cypress/configs/env.config";

describe("Search UI", () => {
  it("should render Search UI correctly", () => {
    cy.visit(`${envConfigs.NEXT_PUBLIC_DOMAIN_URL}/search`);

    cy.get("[data-testid=weather-search-bar").as("searchBar");
    cy.get("@searchBar").should("exist");

    cy.get("[data-testid=weather-search-history").as("searchHistory");
    cy.get("@searchHistory").should("exist");
  });
});
