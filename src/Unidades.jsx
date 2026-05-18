import React from 'react';
import './Unidades.css';

function Unidades() {
  return (
    <section className="section">
      <h2 className="section-title" id="unidades">
        Nossas Unidades
      </h2>

      <div className="promo-banner">
        <p className="promo-label">Rodízio Japonês</p>
        <p className="promo-price">
          <span>A partir de R$</span> 89,90
        </p>
        <p className="promo-desc">
          Mais de 60 opções: Sashimi, Camarão, Carpaccio, Yakisoba e sobremesas
        </p>
      </div>

      <div className="price-options">
        <div className="price-opt">
          <p className="price-opt-label">Almoço Semanal</p>
          <p className="price-opt-value">
            <span>R$</span> 89,90
          </p>
        </div>

        <div className="price-opt">
          <p className="price-opt-label">Jantar Semanal</p>
          <p className="price-opt-value">
            <span>R$</span> 119,90
          </p>
        </div>

        <div className="price-opt">
          <p className="price-opt-label">Fins de Semana e Feriados</p>
          <p className="price-opt-value">
            <span>R$</span> 119,90
          </p>
        </div>
      </div>

      <div className="tags">
        <span className="tag tag-yellow">
          <span className="tag-dot"></span> Bem-estar Garantido
        </span>

        <span className="tag tag-green">
          <span className="tag-dot"></span> 5–8 anos: 50% off
        </span>
      </div>

      <div className="units-grid">
        <div className="unit-card unit1">
          <div className="unit-placeholder bg-1"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">a Estação da Luz</p>
            <p className="unit-address">
              Avenida Prestes Maia, 925, – Estação da Luz, em São Paulo.–SP
            </p>
            <p className="unit-phone">(11) 3105-2471</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit2">
          <div className="unit-placeholder bg-2"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">estação Julio prestes</p>
            <p className="unit-address">
              Praça Júlio Prestes, 148 – Santa Cecília, São Paulo., São Paulo–SP
            </p>
            <p className="unit-phone">(11) 3758-0268</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit3">
          <div className="unit-placeholder bg-3"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">estação Bras</p>
            <p className="unit-address">
              Praça Agente Cícero, s/n.º – Brás, São Paulo.
            </p>
            <p className="unit-phone">(11) 3871-2121</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit4">
          <div className="unit-placeholder bg-4"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação Pinheiros</p>
            <p className="unit-address">
              Rua Capri, 145 – Pinheiros, São Paulo–SP
            </p>
            <p className="unit-phone">(11) 5539-1215</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit5">
          <div className="unit-placeholder bg-5"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">estação Pirituba</p>
            <p className="unit-address">
              Rua dos Camarões, s/nº, bairro Vila Pirituba, São Paulo–SP
            </p>
            <p className="unit-phone">(11) 2975-6226</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit6">
          <div className="unit-placeholder bg-6"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">estação morumbi</p>
            <p className="unit-address">
              Localizada na Avenida das Nações Unidas, 14.171, no bairro de
              Santo Amaro São Paulo–SP
            </p>
            <p className="unit-phone">(11) 5054-2721</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit7">
          <div className="unit-placeholder bg-7"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação Ipiranga</p>
            <p className="unit-address">
              Avenida Presidente Wilson, nº 3473, bairro Ipiranga, São Paulo–SP
            </p>
            <p className="unit-phone">(11) 2523-2626</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit8">
          <div className="unit-placeholder bg-8"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação Liberdade</p>
            <p className="unit-address">
              Praça da Liberdade, 133, no bairro da Liberdade, São Paulo–SP
            </p>
            <p className="unit-phone">(11) 5062-6684</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit9">
          <div className="unit-placeholder bg-9"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação jundiai</p>
            <p className="unit-address">
              Avenida União dos Ferroviários, s/nº, no bairro de Vila Arens,
              São Paulo–SP
            </p>
            <p className="unit-phone">(11) 3776-2512</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit10">
          <div className="unit-placeholder bg-10"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação Tatuapé</p>
            <p className="unit-address">
              Rua Melo Freire, s/nº (acesso do Metrô e Shoppings) e Rua Catiguá,
              s/nº (acesso da CPTM). São Paulo–SP
            </p>
            <p className="unit-phone">(11) 2401-3064</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>

        <div className="unit-card unit11">
          <div className="unit-placeholder bg-11"></div>
          <div className="unit-overlay">
            <span className="unit-logo">sushi express</span>
            <p className="unit-name">Estação Liberdade</p>
            <p className="unit-address">
              Praça da Liberdade, 133, no bairro da Liberdade, São Paulo–SP
            </p>
            <p className="unit-phone">(11) 2941-0875</p>

            <div className="botoes">
              <button>Reservar</button>
              <button>Ver Cardápio</button>
              <button>Delivery</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Unidades;