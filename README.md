# Testes E2E - BugBank

Projeto de testes end-to-end com **Cypress** para o [BugBank](https://bugbank.netlify.app/), uma aplicação de banco digital para estudo de QA.

---

## O que esse projeto faz?

São testes automatizados que simulam um usuário real usando o site. Cada teste verifica se uma funcionalidade está funcionando como esperado — tipo “se eu fizer isso, o sistema deve fazer aquilo”.

---

## O que cada teste verifica?

### Login (`login.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Login com credenciais válidas | Cria uma conta, faz login e tenta acessar a área logada | O usuário entra na conta e vê o botão “Sair” e o número da conta digital |
| Login com senha errada | Cria uma conta, mas tenta logar com uma senha incorreta | O sistema não deixa entrar e continua na tela de login |

---

### Cadastro (`cadastro.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Cadastro de novo usuário | Preenche nome, e-mail e senha no formulário de registro | Aparece mensagem dizendo que a conta “foi criada com sucesso” |

---

### Transferência (`transferencia.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Transferência bem-sucedida | Cria duas contas, uma transfere R$ 10 para a outra | Mensagem “Transferencia realizada com sucesso” |
| Transferir para a mesma conta | Tenta transferir da conta A para a conta A | Mensagem de erro “Nao pode transferir pra mesmo conta” |
| Saldo insuficiente | Tenta transferir R$ 2.000 com saldo menor que isso | Mensagem “Você não tem saldo suficiente para essa transação” |

---

### Extrato (`extrato.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Transferência no extrato | Faz uma transferência entre duas contas e abre o extrato | A transferência aparece listada no extrato com a descrição correta |

---

### Saque (`saque.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Abrir tela de Saque | Faz login e clica na opção de Saque | Aparece um modal informando que a funcionalidade está “em desenvolvimento” |

---

### Pagamento (`pagamento.cy.js`)

| Teste | O que faz | Resultado esperado |
|-------|-----------|---------------------|
| Abrir tela de Pagamento | Faz login e clica na opção de Pagamento | Aparece um modal informando que a funcionalidade está “em desenvolvimento” |

---

## Como rodar os testes

### 1. Instalar as dependências

```bash
npm install
```

### 2. Executar os testes

```bash
# Roda todos os testes no modo headless (sem abrir o navegador)
npm test

# Abre o Cypress para rodar os testes de forma interativa
npm run test:open

# Roda com o navegador visível
npm run test:headed
```

---

## Tecnologias

- **Cypress** – ferramenta de testes E2E
- **Node.js** – ambiente de execução
- **BugBank** – aplicação testada (Netlify)
