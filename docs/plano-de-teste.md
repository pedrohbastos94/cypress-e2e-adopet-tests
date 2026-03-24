# 🐾 Plano de Teste Completo — Adopet (Cypress E2E)

> **Versão:** 1.0 | **Data:** Março 2026 | **Autor:** Pedro Henrique F. Bastos

---

## 1. Identificação do Projeto

| Campo | Valor |
|---|---|
| Projeto | Adopet — Plataforma de Adoção de Pets |
| Repositório | https://github.com/pedrohbastos94/cypress-e2e-adopet-tests |
| Ferramenta de Automação | Cypress (E2E) |
| Linguagem | JavaScript |
| Relatórios | Mochawesome + Cypress Cloud |
| CI/CD | GitHub Actions |
| Autor | Pedro Henrique Ferreira Bastos |
| Data de criação | Março de 2026 |
| Versão do documento | 1.0 |

---

## 2. Objetivo do Plano de Teste

Este documento descreve a estratégia, os cenários e critérios de aceite para os testes automatizados End-to-End (E2E) da plataforma Adopet. O objetivo é garantir que os fluxos críticos do sistema — autenticação, cadastro e integração via API — funcionem corretamente em diferentes condições, prevenindo regressões e assegurando qualidade nas entregas.

---

## 3. Escopo dos Testes

### ✅ Dentro do Escopo

- Fluxo de login (credenciais válidas, inválidas e campos obrigatórios)
- Fluxo de cadastro de usuários (dados válidos, inválidos e via fixtures)
- Testes de API — envio de mensagens e simulação via stubs
- Validação de mensagens de erro e feedback ao usuário
- Execução em pipeline CI/CD via GitHub Actions

### ❌ Fora do Escopo

- Testes de carga e performance
- Testes de segurança (pentest)
- Testes em dispositivos móveis nativos (iOS/Android)
- Testes visuais / comparação de screenshots *(previsto como melhoria futura)*

---

## 4. Abordagem e Estratégia

### 4.1 Tipos de Teste

| Tipo | Descrição | Cobertura Atual |
|---|---|---|
| E2E (UI) | Fluxos completos via interface do usuário | Login, Cadastro |
| API / Contract | Validação de requisições e respostas HTTP | Envio de mensagens |
| Stub / Mock | Simulação de respostas da API para cenários controlados | Interceptação de chamadas |
| Data-Driven | Execução com múltiplas massas de dados via fixtures | Cadastro em massa |

### 4.2 Boas Práticas Aplicadas

- Custom Commands para reutilização de código
- Separação de responsabilidades: ações vs. validações
- Data-driven testing com fixtures (`usuarios.json`)
- Uso de variáveis de ambiente para dados sensíveis
- Geração de relatórios HTML e vídeos de execução

---

## 5. Ambiente de Teste

| Campo | Valor |
|---|---|
| URL da Aplicação | Definida via `CYPRESS_BASE_URL` (secret no GitHub Actions) |
| Navegadores | Chrome (padrão), Firefox, Edge |
| Sistema Operacional | Ubuntu (CI), Windows/macOS (local) |
| Node.js | Compatível com Cypress 13+ |
| Variáveis de Ambiente | `cypress.env.json` (não versionado) |
| Pipeline | GitHub Actions — `.github/workflows/cypress.yml` |
| Monitoramento | Cypress Cloud — Project ID: `qbod3i` |

---

## 6. Casos de Teste

### 🔐 6.1 Módulo: Login

| ID | Cenário | Resultado Esperado | Prioridade | Status |
|---|---|---|---|---|
| CT-001 | Login com e-mail e senha válidos | Usuário autenticado e redirecionado para home | Alta | ✅ Ativo |
| CT-002 | Login com senha incorreta | Exibir mensagem de erro de autenticação | Alta | ✅ Ativo |
| CT-003 | Login com e-mail não cadastrado | Exibir mensagem de usuário não encontrado | Alta | ✅ Ativo |
| CT-004 | Login com campos em branco | Validação de campos obrigatórios exibida | Média | ✅ Ativo |
| CT-005 | Login com e-mail sem formato válido | Mensagem de formato inválido para e-mail | Média | 📋 Planejado |
| CT-006 | Login e verificação de persistência de sessão | Sessão mantida após recarregar a página | Baixa | 📋 Planejado |
| CT-007 | Logout após login bem-sucedido | Usuário desautenticado e redirecionado para login | Média | 📋 Planejado |

### 📝 6.2 Módulo: Cadastro

| ID | Cenário | Resultado Esperado | Prioridade | Status |
|---|---|---|---|---|
| CT-008 | Cadastro com todos os dados válidos | Conta criada com sucesso e feedback exibido | Alta | ✅ Ativo |
| CT-009 | Cadastro com e-mail já existente | Mensagem de e-mail já cadastrado | Alta | ✅ Ativo |
| CT-010 | Cadastro com campos obrigatórios em branco | Validação de campos obrigatórios | Alta | ✅ Ativo |
| CT-011 | Cadastro com senhas não coincidentes | Mensagem de erro sobre confirmação de senha | Alta | ✅ Ativo |
| CT-012 | Cadastro com e-mail inválido (sem @) | Validação de formato de e-mail | Média | ✅ Ativo |
| CT-013 | Cadastro com massa de dados via fixture | Múltiplos usuários criados sem erros | Média | ✅ Ativo |
| CT-014 | Cadastro com senha abaixo do mínimo de caracteres | Mensagem de senha muito curta | Baixa | 📋 Planejado |
| CT-015 | Cadastro com caracteres especiais no nome | Campo aceita ou rejeita conforme regra de negócio | Baixa | 📋 Planejado |

### 🔌 6.3 Módulo: API / Integração

| ID | Cenário | Resultado Esperado | Prioridade | Status |
|---|---|---|---|---|
| CT-016 | Envio de mensagem com dados válidos | Requisição retorna status 200/201 e mensagem salva | Alta | ✅ Ativo |
| CT-017 | Envio de mensagem com body vazio | API retorna erro 400 ou equivalente | Alta | ✅ Ativo |
| CT-018 | Stub de resposta de sucesso na API | Componente exibe feedback de sucesso com dados mockados | Média | ✅ Ativo |
| CT-019 | Stub de resposta de erro na API (500) | Componente exibe mensagem de erro ao usuário | Média | ✅ Ativo |
| CT-020 | Interceptação de chamada para verificar headers | Headers de autenticação presentes na requisição | Média | 📋 Planejado |
| CT-021 | Timeout de requisição simulado via stub | Sistema exibe mensagem de timeout ou retry | Baixa | 📋 Planejado |

---

## 7. Critérios de Aceite e Saída

### 7.1 Critérios de Entrada *(para iniciar execução)*

- Ambiente de teste disponível e acessível
- Código do teste revisado e sem conflitos no repositório
- Fixtures e variáveis de ambiente configuradas
- Pipeline do GitHub Actions funcional

### 7.2 Critérios de Saída *(para considerar ciclo concluído)*

- 100% dos casos de teste de alta prioridade executados
- Taxa de sucesso igual ou superior a 95% nos testes ativos
- Todos os bugs críticos (Blocker/Critical) resolvidos
- Relatório Mochawesome gerado e publicado
- Resultados disponíveis no Cypress Cloud

---

## 8. Classificação de Defeitos

| Severidade | Critério | Exemplo |
|---|---|---|
| 🔴 Blocker | Impede a execução completa | Login não funciona — sistema inacessível |
| 🟠 Critical | Funcionalidade principal falha | Cadastro não salva dados no banco |
| 🟡 Major | Funcionalidade degradada, há workaround | Mensagem de erro com texto incorreto |
| 🟢 Minor | Impacto baixo, cosmético | Botão levemente desalinhado no mobile |

---

## 9. Estrutura do Projeto de Testes

```
cypress/
├── e2e/
│   ├── login/          # Specs de autenticação
│   ├── cadastro/       # Specs de cadastro de usuários
│   └── api/            # Specs de API e stubs
├── fixtures/
│   └── usuarios.json   # Massa de dados para data-driven testing
├── support/
│   ├── commands.js     # Custom Commands reutilizáveis
│   └── e2e.js          # Configurações globais
├── reports/            # Relatórios Mochawesome
├── videos/             # Gravações das execuções
└── screenshots/        # Screenshots em caso de falha

.github/
└── workflows/
    └── cypress.yml     # Pipeline CI/CD

cypress.config.js       # Configuração global do Cypress
```

---

## 10. Melhorias Futuras

| Melhoria | Benefício Esperado | Prioridade |
|---|---|---|
| Implementação do Page Object Model (POM) | Manutenibilidade | Alta |
| Testes visuais com Percy ou Applitools | Detecção de regressão visual | Média |
| Testes de performance com k6 ou Lighthouse | Qualidade de desempenho | Média |
| Expansão do escopo de API (autenticação JWT) | Cobertura de segurança | Alta |
| Testes de acessibilidade com cypress-axe | Inclusão digital / WCAG | Baixa |
| Paralelização de testes no Cypress Cloud | Redução de tempo de pipeline | Média |
