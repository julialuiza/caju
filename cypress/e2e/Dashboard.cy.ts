describe("Dashboard", () => {
  it("should search for a CPF, display results and approve candidate", () => {
    cy.visit("http://localhost:3001");

    const cpf = "12345678909";

    cy.get('input[name="cpf"]').type(cpf);

    cy.wait(2000);

    cy.get('button[name="Aprovar"]').first().click();

    cy.get('button[name="Confirmar"]').click();

    cy.contains("Cadastro atualizado com sucesso").should("be.visible");
  });
});
