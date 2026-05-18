# Explicação da Integração do Cardápio

Este documento descreve passo a passo o que foi feito no projeto para que o botão `Ver Cardápio` abra um modal e carregue os itens do banco de dados.

## 1. Objetivo

O objetivo foi fazer o site buscar os itens do cardápio em um banco de dados MySQL e exibir esses itens dentro do pop-up que abre quando o usuário clica em `Ver Cardápio`.

## 2. Arquivos alterados e criados

### `src/App.jsx`
- Adicionei um estado para abrir/fechar o modal: `isModalOpen`.
- Criei estados para armazenar os dados do cardápio:
  - `cardapioItems`
  - `loadingCardapio`
  - `cardapioError`
- Adicionei uma função `loadCardapioItems` que faz uma requisição `fetch` para o backend em `/api/cardapio`.
- Criei a função `openCardapio` para abrir o modal e iniciar a busca dos itens.
- Substituí o link antigo do botão `Ver Cardápio` por um `button` que chama `openCardapio()`.
- Criei o componente `CardapioModal` que recebe as propriedades `isOpen`, `onClose`, `items`, `loading` e `error`.
- Dentro do modal, tratei os estados:
  - carregamento (`loading`)
  - erro (`error`)
  - sem itens
  - exibição de itens

### `server.js`
- Criei um servidor Express para fornecer a API de cardápio.
- Adicionei configuração de CORS para permitir que o frontend acesse a API em `http://localhost:5173`.
- Criei a rota `GET /api/cardapio`.
- A rota se conecta ao MySQL usando `mysql2/promise`, consulta a tabela `ItemsCardapio` e retorna os registros como JSON.

### `package.json`
- Adicionei dependências de backend: `express`, `mysql2`, `cors`.
- Adicionei o script `server` para iniciar o servidor com `npm run server`.

### `src/index.css`
- Adicionei estilos para o modal:
  - `modal-overlay`
  - `modal-container`
  - `modal-close`
  - `modal-header`
  - `modal-body`
  - grade de itens `modal-items-grid`
  - cartões de item `modal-item-card`
- Isso ajusta o visual para ficar consistente com o design escuro e moderno do projeto.

### `.env.example`
- Criei um arquivo com exemplo de variáveis de ambiente para a configuração do MySQL e da URL da API.

## 3. Fluxo da aplicação

1. O usuário clica em `Ver Cardápio` no topo da página.
2. A função `openCardapio()` é chamada.
3. Essa função abre o modal e chama `loadCardapioItems()`.
4. `loadCardapioItems()` executa um `fetch` para `http://localhost:3000/api/cardapio`.
5. O backend Express, em `server.js`, consulta o banco de dados MySQL e retorna os registros.
6. O frontend armazena os itens em `cardapioItems`.
7. O modal exibe os itens em cards com imagem, nome, preço e quantidade de pessoas atendidas.

## 4. Estrutura do backend e frontend

### Backend
- `server.js`
  - `express` para criar a API
  - `cors` para permitir requisições do frontend
  - `mysql2/promise` para conexão com o MySQL

### Frontend
- `src/App.jsx`
  - componente principal React
  - modal de cardápio com busca dinâmica
- `src/index.css`
  - estilos do modal e dos cartões

## 5. Como executar

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Inicie o backend:
   ```bash
   npm run server
   ```
3. Inicie o frontend:
   ```bash
   npm run dev
   ```

## 6. Observações importantes

- O banco de dados deve estar rodando e acessível com as credenciais configuradas.
- A senha do MySQL usada neste projeto foi `12345678`, conforme informado.
- O servidor backend assume que o banco se chama `bd_SiteCliente` e a tabela se chama `ItemsCardapio`.
- A URL da API é `http://localhost:3000/api/cardapio`.

## 7. Para estudos futuros

Você pode expandir a integração para:
- adicionar filtros no cardápio
- buscar itens por categoria
- exibir mais informações detalhadas do prato
- permitir edição/adicionar novos itens pelo frontend
- usar um arquivo `.env` real em vez de configurações fixas
- adicionar tratamento melhor de erros e loaders personalizados

---

Este README explica o que foi feito e também o fluxo de dados entre o browser, a API e o banco de dados. Se quiser, posso também documentar o código fonte diretamente nos arquivos com comentários mais específicos.