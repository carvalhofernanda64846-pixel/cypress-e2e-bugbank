// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const DEFAULT_PASSWORD = 'senha123';

// Registra um usuário no BugBank.
// - addInitialBalance: quando true, ativa a opção “Criar conta com saldo ?”.
Cypress.Commands.add('bbRegister', ({ email, name, password = DEFAULT_PASSWORD, addInitialBalance }) => {
  cy.contains('button, a', 'Registrar').click({ force: true });

  cy.get('input[name="passwordConfirmation"]', { timeout: 30000 })
    .should('exist')
    .then(($pc) => {
      const $form = $pc.closest('form');
      const scope = $form.length ? $form : $pc.closest('div');

      cy.wrap(scope).within(() => {
        cy.get('input[name="email"]').clear({ force: true }).type(email, { force: true });
        cy.get('input[name="name"]').clear({ force: true }).type(name, { force: true });
        cy.get('input[name="password"]').clear({ force: true }).type(password, { force: true });
        cy.get('input[name="passwordConfirmation"]')
          .clear({ force: true })
          .type(password, { force: true });

        if (addInitialBalance) {
          cy.get('#toggleAddBalance').click({ force: true });
        }

        cy.contains('button, a', 'Cadastrar').click({ force: true });
      });
    });

  cy.get('#modalText', { timeout: 20000 }).should('exist');
});

// Registra e já faz login no usuário criado.
Cypress.Commands.add(
  'bbRegisterAndLogin',
  ({ email, name, password = DEFAULT_PASSWORD, addInitialBalance = false }) => {
    cy.bbRegister({ email, name, password, addInitialBalance });
    cy.contains('Voltar ao login').click({ force: true });
    cy.bbLogin({ email, password });
  },
);

// Loga com credenciais.
Cypress.Commands.add('bbLogin', ({ email, password = DEFAULT_PASSWORD }) => {
  cy.contains('button, a', 'Acessar').then(($btn) => {
    const $form = $btn.closest('form');
    const scope = $form.length ? $form : $btn.closest('div');

    cy.wrap(scope).within(() => {
      cy.get('input[name="email"]').clear({ force: true }).type(email, { force: true });
      cy.get('input[name="password"]').clear({ force: true }).type(password, { force: true });
      cy.wrap($btn).click({ force: true });
    });
  });

  // Espera a home carregar (evita timing de 3D).
  cy.contains(/Conta digital/i, { timeout: 30000 }).should('exist');
});

// Logout.
Cypress.Commands.add('bbLogout', () => {
  cy.contains('button, a', 'Sair').click({ force: true });
});

// Extrai conta digital do usuário logado atual.
Cypress.Commands.add('bbGetDigitalAccount', () => {
  const extract = (attempt) =>
    cy.document().then((doc) => {
      const text = doc.body.innerText || '';
      const match = text.match(/Conta digital:\s*(\d+)\s*-\s*(\d+)/i);
      if (match) return { accountNumber: match[1], digit: match[2] };
      if (attempt >= 12) throw new Error(`BUGBANK_NO_DIGITAL_ACCOUNT: ${text.slice(0, 500)}`);
      cy.wait(3000);
      return extract(attempt + 1);
    });

  return extract(1);
});

// Abre uma tela de operação pelo texto do menu.
// Exemplos: /TRANSFERÊNCIA/i, /PAGAMENT/i, /SAQUE/i, /EXTRATO/i
Cypress.Commands.add('bbOpenOperation', (labelRegex) => {
  cy.get('p').then(($ps) => {
    const matches = $ps
      .toArray()
      .filter((node) => {
        const text = (node.textContent || '').trim();
        return labelRegex.test(text);
      });

    // Preferimos os menus que usam home__TransactionText, mas aceitamos fallback por texto.
    const el =
      matches.find((node) => (node.getAttribute('class') || '').includes('home__TransactionText')) ||
      matches[0];

    const clickFromNode = (node) => {
      const parent = node?.parentElement;
      if (!parent) throw new Error('BUGBANK_OPERATION_LABEL_HAS_NO_PARENT');

      const clickable =
        parent.querySelector('button, a, [role="button"]') ||
        parent.querySelector('*[onclick], *[data-testid], *[aria-label]') ||
        parent;

      cy.wrap(clickable).click({ force: true });
    };

    if (!el) {
      cy.contains(labelRegex).first().then(($target) => {
        clickFromNode($target[0]);
      });
      return;
    }

    clickFromNode(el);
  });
  cy.wait(3500);
});

// Fecha modal genérico (ex: “Fechar”).
Cypress.Commands.add('bbCloseModalIfPresent', () => {
  cy.get('body').then(($body) => {
    const hasClose = $body
      .find('button, a')
      .toArray()
      .some((el) => /Fechar/i.test(el.textContent || ''));
    if (hasClose) cy.contains('button, a', 'Fechar').click({ force: true });
  });
});
