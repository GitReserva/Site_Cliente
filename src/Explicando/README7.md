# README7 — Resumo das alterações (baseado no README)

Este arquivo resume as mudanças feitas no projeto, partindo do README original do template React + Vite.

## Objetivo
Adicionar funcionalidade de carrinho ao site: permitir adicionar itens do cardápio ao carrinho, visualizar o carrinho em um modal e exibir totais e quantidades.

## Principais alterações
- Adicionado estado do carrinho e lógica de adição no frontend.
- Conectado o botão "+ Adicionar ao carrinho" do modal do cardápio ao estado do carrinho.
- Criado UI do `CartModal` para exibir os itens adicionados.
- Estilização responsiva para os cards do carrinho no `src/index.css`.
- Notificação rápida (toast) ao adicionar um item.
- Botão "Finalizar pedido" adicionado no rodapé do carrinho (sem ação por enquanto).

## Arquivos modificados
- `src/App.jsx` — principal implementação:
  - `CardapioModal`: botão de adicionar passa a chamar `onAddToCart`.
  - `CartModal`: renderiza lista de itens com imagem, nome, quantidade, preço unitário e preço total por item.
  - Estado: `cartItems`, `addToCart(item)`, toast (`showToast`, `toastMessage`).
  - Botão "Finalizar pedido" no rodapé do modal do carrinho.

- `src/index.css` — estilos:
  - Regras para `.cart-items-list`, `.cart-item`, `.cart-item-thumb`, `.cart-item-info`, `.cart-item-name`, `.cart-item-qty`, `.cart-item-unitprice`, `.cart-item-price`.
  - Estilo para `.toast-message` com animação.

## Como testar rapidamente
1. Inicie o backend (se estiver usando o servidor local do projeto):

```bash
npm run server
```

2. Inicie o frontend (Vite):

```bash
npm run dev
```

3. Abra o site (por padrão `http://localhost:5173`).
4. Clique em "Ver Cardápio" → no modal, clique em "+ Adicionar ao carrinho" em um item.
5. Observe a notificação "Item adicionado ao carrinho" no topo (desaparece automaticamente).
6. Clique no ícone do carrinho na navbar para abrir o `CartModal`.
7. Verifique que:
   - Os itens aparecem em ordem cronológica (último adicionado por último).
   - Cada item mostra imagem, nome, quantidade, preço unitário (embaixo da quantidade) e preço total (à direita).
   - Ao adicionar novamente o mesmo item, a quantidade aumenta em +1 (sem duplicar entrada).
   - O botão "Finalizar pedido" aparece no rodapé (ainda sem ação).

## Observações e próximos passos sugeridos
- Persistir `cartItems` no `localStorage` para manter o carrinho entre recarregamentos.
- Adicionar controles `+ / -` no `CartModal` para ajustar quantidades manualmente.
- Implementar fluxo de checkout para enviar o pedido ao backend.

---
Arquivo gerado com base no README do template; documenta as mudanças realizadas no frontend para suportar carrinho e modal.
