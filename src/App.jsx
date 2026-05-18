import { useEffect, useState, useRef } from 'react'
import './App.css'

import Header from './Header.jsx'
import Carrossel from './Carrossel.jsx'
import Unidades from './Unidades.jsx'
import promoimg from './assets/Card-Cardapio6.jpg'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000' // URL base da API backend usada para buscar o cardápio

function useRevealOnScroll() {
        // useEffect roda após o componente montar no DOM
          useEffect(() => {
  console.log('hook rodou!') // ← adiciona aqui para verificar se o hook está sendo chamado
                // função que revela elementos com a classe "reveal" quando eles entram na área visível da janela do usuário 
                const revealOnScroll = () => {
                   console.log('scroll detectado!') // ← e aqui para verificar se o evento de scroll está sendo capturado
                // seleciona TODOS os elementos com a classe "reveal" para verificar quais estão visíveis e quais devem ser revelados ou escondidos
                const reveals = document.querySelectorAll('.reveal');

                // diz a altura visivel da janela do usuário, para comparar com a posição dos elementos e decidir quando revelar
                const windowHeight = window.innerHeight;

                // Distância em px antes da borda inferior para começar a revelar
                const elementVisible = 150;

               // Percorre cada elemento com a classe "reveal"
                reveals.forEach((el) => {

                // Pega a posição do topo do elemento em relação à janela
                // (diminui conforme o usuário rola pra baixo)
                const elementTop = el.getBoundingClientRect().top;

                  // Se o elemento já entrou na área visível (com margem de 150px)...
                    if (elementTop < windowHeight - elementVisible) {
                      el.classList.add('active');    // ...revela o elemento
                    } else {
                       el.classList.remove('active'); // ...ou esconde se saiu da tela
                    }
          });
        };

    // Roda uma vez na montagem para revelar elementos já visíveis
    setTimeout(revealOnScroll, 150);

    // windows.addEventListener  adiciona um ouvinte de evento para o scroll, chamando a função de revelar sempre que o usuário rolar a página e verificar quais elementos devem ser revelados ou escondidos
    window.addEventListener('scroll', revealOnScroll);
        
    // este return é para limpar o listener quando o componente desmontar, evitando vazamento de memória e erros 
    return () => window.removeEventListener('scroll', revealOnScroll);

  }, []); // o array vazio [] garante que o useEffect rode apenas uma vez, na montagem do componente, e não em atualizações subsequentes e ficar escondendo e revelando os elementos toda vez que o usuário rolar a página, o que é o comportamento desejado para esse efeito de scroll reveal.
}

function CardapioModal({ isOpen, onClose, items, loading, error, onAddToCart }) {
  // O modal só é renderizado quando isOpen é verdadeiro
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar cardápio">
          ×
        </button>
        <div className="modal-header">
          <h2>Cardápio</h2>
          <p>Confira todos os itens disponíveis no nosso banco de dados.</p>
        </div>
        <div className="modal-body">
          {loading ? (
            <p className="modal-status">Carregando cardápio...</p> // Exibe loader enquanto a requisição está em andamento
          ) : error ? (
            <p className="modal-status modal-error">{error}</p> // Exibe mensagem de erro se a API falhar
          ) : items.length === 0 ? (
            <p className="modal-status">Nenhum item cadastrado no cardápio.</p> // Caso não haja dados retornados
          ) : (
            <div className="modal-items-grid">
              {items.map((item) => (
                <article className="modal-item-card" key={item.ItemId}>
                  <img className="modal-item-image" src={item.LinkImagem} alt={item.Nome} />
                  <div className="modal-item-info">
                    <h3>{item.Nome}</h3>
                    <p className="modal-item-price">R$ {Number(item.Preco).toFixed(2)}</p>
                    <p className="modal-item-serve">Serve {item.ServePessoas} pessoa{item.ServePessoas > 1 ? 's' : ''}</p>
                    <button
                      type="button"
                      className="modal-item-add-button"
                      onClick={() => onAddToCart?.(item)}
                    >
                      + Adicionar ao carrinho
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CartModal({ isOpen, onClose, cartItems }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar carrinho">×</button>
        <div className="modal-header">
          <h2>Carrinho</h2>
          <p>Reveja seus itens antes de finalizar.</p>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p className="modal-status">Nenhum item adicionado.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((it, idx) => (
                <div className="cart-item" key={it.ItemId + '-' + idx}>
                  <img className="cart-item-thumb" src={it.LinkImagem} alt={it.Nome} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{it.Nome}</div>
                    <div className="cart-item-qty">Quantidade: {it.Quantidade}</div>
                    <div className="cart-item-unitprice">R$ {Number(it.Preco).toFixed(2)}</div>
                  </div>
                  <div className="cart-item-price">R$ {(Number(it.Preco) * Number(it.Quantidade)).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
          <div className="modal-footer">
            <button type="button" className="profile-logout-button">Finalizar pedido</button>
          </div>
      </div>
    </div>
  )
}

function ProfileDrawer({ isOpen, onClose, user, loading, error, onLogout }) {
  if (!isOpen) return null

  const maskedSenha = user?.Senha ? '*'.repeat(user.Senha.length) : ''

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Perfil">
        <button type="button" className="drawer-close" onClick={onClose} aria-label="Fechar painel">×</button>
        <div className="drawer-header">
          <h3>Perfil</h3>
        </div>
        <div className="drawer-body">
          {loading ? (
            <p className="drawer-status">Carregando perfil...</p>
          ) : error ? (
            <p className="drawer-status drawer-error">{error}</p>
          ) : user ? (
            <div className="profile-content">
              <div className="profile-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              </div>
              <p className="profile-display-name">{user.Nome}</p>
              <div className="profile-field">
                <span className="profile-field-label">Id de usuário</span>
                <span className="profile-field-value">{user.ClienteId}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Nome</span>
                <span className="profile-field-value">{user.Nome}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">CPF</span>
                <span className="profile-field-value">{user.Cpf}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Senha</span>
                <span className="profile-field-value">{maskedSenha}</span>
              </div>
              <button
                type="button"
                className="profile-logout-button"
                onClick={() => {
                  onClose()
                  onLogout?.()
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            <p className="drawer-status drawer-error">Nenhum usuário carregado.</p>
          )}
        </div>
      </aside>
    </div>
  )
}

function App({ user, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false) // controla abertura/fechamento do modal
  const [isCartOpen, setIsCartOpen] = useState(false) // controla abertura/fechamento do carrinho
  const [isProfileOpen, setIsProfileOpen] = useState(false) // controla drawer do perfil
  const [cardapioItems, setCardapioItems] = useState([]) // armazena os itens retornados pelo backend
  const [cartItems, setCartItems] = useState([]) // itens do carrinho
  const [loadingCardapio, setLoadingCardapio] = useState(false) // controle de estado de carregamento
  const [cardapioError, setCardapioError] = useState('') // mensagem de erro caso a requisição falhe
  const [profileUser, setProfileUser] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const toastTimeoutRef = useRef(null)

  useRevealOnScroll() // Chama o hook personalizado para ativar o efeito de revelar elementos ao rolar a página

  const loadCardapioItems = async () => {
    if (loadingCardapio || cardapioItems.length > 0) {
      return
    }

    setLoadingCardapio(true)
    setCardapioError('')

    try {
      const response = await fetch(`${API_URL}/api/cardapio`)
      if (!response.ok) {
        throw new Error('Falha ao carregar o cardápio')
      }

      const data = await response.json()
      setCardapioItems(data)
    } catch (error) {
      console.error(error)
      setCardapioError('Não foi possível carregar o cardápio. Verifique o backend.')
    } finally {
      setLoadingCardapio(false)
    }
  }

  const openCardapio = () => {
    setIsModalOpen(true) // abre o modal imediatamente
    loadCardapioItems() // inicia a busca dos itens do cardápio
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const openProfile = () => {
    setIsProfileOpen(true)
  }

  const addToCart = (item) => {
    if (!item) return
    setCartItems((prev) => {
      // procura por ItemId
      const foundIndex = prev.findIndex((p) => Number(p.ItemId) === Number(item.ItemId))
      if (foundIndex !== -1) {
        // incrementa quantidade
        const copy = [...prev]
        copy[foundIndex] = { ...copy[foundIndex], Quantidade: Number(copy[foundIndex].Quantidade) + 1 }
        return copy
      }

      // adiciona novo item no final (ordem cronológica)
      return [
        ...prev,
        {
          ItemId: item.ItemId,
          Nome: item.Nome,
          Preco: item.Preco ?? item.Preço ?? item.Preço,
          Quantidade: 1,
          LinkImagem: item.LinkImagem,
        },
      ]
    })
    // mostrar toast ao adicionar
    setToastMessage('Item adicionado ao carrinho')
    setShowToast(true)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false)
      toastTimeoutRef.current = null
    }, 1400)
  }

  const fetchProfile = async (id) => {
    if (!id) return
    setProfileLoading(true)
    setProfileError('')

    try {
      const response = await fetch(`${API_URL}/api/cliente/${id}`)
      if (!response.ok) {
        throw new Error('Não foi possível carregar os dados do perfil.')
      }
      const data = await response.json()
      setProfileUser(data)
    } catch (error) {
      console.error(error)
      setProfileError('Não foi possível carregar os dados do perfil.')
    } finally {
      setProfileLoading(false)
    }
  }

  useEffect(() => {
    if (user?.ClienteId) {
      fetchProfile(user.ClienteId)
    }
  }, [user])

  return (
    <div> {/* ELEMENTO PAI tudo precisa estar em uma div */}

    {/* Toast temporário no topo */}
    {showToast && (
      <div className="toast-message" role="status">{toastMessage}</div>
    )}

    <div>
      <Header onOpenCart={openCart} onOpenProfile={openProfile} /> <div className='logo'></div>
    
    <div className="fundo" id="home">
  <div className="fundo-content">
    <h2>Bem-vindo ao Sushi Express Station!</h2>

   

    <div className="hero-buttons">
      <button type="button" className="btn btn-fundo" onClick={openCardapio}>
        Ver Cardápio
      </button>
      <a href="#unidades" className="btn btn-fundo2" role="button">
        Ver Unidades
      </a>
    </div>
  </div>
</div>
<CardapioModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)} // fecha o modal ao clicar no overlay ou no botão de fechar
  items={cardapioItems} // passa os dados do backend para o modal
  loading={loadingCardapio} // informa se a requisição está em andamento
  error={cardapioError} // passa possível mensagem de erro para o modal
  onAddToCart={addToCart}
/>
<CartModal
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
  cartItems={cartItems}
/>
<ProfileDrawer
  isOpen={isProfileOpen}
  onClose={() => setIsProfileOpen(false)}
  onLogout={onLogout}
  user={profileUser}
  loading={profileLoading}
  error={profileError}
/>
      <hr />
    
       <div className='container-promocoes reveal' id='promocoes'>
      <h1>Promoções</h1>
      <div className='promocoes'>
        <div className='promocao-card1'>
        
          <h2>Segunda-feira: Rodízio em dobro</h2>
          
          <p className='letra-promo'>Na compra de um rodízio, o segundo é grátis para você e um acompanhante. Aproveite para compartilhar o sabor do Japão com quem você ama!</p>
        </div>
        <div className='promocao-card card2'>
         
          <h2>Quarta-feira: Desconto no Delivery</h2>
           <div className='cont-prom'>
          <p className='letra-promo'>Peça pelo iFood ou Rappi e ganhe 20% de desconto em todos os pratos do nosso cardápio. A hora de saborear o melhor da culinária japonesa em casa é agora!</p>
          </div>
        </div>
        <div className='promocao-card card3 '>
          
          <h2>Sexta-feira: Happy Hour</h2>
             <div className='cont-prom'>
          <p className='letra-promo'>Das 18h às 21h, aproveite descontos especiais em nossos combinados e bebidas selecionadas. O jeito perfeito de começar o fim de semana com muito sabor!</p>
          </div>
        </div>
        <div className='promocao-card card4 '>
          <h2>Desconto para aniversariantes</h2>
          <div className='cont-prom'>
            
          <p className='letra-promo'>Comemore seu aniversário conosco e receba 25% de desconto em todos os pratos do nosso cardápio. A hora de saborear o melhor da culinária japonesa em casa é agora!</p>
           </div>
        </div>
      </div>
      
    </div>
      <div className="container-Cardap reveal" id="cardapio">
      <h1>Cardápio</h1>

       <Carrossel />
      </div>
      <div className='reveal cont-unit' >
        <Unidades />
    </div>
      <div className="cards-container reveal">
      
      <div className="card green">
      
        <h2>Rodízio</h2>
        <p>
          Sirva-se à vontade com mais de 60 opções de pratos japoneses.
          Sushis, temakis, yakisoba, tempurá, teppanyaki e muito mais por um preço fixo.
        </p>

        <span className="price">A partir de R$89,90</span>

        <ul>
          <li>Mais de 60 opções</li>
          <li>Sobremesa inclusa</li>
          <li>Sem limite de tempo</li>
          <li>Camarão empanado</li>
        </ul>
      </div>

      <div className="card orange">
       
        <h2>À la Carte</h2>
        <p>
          Pratos individuais preparados com ingredientes selecionados
          para quem busca uma experiência mais exclusiva.
        </p>

        <span className="link">Consulte cardápio</span>

        <ul>
          <li>Pratos exclusivos</li>
          <li>Porções generosas</li>
          <li>Ingredientes premium</li>
          <li>Combinados especiais</li>
        </ul>
      </div>

      <div className="card purple">
        
        <h2>Delivery</h2>
        <p>
          Receba a qualidade Matsuya no conforto da sua casa.
          Disponível pelo iFood e Rappi.
        </p>

        <span className="link">Peça pelo app</span>

        <ul>
          <li>iFood</li>
          <li>Rappi</li>
          <li>Embalagem especial</li>
          <li>Entrega rápida</li>
        </ul>
      </div>
  
    </div>
    <h2 >Nossa Historia</h2>
      
      <div className='container-sobre reveal'  id='sobre'>
      
        <img src="./src/assets/Card-sobre.jpg" alt="Imagem Sobre" />
        
         <div className='texto-sobre'> 
          <h2 className='title'>Tradição japonesa com tecnologia de ponta</h2>
              <p>
                Fundada em 2018 no coração de São Paulo, a Sushi Express Station nasceu 
                com uma missão clara: levar a autêntica culinária japonesa a todos, com 
                agilidade, sabor e uma experiência única inspirada nas estações de metrô 
                e trem do Japão.
              </p>
                <p>
                 O nome "Sushi Express Station" carrega a essência do que somos velocidade 
                   sem abrir mão da qualidade, assim como os trens expressos japoneses que 
                    cruzam o país com precisão e elegância. Cada prato é uma parada em uma 
                    nova experiência gastronômica.
              </p>
                <p>
                  Hoje, com um cardápio que reúne mais de 50 opções de pratos frescos e 
                  cuidadosamente preparados, seguimos expandindo nossa presença em São Paulo, 
                  levando sabor, modernidade e tradição a cada cliente que embarca nessa 
                 jornada conosco.
                </p>
          </div>
      </div>
      
     <section id="Contatos" class="contato-section">
  <div class="container reveal">
    <p class="contato-label">Reserve sua experiência</p>
    <h2>Fale com o Sushiman</h2>

    <p class="section-subtitle reveal">
      Quer reservar uma mesa, tirar dúvidas sobre o cardápio ou montar um combinado especial?
      Envie sua mensagem e nossa equipe retorna com todos os detalhes.
    </p>

    <div class="contato-layout reveal">
      <div class="contato-form-area">
        <p class="contato-intro reveal">
          Conte para nós o que você procura: uma reserva especial, um pedido personalizado,
          um evento ou aquele combinado caprichado para impressionar alguém.
        </p>

        <form action="formulario.php" method="post" class="contato-form">
          <div class="form-group reveal">
            <label for="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div class="form-group reveal">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div class="form-group reveal">
            <label for="assunto">Assunto</label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              placeholder="Reserva, pedido, evento ou dúvida"
              required
            />
          </div>

          <div class="form-group reveal">
            <label for="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="5"
              placeholder="Conte o que você deseja: quantidade de pessoas, data, horário, preferências ou restrições."
              required
            ></textarea>
          </div>

          <button type="submit">Enviar mensagem</button>
        </form>
      </div>

      <div class="contato-info">
        <span class="info-tag">Atendimento</span>
        <h3>Outros canais</h3>

        <p><strong>E-mail:</strong> contato@sushirestaurante.com</p>
        <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
        <p><strong>Endereço:</strong> São Paulo - SP</p>
        <p><strong>Horário:</strong> Terça a domingo, das 18h às 23h</p>

        <div class="contato-destaque">
          <p>
            Para reservas no fim de semana, recomendamos entrar em contato com antecedência.
            Mesa boa não espera indeciso.
          </p>
              </div>
                </div>
              </div>
              </div>
          </section>
      



   <footer className='final'>
      <p>&copy; 2023 Sushi Express Station. Todos os direitos reservados.</p>
    </footer>

      
    </div>
    </div>
   
  );

}

export default App;