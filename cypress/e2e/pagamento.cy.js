/// <reference types="cypress" />

describe('Pagamento no BugBank', () => {
  const senha = 'senha123';

  it('Deve exibir modal de funcionalidade em desenvolvimento ao abrir PAGAMENTO', () => {
    const email = `qa.pagamento.${Date.now()}@teste.com`;
    const name = 'QA Pagamento';

    cy.visit('https://bugbank.netlify.app/');
    cy.bbRegisterAndLogin({ email, name, password: senha, addInitialBalance: true });

    cy.bbOpenOperation(/PAGAMENT/i);

    cy.get('#modalText', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Funcionalidade em desenvolvimento');

    cy.bbCloseModalIfPresent();
  });
});

