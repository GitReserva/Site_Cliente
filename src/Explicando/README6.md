# Tutorial passo a passo da implementação de login e perfil

Este documento descreve o processo passo a passo para implementar a tela de login, autenticação MySQL e o painel de perfil no projeto.

## Passo 1: Entender o requisito

1. O app precisava de uma tela inicial de login antes de mostrar o conteúdo.
2. Após o login, o perfil do usuário deveria ser exibido em um drawer ao lado do carrinho.
3. O drawer precisava mostrar os dados de `Cliente` do banco e permitir logout.

## Passo 2: Criar a tela de login

1. Criei `src/Login.jsx` com campos para `nome` e `senha`.
2. Adicionei validação para garantir que ambos os campos fossem preenchidos.
3. Usei `fetch` para enviar `POST /api/login` ao backend.
4. Tratei respostas 404 e 401 para exibir mensagens de erro apropriadas.
5. No sucesso, o componente chamou `onLogin(data)` para salvar o usuário.

## Passo 3: Controlar o fluxo no `main.jsx`

1. Em `src/main.jsx`, coloquei o estado `user` com `useState(null)`.
2. Se `user` fosse `null`, renderizei `Login`.
3. Se `user` estivesse preenchido, renderizei `App` e passei `onLogout`.
4. Isso garantiu que o app só mostrasse a página principal após autenticação.

## Passo 4: Implementar autenticação no backend

1. Criei rota `POST /api/login` em `server.js`.
2. O backend recebe `nome` e `senha` no corpo da requisição.
3. Consulta a tabela `Cliente` usando `WHERE Nome = ? LIMIT 1`.
4. Compara a senha recebida com o valor do banco.
5. Retorna `{ ClienteId, Nome }` quando a autenticação é bem-sucedida.

## Passo 5: Buscar dados do perfil

1. Adicionei `useEffect` em `src/App.jsx` para chamar `fetchProfile(user.ClienteId)`.
2. Criei a rota `GET /api/cliente/:id` em `server.js`.
3. Esta rota retorna `ClienteId, Nome, Cpf, Senha` do cliente.
4. No frontend, guardei o resultado em `profileUser`.

## Passo 6: Criar o drawer de perfil

1. Adicionei o componente `ProfileDrawer` em `src/App.jsx`.
2. O drawer aparece somente se `isOpen` for verdadeiro.
3. O overlay escuro cobre a página e o drawer desliza da direita.
4. Dentro do drawer, mostrei:
   - avatar centralizado
   - nome do usuário
   - ID de usuário
   - nome completo
   - CPF
   - senha mascarada

## Passo 7: Ajustar o scroll do drawer

1. Corrigi o CSS para que o scroll funcione dentro do drawer.
2. Adicionei `max-height: 100vh` e `overflow-y: auto` em `.drawer-container`.
3. O overlay agora bloqueia o scroll do fundo enquanto o drawer estiver aberto.

## Passo 8: Adicionar botão de logout

1. Coloquei um botão vermelho `Sair` no final do drawer.
2. Ao clicar, ele chama `onClose()` e `onLogout()`.
3. `onLogout()` limpa o estado do usuário em `main.jsx`.
4. Assim, a aplicação retorna para a tela de login.

## Passo 9: Testar o fluxo completo

1. Executar o backend com `npm run server`.
2. Executar o frontend com `npm run dev`.
3. Fazer login com o usuário `Vinicius` e senha `oi`.
4. Abrir o drawer de perfil e verificar os dados carregados.
5. Clicar em `Sair` e confirmar que volta à tela de login.

## Resultado final

- Tela de login separada funcionando.
- Autenticação via backend Express/MySQL.
- Drawer de perfil com dados do cliente.
- Logout que retorna ao login.
- Interface estável e fluxo claro entre frontend e backend.
