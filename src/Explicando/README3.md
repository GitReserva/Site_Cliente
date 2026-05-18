# Resumo das Alterações (Login + Carrinho)

Este documento resume, no mesmo estilo do `README.md` existente, todas as alterações recentes feitas no projeto.

## 1. Objetivo

Adicionar uma página de login inicial e tornar o ícone do carrinho na navbar capaz de abrir um pop-up (modal) vazio, seguindo a estrutura, organização e estilização do projeto.

## 2. Principais arquivos alterados/novos

- `src/Login.jsx` — novo componente de página de login (formulário com Nome e Senha, validação `required`, mensagens de erro e estado de carregamento).
- `src/Login.css` — estilos do card centralizado, cores escuras e brilho vermelho na borda, foco vermelho nos inputs.
- `src/main.jsx` — adicionei um wrapper `Root` que exibe a tela de `Login` primeiro e, após autenticação bem-sucedida, renderiza `App`.
- `src/Header.jsx` — adicionei prop `onOpenCart` e `onClick={onOpenCart}` no botão do ícone do carrinho.
- `src/App.jsx` — adicionei o modal `CartModal`, estado `isCartOpen` e função `openCart()`; mantive o modal de cardápio existente.
- `server.js` — adicionei rota `POST /api/login` que valida `Nome` e `Senha` contra a tabela `Cliente` no banco de dados MySQL.
- `src/Explicando/README3.md` — este resumo.
- `src/Explicando/README4.md` — tutorial detalhado (criado em paralelo).

## 3. Como funciona a autenticação

1. O formulário da página `Login` envia um `POST` para `/api/login` com `{ nome, senha }`.
2. O backend (`server.js`) consulta a tabela `Cliente` por `Nome`.
3. Se o usuário não existir, retorna 404; se a senha estiver incorreta, retorna 401; se estiver correta, retorna 200 com `ClienteId` e `Nome`.
4. No frontend, em caso de sucesso, `Login` chama `onLogin()` que faz o `Root` renderizar o `App` principal.

## 4. Observações importantes

- As senhas no banco são comparadas em texto puro (plain text) — isso foi implementado conforme o esquema atual do SQL fornecido. Recomendo usar hashing (bcrypt) para produção.
- Durante testes de build apareceu um erro CSS relacionado a `var(var(--color-white))` no projeto — isso não foi causado pelas mudanças do login, mas é algo a corrigir para builds de produção.

## 5. Como testar rapidamente

1. Garanta que o MySQL esteja rodando com o banco `bd_SiteCliente` e a tabela `Cliente` (ver `bd_SiteCliente.sql`).
2. Inicie o backend:
```bash
node server.js
```
3. Inicie o frontend:
```bash
npm run dev
```
4. Abra `http://localhost:5173` e use a página de login (primeira tela). Teste com um `Nome`/`Senha` existente no banco.

---

Se quiser, eu posso transformar a autenticação para usar tokens JWT e hashing de senha, ou corrigir o erro de CSS para permitir builds de produção sem falhas.
