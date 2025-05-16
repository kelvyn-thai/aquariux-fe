import { envConfigs } from "cypress/configs/env.config";

describe("Search UI", () => {
  it("should render Search UI correctly", () => {
    cy.visit(envConfigs.NEXT_PUBLIC_DOMAIN_URL);

    cy.get("[data-testid=title").as("title");
    cy.get("@title").should("exist");
    cy.get("@title").should("contain.text", "Home page");
  });
});
