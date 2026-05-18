# Tutorial Completo das Alterações (estilo README2)

Este documento detalha, passo a passo, todas as micro-ações realizadas para adicionar a página de login, a autenticação e o modal de carrinho.

## 1 — Planejamento

1. Manter a organização e estilo do projeto (variáveis CSS em `:root`, paleta escura com destaque vermelho).
2. Criar uma página de login separada (`src/Login.jsx`) exibida antes de `App`.
3. Reutilizar o `logo_cliente.png` e padrões visuais do projeto.
4. Implementar autenticação mínima via API (`POST /api/login`) no backend existente (`server.js`).

## 2 — Backend: rota de login

1. Em `server.js` foi adicionada a rota `POST /api/login`.
2. Validação inicial: retorna 400 se faltar `nome` ou `senha`.
3. Consulta SQL: `SELECT ClienteId, Nome, Senha FROM Cliente WHERE Nome = ? LIMIT 1`.
4. Respostas:
   - 404: usuário não encontrado
   - 401: senha incorreta
   - 200: retorna `{ ClienteId, Nome }` em caso de sucesso
5. Observação: a comparação de senha foi implementada por igualdade direta, pois o SQL fornecido não tinha hashing.

## 3 — Frontend: página de login

1. Novo arquivo `src/Login.jsx`:
   - Campos `Nome` e `Senha` com `required` e placeholders.
   - Estado `loading` e `error` para feedback ao usuário.
   - Em `handleSubmit` faz `fetch(API_URL + '/api/login', { method: 'POST', body: JSON })`.
   - Trata códigos 404/401 e exibe mensagem apropriada em `.login-error`.
   - Em sucesso chama `onLogin()` para permitir que `main.jsx` renderize `App`.

2. Estilos em `src/Login.css`:
   - Card centralizado usando `var(--color-card)`.
   - Brilho externo vermelho com `::after` e efeito de hover para intensificar.
   - Inputs com fundo `var(--color-black-soft)` e foco com `box-shadow` vermelho escuro.
   - Botão principal usa `var(--color-red)` com texto branco.

## 4 — Integração com a inicialização da aplicação

1. `src/main.jsx` agora exporta um componente `Root` que controla autenticação local (estado `authed`).
2. `Root` renderiza `<Login onLogin={() => setAuthed(true)} />` enquanto não autenticado.
3. Após `onLogin`, `Root` renderiza `<App />` (a página principal com navbar e carrinho).

## 5 — Carrinho na navbar

1. Em `src/Header.jsx` adicionei `onOpenCart` como prop e liguei ao botão do carrinho.
2. Em `src/App.jsx` adicionei `isCartOpen`, `openCart()` e o componente `CartModal` que segue a mesma estrutura do `CardapioModal` (mas vazio por enquanto).

## 6 — Testes manuais recomendados

1. Popule a tabela `Cliente` no `bd_SiteCliente` com um registro de teste (Nome/Senha) conforme `bd_SiteCliente.sql`.
2. Abra dois terminais:
```bash
node server.js    # backend
npm run dev       # frontend (Vite)
```
3. Acesse `http://localhost:5173` e verifique:
   - Tela de login é a primeira exibida
   - Campos são obrigatórios
   - Mensagens de erro aparecem corretamente
   - Após login bem-sucedido, a `App` principal aparece com navbar e o ícone de carrinho abre o modal vazio

## 7 — Observações técnicas e próximos passos

- Senha em texto plano: reforço que é necessário usar hashing (bcrypt) e, idealmente, JWT ou sessão para autenticação segura.
- Build: existe um erro de CSS com `var(var(--color-white))` que impede `npm run build` — posso corrigir isso removendo o `var(var(...))` incorreto e usando `var(--color-white)` onde necessário.
- Possíveis melhorias:
  - Implementar criação de conta e alteração de senha
  - Persistir sessão no `localStorage` com token JWT
  - Validar inputs no backend com regras mais fortes

---

Este README4 segue o estilo do `README2.md` com passos e micro-ações enumeradas para facilitar reprodução e auditoria do que foi feito.
