/// <reference types="cypress" />

describe('Extrato no BugBank', () => {
  const senha = 'senha123';

  it('Deve registrar a transferência no extrato', () => {
    const description = 'QA Extrato - transferencia';
    const transferValue = '25';

    const emailB = `qa.extrato.to.${Date.now()}.b@teste.com`;
    const nameB = 'QA Extrato To';

    const emailA = `qa.extrato.from.${Date.now()}.a@teste.com`;
    const nameA = 'QA Extrato From';

    cy.visit('https://bugbank.netlify.app/');

    // B (destinatário)
    cy.bbRegisterAndLogin({ email: emailB, name: nameB, password: senha, addInitialBalance: true });
    cy.bbGetDigitalAccount().then((accountB) => {
      cy.bbLogout();

      // A (remetente)
      cy.bbRegisterAndLogin({ email: emailA, name: nameA, password: senha, addInitialBalance: true });

      cy.bbOpenOperation(/TRANSFERÊNCIA/i);

      cy.get('input[name="accountNumber"]').clear({ force: true }).type(accountB.accountNumber, { force: true });
      cy.get('input[name="digit"]').clear({ force: true }).type(accountB.digit, { force: true });
      cy.get('input[name="transferValue"]').clear({ force: true }).type(transferValue, { force: true });
      cy.get('input[name="description"]').clear({ force: true }).type(description, { force: true });

      cy.contains('button, a', 'Transferir agora').click({ force: true });
      cy.get('#modalText', { timeout: 15000 }).should('be.visible');
      cy.bbCloseModalIfPresent();

      // Extrato (rota direta)
      cy.visit('https://bugbank.netlify.app/bank-statement');
      cy.wait(2500);
      cy.get('body').then(($body) => {
        const text = ($body.text() || '').toLowerCase();
        expect(text).to.include(description.toLowerCase());
      });
    });
  });
});

