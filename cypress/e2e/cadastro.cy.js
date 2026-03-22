/// <reference types="cypress" />

describe('Cadastro de usuário no BugBank', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
    // Garante que a página carregou antes de interagir.
    cy.get('input[name="email"]').should('be.visible');
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const email = `teste${Date.now()}@teste.com`;
    const nome = 'Usuário de Teste';
    const senha = 'senha123';

    cy.bbRegister({ email, name: nome, password: senha, addInitialBalance: false });

    cy.get('#modalText', { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', 'foi criada com sucesso');
  });
});
