describe("New User flow", () => {
  it("Registration done with success and redirect to dashboard page", () => {
    cy.visit("http://localhost:3001");

    cy.contains("button", "Nova Admissão").click();

    cy.get('input[placeholder="Nome"]').type("John Doe");
    cy.get('input[placeholder="Email"]').type("john@gmail.com");
    cy.get('input[placeholder="CPF"]').type("12345678909");
    cy.get('input[type="date"]').type("2021-10-10");

    cy.contains("button", "Cadastrar").click();

    cy.url().should("eq", "http://localhost:3001/#/dashboard");

    cy.contains("Cadastro realizado com sucesso!").should("be.visible");
    cy.contains("John Doe").should("be.visible");
    cy.contains("john@gmail.com").should("be.visible");
  });
});
