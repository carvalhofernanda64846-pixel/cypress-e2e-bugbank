# CI/CD

Pasta com documentação e configurações de pipelines de integração contínua.

## GitHub Actions

O pipeline está configurado em `.github/workflows/cypress-e2e.yml`.

### Execução

- **Triggers**: Push e Pull Request nas branches `main` e `master`
- **Ambiente**: Ubuntu Latest
- **Node.js**: v20

### Comandos úteis

```bash
# Rodar testes localmente
npm test

# Abrir Cypress em modo interativo
npm run test:open

# Rodar com navegador visível
npm run test:headed
```

### Artifacts em caso de falha

Em caso de falha nos testes, o workflow faz upload de:
- Screenshots do Cypress
- Vídeos da execução

Esses arquivos ficam disponíveis na aba **Actions** do repositório.
