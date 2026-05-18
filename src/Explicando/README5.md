# Projeto Sushi Express Station

Este documento apresenta o projeto em sua forma atual, mostrando a integração entre frontend React/Vite e backend Express/MySQL.

## Visão geral do projeto

O site foi desenvolvido com React e Vite no frontend, e um backend leve em Node.js com Express para autenticação e leitura de dados do MySQL.

O fluxo principal do site inclui:

- tela inicial com botões de navegação
- modal de cardápio com itens carregados do banco de dados
- login separado como primeira tela
- painel de perfil com dados do cliente após autenticação

## Estrutura do frontend

- `src/main.jsx` é o ponto de entrada e controla se o usuário vê o login ou o app
- `src/Login.jsx` exibe o formulário de autenticação
- `src/App.jsx` contém a página principal, o modal de cardápio e o drawer de perfil
- `src/Header.jsx` fornece a barra de navegação, incluindo botões de carrinho e perfil
- `src/index.css` define os estilos do layout, modal e drawer

## Backend e autenticação

O backend está implementado em `server.js` com as seguintes rotas:

- `POST /api/login` autentica o cliente usando `Cliente.Nome` e `Cliente.Senha`
- `GET /api/cliente/:id` retorna os dados completos do cliente autenticado
- `GET /api/cardapio` busca os itens do cardápio do MySQL

A conexão com o banco utiliza o pacote `mysql2/promise` e fecha a conexão em `finally` para evitar vazamentos.

## Configuração do ambiente

As dependências principais incluem:

- `react`
- `react-dom`
- `vite`
- `express`
- `mysql2`
- `cors`

No `package.json`, o comando `npm run server` inicia o backend, enquanto `npm run dev` inicia o frontend.

## Principais melhorias implementadas

- separação clara entre login e conteúdo principal
- carregamento do perfil do usuário autenticado no drawer
- botão `Sair` para voltar à tela de login
- drawer com conteúdo rolável e overlay fixo
- tratamento de erros no frontend para login e busca de perfil

## Observações finais

Este README foi criado como um resumo do projeto, com foco nas tecnologias usadas e no fluxo de autenticação. Ele segue a estrutura de visão geral e pontos de configuração do README original, adaptada para o contexto deste app.
