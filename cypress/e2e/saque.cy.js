/// <reference types="cypress" />

describe('Saque no BugBank', () => {
  const senha = 'senha123';

  it('Deve exibir modal de funcionalidade em desenvolvimento ao abrir SAQUE', () => {
    const email = `qa.saque.${Date.now()}@teste.com`;
    const name = 'QA Saque';

    cy.visit('https://bugbank.netlify.app/');
    cy.bbRegisterAndLogin({ email, name, password: senha, addInitialBalance: true });

    cy.bbOpenOperation(/SAQUE/i);

    cy.get('#modalText', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Funcionalidade em desenvolvimento');

    cy.bbCloseModalIfPresent();
  });
});

