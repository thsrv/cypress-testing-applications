# Projeto de Estudos: Testes Automatizados com Cypress

🚀 **Repositório dedicado aos estudos de testes automatizados com Cypress. Seguindo padrões Page Objects, Cucumber e Gherkin.**

## Funcionalidades Abordadas para o Site [Automation Practice](http://www.automationpractice.pl/)

1. **Cadastro de Usuário:**
   - Campos obrigatórios preenchidos.
   - Validações de campos como nome, sobrenome, e-mail e senha.
   - Verificação de e-mail inválido e inexistente.

2. **Login:**
   - Login com usuário válido.
   - Falha ao inserir usuário incorreto.
   - Impedir login sem preencher senha ou e-mail.

3. **Compra de Produtos:**
   - Compra de 1 produto para endereço específico.
   - Compra de mais de 2 produtos.
   - Compra do produto com melhor desconto.

## Tecnologias 🛠️

- **Cypress:** Framework de teste de front-end.
- **Node.js:** Ambiente de execução.
- **@faker-js/faker:** Geração de dados fictícios.
- **gender-detection:** Detecção de gênero por nome.

## Estrutura 📁

Projeto organizado com Page Objects, Cucumber e Gherkin.

## Ambiente de Teste 🌐

Os testes web foram realizados no site de e-commerce [Automation Practice](http://www.automationpractice.pl/).

## Execução dos Testes ▶️

1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Execute o Cypress:
   - **Modo Interativo:**
     ```bash
     npx cypress open
     ```
   - **Modo Headless (Sem Interface Gráfica):**
     ```bash
     npx cypress run
     ```

**Execução de Testes Específicos por TAG:**
- Para executar um teste específico, utilize o comando `npx cypress run --env TAGS='@suaTag'`.

**Dados Sensíveis 🤐:**
- Os dados sensíveis presentes no arquivo `cypress.env.json` são apenas dados fictícios de teste e não correspondem a informações reais de pessoas.

## Futuras Atualizações 🚧

Este projeto continuará recebendo atualizações, incluindo:
- Testes backend com testes de APIs.
- Testes em bancos de dados.
- Exploração de testes em diferentes sites e plataformas.
