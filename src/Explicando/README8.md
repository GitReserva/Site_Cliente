# README8 — Detalhamento técnico (baseado no README2)

Este documento detalha, passo a passo, as mudanças técnicas feitas para implementar o carrinho e ajustar a interface do modal do cardápio.

## 1. Visão geral
- Objetivo: permitir que o usuário adicione itens do cardápio a um carrinho em memória e revise esses itens em um modal acessível pela navbar.
- Comportamento principal:
  - Adicionar item incrementa quantidade se já existir no carrinho.
  - Exibir imagem, nome, quantidade, preço unitário e preço total por item.
  - Mostrar toast curto ao adicionar item.
  - Botão "Finalizar pedido" presente (sem ação).

## 2. Alterações no frontend (`src/App.jsx`)
1. Estados adicionados:
   - `cartItems` — array com objetos: `{ ItemId, Nome, Preco, Quantidade, LinkImagem }`.
   - `toastMessage`, `showToast` e `toastTimeoutRef` — para a notificação temporária.

2. Função `addToCart(item)`:
   - Se `item` já existir (comparando `ItemId`), incrementa `Quantidade` em 1.
   - Caso contrário, adiciona novo objeto com `Quantidade: 1` ao final do array (mantendo ordem cronológica).
   - Após atualizar o carrinho, dispara o toast definindo `showToast` para `true` e configura timeout para esconder automaticamente (1.4s).

3. `CardapioModal`:
   - Recebe `onAddToCart` como prop.
   - Botão "+ Adicionar ao carrinho" chama `onAddToCart(item)`.

4. `CartModal`:
   - Recebe `cartItems` como prop.
   - Renderiza `.cart-items-list` com cada `.cart-item`:
     - `<img>` com `className="cart-item-thumb"` à esquerda.
     - `.cart-item-info` no centro com:
       - `.cart-item-name` (nome)
       - `.cart-item-qty` (Quantidade: X)
       - `.cart-item-unitprice` (preço unitário embaixo da quantidade)
     - `.cart-item-price` à direita mostrando `Quantidade * Preco` (preço total do item).
   - Rodapé do modal contém botão `Finalizar pedido` com estilo igual ao botão `profile-logout-button`.

## 3. Estilização (`src/index.css`)
- Novas classes adicionadas:
  - `.cart-items-list` — container vertical com gap entre itens.
  - `.cart-item` — card horizontal: `display:flex`, `align-items:center`, padding e borda sutil.
  - `.cart-item-thumb` — thumbnail do item (72×72, border-radius).
  - `.cart-item-info` — coluna centralizada que empilha nome, quantidade e preço unitário.
  - `.cart-item-name`, `.cart-item-qty`, `.cart-item-unitprice` — tipografias e cores.
  - `.cart-item-price` — preço total em destaque (`var(--color-red)`).
  - `.toast-message` — notificação fixa no topo com animação `toastIn`.
- Responsividade: media query para telas pequenas ajusta alinhamentos e texto.

## 4. Comportamento do toast
- Ao chamar `addToCart`, o toast mostra a mensagem "Item adicionado ao carrinho".
- O toast aparece no topo da tela e some automaticamente após aproximadamente 1.4 segundos.

## 5. Testes rápidos manuais
1. `npm run dev` (iniciar frontend) e `npm run server` (se estiver usando backend local).
2. Abrir `http://localhost:5173`.
3. Abrir `Ver Cardápio` e clicar em "+ Adicionar ao carrinho".
4. Verificar toast e abrir carrinho pela navbar.
5. Validar incremento de quantidade ao adicionar o mesmo item novamente.
6. Conferir que o preço total por item corresponde a `Quantidade × Preço unitário`.

## 6. Pontos a evoluir
- Salvar `cartItems` no `localStorage` para persistência entre reloads.
- Adicionar botões `+` e `-` no `CartModal` para ajuste fino de quantidades.
- Calcular e exibir subtotal do carrinho e possíveis taxas/envio.
- Implementar fluxo de checkout para enviar o pedido ao backend (inserir `Pedido` e `ItemPedido`).

---
Documento gerado com base em `src/Explicando/README2.md`, adaptado para descrever precisamente as alterações implementadas no frontend do projeto.
