/// <reference types="cypress" />

describe('Login no BugBank', () => {
  it('Deve permitir login com credenciais válidas', () => {
    const senha = 'senha123';
    const email = `qa.login.${Date.now()}@teste.com`;
    const name = 'QA Login';

    cy.visit('https://bugbank.netlify.app/');

    cy.bbRegisterAndLogin({ email, name, password: senha, addInitialBalance: false });

    cy.contains('button, a', 'Sair').should('exist');
    cy.bbGetDigitalAccount().then(({ accountNumber, digit }) => {
      expect(accountNumber).to.match(/^\d+$/);
      expect(digit).to.match(/^\d+$/);
    });
  });

  it('Não deve logar com senha inválida (fica na tela de login)', () => {
    const senha = 'senha123';
    const email = `qa.login.invalid.${Date.now()}@teste.com`;
    const name = 'QA Login Invalid';

    cy.visit('https://bugbank.netlify.app/');

    cy.bbRegister({ email, name, password: senha, addInitialBalance: false });
    cy.contains('Voltar ao login').click({ force: true });

    cy.contains('button, a', 'Acessar').then(($btn) => {
      const $form = $btn.closest('form');
      const scope = $form.length ? $form : $btn.closest('div');

      cy.wrap(scope).within(() => {
        cy.get('input[name="email"]').clear({ force: true }).type(email, { force: true });
        cy.get('input[name="password"]').clear({ force: true }).type('senhaErrada', { force: true });
        cy.wrap($btn).click({ force: true });
      });
    });

    // Em caso de falha, a UI deve permanecer no login (a home não aparece com “Conta digital”).
    cy.get('input[name="password"]').should('exist');
    cy.get('body').then(($body) => {
      expect(($body.text() || '').toLowerCase()).not.to.include('conta digital');
    });
  });
});

