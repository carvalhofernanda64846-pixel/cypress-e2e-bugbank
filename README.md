# Testes E2E - BugBank

Projeto de testes end-to-end com Cypress para o BugBank (https://bugbank.netlify.app/).

## Cenários cobertos

- **Login** - Autenticação de usuários
- **Cadastro** - Registro de novas contas
- **Transferência** - Transferências entre contas
- **Saque** - Operações de saque
- **Extrato** - Consulta de extrato
- **Pagamento** - Pagamentos

## Setup

```bash
npm install
```

## Executar testes

```bash
# Modo headless
npm test

# Modo interativo
npm run test:open

# Com navegador visível
npm run test:headed
```

## CI/CD

O pipeline está configurado em `.github/workflows/cypress-e2e.yml` e roda automaticamente em pushes e pull requests.
