/// <reference types="cypress" />

describe('Transferência no BugBank', () => {
  const senha = 'senha123';

  it('Deve transferir valor com sucesso entre duas contas', () => {
    const transferValue = '10';
    const description = 'QA Transferencia - sucesso';

    const emailB = `qa.transferencia.to.${Date.now()}.b@teste.com`;
    const nameB = 'QA Transfer To';

    const emailA = `qa.transferencia.from.${Date.now()}.a@teste.com`;
    const nameA = 'QA Transfer From';

    cy.visit('https://bugbank.netlify.app/');

    // Destinatário (B)
    cy.bbRegisterAndLogin({ email: emailB, name: nameB, password: senha, addInitialBalance: true });
    cy.bbGetDigitalAccount().then((accountB) => {
      cy.bbLogout();

      // Remetente (A)
      cy.bbRegisterAndLogin({ email: emailA, name: nameA, password: senha, addInitialBalance: true });

      cy.bbOpenOperation(/TRANSFERÊNCIA/i);

      cy.get('input[name="accountNumber"]').clear({ force: true }).type(accountB.accountNumber, {
        force: true,
      });
      cy.get('input[name="digit"]').clear({ force: true }).type(accountB.digit, { force: true });
      cy.get('input[name="transferValue"]').clear({ force: true }).type(transferValue, { force: true });
      cy.get('input[name="description"]').clear({ force: true }).type(description, { force: true });

      cy.contains('button, a', 'Transferir agora').click({ force: true });

      cy.get('#modalText', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'Transferencia realizada com sucesso');
    });
  });

  it('Não deve permitir transferir para a mesma conta', () => {
    const email = `qa.transferencia.self.${Date.now()}@teste.com`;
    const name = 'QA Transfer Self';

    cy.visit('https://bugbank.netlify.app/');

    cy.bbRegisterAndLogin({ email, name, password: senha, addInitialBalance: true });

    cy.bbGetDigitalAccount().then(({ accountNumber, digit }) => {
      cy.bbOpenOperation(/TRANSFERÊNCIA/i);

      cy.get('input[name="accountNumber"]').clear({ force: true }).type(accountNumber, { force: true });
      cy.get('input[name="digit"]').clear({ force: true }).type(digit, { force: true });
      cy.get('input[name="transferValue"]').clear({ force: true }).type('10', { force: true });
      cy.get('input[name="description"]').clear({ force: true }).type('QA Transfer Self', { force: true });

      cy.contains('button, a', 'Transferir agora').click({ force: true });

      cy.get('#modalText', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'Nao pode transferir pra mesmo conta');
    });
  });

  it('Deve bloquear transferência com saldo insuficiente', () => {
    const transferValue = '2000';
    const description = 'QA Transferencia - saldo insuficiente';

    const emailB = `qa.transferencia.ins.to.${Date.now()}.b@teste.com`;
    const nameB = 'QA Transfer To (saldo insuf)';

    const emailA = `qa.transferencia.ins.from.${Date.now()}.a@teste.com`;
    const nameA = 'QA Transfer From (saldo insuf)';

    cy.visit('https://bugbank.netlify.app/');

    // B
    cy.bbRegisterAndLogin({ email: emailB, name: nameB, password: senha, addInitialBalance: true });
    cy.bbGetDigitalAccount().then((accountB) => {
      cy.bbLogout();

      // A
      cy.bbRegisterAndLogin({ email: emailA, name: nameA, password: senha, addInitialBalance: true });

      cy.bbOpenOperation(/TRANSFERÊNCIA/i);

      cy.get('input[name="accountNumber"]').clear({ force: true }).type(accountB.accountNumber, {
        force: true,
      });
      cy.get('input[name="digit"]').clear({ force: true }).type(accountB.digit, { force: true });
      cy.get('input[name="transferValue"]').clear({ force: true }).type(transferValue, { force: true });
      cy.get('input[name="description"]').clear({ force: true }).type(description, { force: true });

      cy.contains('button, a', 'Transferir agora').click({ force: true });

      cy.get('#modalText', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'Você não tem saldo suficiente para essa transação');
    });
  });
});

