import { envConfigs } from "cypress/configs/env.config";

describe("Greeting", () => {
  it("Should render Greeting correctly", () => {
    cy.visit(envConfigs.NEXT_PUBLIC_DOMAIN_URL);

    cy.get("[data-testid=title]").as("title");

    cy.get("@title").should("exist");
    cy.get("@title").should("contain.text", `Hello World`);
  });
});
