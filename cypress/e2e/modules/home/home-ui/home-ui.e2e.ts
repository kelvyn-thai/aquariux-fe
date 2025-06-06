import { envConfigs } from "cypress/configs/env.config";

describe("Search UI", () => {
  it("should render Search UI correctly", () => {
    cy.visit(
      `${envConfigs.NEXT_PUBLIC_DOMAIN_URL}/?${new URLSearchParams({ lon: "1", lat: "1", location: "awesome" }).toString()}`
    );

    cy.get("[data-testid=weather-summary").as("searchSummary");
    cy.get("@searchSummary").should("exist");
  });
});
