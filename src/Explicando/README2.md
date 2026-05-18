# Tutorial Detalhado da Integração do Cardápio

Este documento é um tutorial detalhado com todas as micro-ações realizadas ao implementar o modal de cardápio e a busca dos itens no banco de dados.

## Passo 1: Decidir a arquitetura

1. Identifiquei que o projeto é um site React com Vite.
2. Entendi que o botão `Ver Cardápio` no início deve abrir um modal e não apenas rolar a página.
3. Concluí que era preciso um backend para buscar os dados do MySQL, já que o frontend não pode acessar o banco diretamente.

## Passo 2: Adicionar a API backend

1. Criei o arquivo `server.js` na raiz do projeto.
2. Importe as bibliotecas necessárias:
   - `express` para criar o servidor
   - `cors` para permitir requisições do frontend local
   - `mysql2/promise` para conectar ao MySQL de forma assíncrona
3. Configurei a porta do servidor com `process.env.PORT || 3000`.
4. Defini um objeto `DB_CONFIG` com host, porta, usuário, senha e banco de dados.
5. Habilitei o CORS para `http://localhost:5173`.
6. Criei a rota `GET /api/cardapio`.
7. Dentro da rota:
   - abri uma conexão com o MySQL
   - executei a consulta SQL `SELECT ItemId, Nome, Preço AS Preco, ServePessoas, LinkImagem FROM ItemsCardapio ORDER BY ItemId`
   - retornei o resultado como JSON
   - garanti o fechamento da conexão no bloco `finally`
8. Iniciei o servidor com `app.listen(PORT, ...)`.

## Passo 3: Instalar dependências de backend

1. Atualizei `package.json` para incluir os pacotes:
   - `express`
   - `mysql2`
   - `cors`
2. Adicionei o script `server` com `node server.js`.
3. Executei `npm install express mysql2 cors` para instalar as dependências.

## Passo 4: Criar a conexão entre frontend e backend

1. No `src/App.jsx`, adicionei a constante `API_URL` com `import.meta.env.VITE_API_URL ?? 'http://localhost:3000'`.
2. Isso permite usar uma variável de ambiente se houver ou usar o valor padrão.

## Passo 5: Preparar o estado do modal

1. Criei o estado `isModalOpen` com `useState(false)` para controlar a exibição do modal.
2. Criei `cardapioItems` com `useState([])` para guardar os itens retornados.
3. Criei `loadingCardapio` com `useState(false)` para indicar carregamento.
4. Criei `cardapioError` com `useState('')` para armazenar mensagens de erro.

## Passo 6: Implementar a função de fetch

1. Criei a função `loadCardapioItems` como `async`.
2. No início da função, verifiquei se já estava carregando ou se os itens já existem, para evitar requisições duplicadas.
3. Defini `setLoadingCardapio(true)` e limpei `cardapioError`.
4. Usei `fetch(`${API_URL}/api/cardapio`)` para chamar o backend.
5. Verifiquei `response.ok`; se falso, lancei um erro.
6. Converti o resultado para JSON com `response.json()`.
7. Atualizei o estado `setCardapioItems(data)`.
8. No `catch`, registrei o erro no console e defini `cardapioError`.
9. No `finally`, defini `setLoadingCardapio(false)`.

## Passo 7: Criar o modal de cardápio

1. Criei o componente `CardapioModal` no mesmo arquivo `src/App.jsx`.
2. Adicionei as props:
   - `isOpen`
   - `onClose`
   - `items`
   - `loading`
   - `error`
3. Adicionei a condição `if (!isOpen) return null` para não renderizar o modal quando fechado.
4. Adicionei o overlay `modal-overlay` e o container `modal-container`.
5. Tornei o click no overlay capaz de fechar o modal, chamando `onClose`.
6. Parei a propagação do clique dentro do modal para evitar fechamento acidental.
7. Adicionei botão `modal-close` com `×` para fechar.
8. Na área de conteúdo:
   - mostrei texto introdutório
   - implementei o fluxo condicional:
     - se `loading`, exibe "Carregando cardápio..."
     - se `error`, exibe mensagem de erro
     - se `items.length === 0`, exibe aviso de que não há itens
     - caso contrário, renderiza os itens em grid
9. Cada item é exibido com:
   - imagem (`item.LinkImagem`)
   - nome (`item.Nome`)
   - preço formatado (`R$ {Number(item.Preco).toFixed(2)}`)
   - informação "Serve X pessoa(s)"

## Passo 8: Ligar o botão ao modal

1. Substituí o botão `Ver Cardápio` para chamar `openCardapio` em vez de um link.
2. Criei a função `openCardapio`:
   - `setIsModalOpen(true)` para abrir imediatamente
   - `loadCardapioItems()` para buscar os dados
3. Renderizei o componente `CardapioModal` com as props:
   - `isOpen={isModalOpen}`
   - `onClose={() => setIsModalOpen(false)}`
   - `items={cardapioItems}`
   - `loading={loadingCardapio}`
   - `error={cardapioError}`

## Passo 9: Estilizar o modal

1. No `src/index.css`, adicionei estilos ao modal:
   - `modal-overlay` para cobrir a tela inteira
   - `modal-container` para a caixa principal do modal
   - `modal-close` para o botão de fechar
   - `modal-header`, `modal-body` e `modal-status`
2. Adicionei a grade `modal-items-grid` para organizar os cards responsivamente.
3. Estilizei os cards de item:
   - `modal-item-card`
   - `modal-item-image`
   - `modal-item-info`
   - `modal-item-price`
   - `modal-item-serve`

## Passo 10: Testar a interação

1. Iniciar o backend com `npm run server`.
2. Iniciar o frontend com `npm run dev`.
3. Acessar `http://localhost:5173`.
4. Clicar em `Ver Cardápio`.
5. Verificar se o modal abre e se os itens aparecem.

## Passo 11: Resultado final

- O botão `Ver Cardápio` agora abre um modal, não apenas leva a outro bloco.
- O modal consulta o backend e mostra os dados reais do banco.
- O layout do modal segue o visual escuro do projeto.
- O backend responde em JSON e o frontend trata erro/carregamento.

## Observações extras

- Usei `import.meta.env.VITE_API_URL` para facilitar mudar o endereço da API sem alterar o código.
- Mantive a maior parte do aplicativo existente intacta, adicionando apenas os novos estados e o modal.
- O frontend e o backend agora estão separados: React cuida da interface, Express cuida dos dados.

---

Este tutorial foi escrito como um guia passo a passo, detalhando cada micro-ação que eu fiz durante a integração do cardápio via modal e banco de dados.