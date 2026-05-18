import { useState } from "react";
import './carrosel.css';
import imagem1 from './assets/Card-Cardapio1.webp';
import imagem2 from './assets/Card-Cardapio2.jpg';
import imagem3 from './assets/Card-Cardapio3.webp';
import imagem4 from './assets/Card-Cardapio4.webp';
import imagem5 from './assets/Card-Cardapio5.jpg';
import imagem6 from './assets/Card-Cardapio6.jpg';
import imagem7 from './assets/Card-Cardapio7.jpg';
import imagem8 from './assets/Card-Cardapio8.jpg';
import imagem9 from './assets/Card-Cardapio9.webp';
import imagem10 from './assets/Card-Cardapio10.jpg';
import imagem11 from './assets/Card-Cardapio11.avif';
import imagem12 from './assets/Card-Cardapio12.avif';
export default function Carrossel() {
  const cards = [
    {
      imagem: imagem1,
      alt: "Sushi Variado",
      tag: "Especial",
      titulo: "Sushi Variado",
      descricao: "Seleção premium de nigiris e uramakis preparados na hora",
      classe: "sushi",
    },
    {
      imagem: imagem2,
      alt: "Temaki",
      tag: "Popular",
      titulo: "Temaki",
      descricao: "Cones crocantes recheados com ingredientes frescos",
      classe: "temaki",
    },
    {
      imagem: imagem3,
      alt: "Temaki Grelhado",
      tag: "Premium",
      titulo: "Temaki Grelhado",
      descricao: "Cones crocantes recheados com ingredientes grelhados",
      classe: "temaki",
    },
    {
      imagem: imagem4,
      alt: "Sashimi",
      tag: "Premium",
      titulo: "Sashimi",
      descricao: "Fatias perfeitas de peixe fresco do dia",
      classe: "sashimi",
    },
    {
      imagem: imagem5,
      alt: "Yakissoba",
      tag: "Quente",
      titulo: "Yakissoba",
      descricao: "Macarrão salteado com legumes e proteínas",
      classe: "yakisoba",
    },
    {
      imagem: imagem6,
      alt: "Sunomono",
      tag: "Leve",
      titulo: "Sunomono",
      descricao: "Salada japonesa agridoce com pepino",
      classe: "sunomono",
    },
    {
      imagem: imagem7,
      alt: "Bento Box",
      tag: "Completo",
      titulo: "Bento Box",
      descricao: "Combinado completo com arroz e acompanhamentos",
      classe: "bento"
    },
    {
      imagem: imagem8,
      alt: "Uramaki Salmão",
      tag: "frio",
      titulo: "Uramaki Salmão",
      descricao: "Uma opção perfeita para quem quer um sushi leve, bonito e cheio de sabor.",
      classe: "Uramaki"
    },
    {
      imagem: imagem9,
      alt: "Uramaki Skin",
      tag: "frio",
      titulo: "Uramaki Skin",
      descricao: "Uma opção perfeita para quem quer um sushi crocante, saboroso e com um contraste irresistível.",
      classe: "Uramaki"
    },
    {
      imagem: imagem10,
      alt: "Uramaki Califórnia",
      tag: "frio",
      titulo: "Uramaki Califórnia",
      descricao: "Uma opção perfeita para quem quer um sushi fresco, equilibrado e com o toque clássico das frutas.",
      classe: "Uramaki"
    },
    {
      imagem: imagem11,
      alt: "Uramaki Ebi (Camarão)",
      tag: "frio",
      titulo: "Uramaki Ebi (Camarão)",
      descricao: "Uma opção perfeita para quem quer um sushi sofisticado, marcante e com o sabor premium do camarão.",
      classe: "Uramaki"
    },
    {
      imagem: imagem12,
      alt: "Uramaki Especial do Chef",
      tag: "frio",
      titulo: "Uramaki Especial do Chef",
      descricao: "Uma opção perfeita para quem quer um sushi exclusivo, surpreendente e com a assinatura da nossa casa.",
      classe: "Uramaki"
    },

  ];
  const cardWidth = 159; // 220 + 16 gap

  const visible = 3;
  const total = cards.length;
  const maxIndex = Math.max(total - visible, 0);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((prev) => Math.max(prev - 1, 0));
    }
  };
  const offset = current * cardWidth;


  return (
    <div className="menu-section">
      <p className="menu-label">Cardápio</p>
      <h2 className="menu-title">Nossos Destaques</h2>

      <div className="carousel-wrapper">
        <div className="nav-row">
          <button
            className="nav-btn"
            onClick={prev}
            disabled={current === 0}
          >
            ←
          </button>

          <button
            className="nav-btn"
            onClick={next}
            disabled={current === maxIndex}
          >
            →
          </button>
        </div>

        <div className="cards-viewport">
          <div
            className="cards-track"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {cards.map((card, index) => (
              <div className="menu-card" key={index}>
                <div className={`card-placeholder ${card.classe}`}>
                  <img src={card.imagem} alt={card.alt} />
                </div>

                <div className="card-gradient"></div>
                <div className="card-overlay"></div>

                <div className="card-body">
                  <span className="card-tag">{card.tag}</span>
                  <p className="card-title">{card.titulo}</p>
                  <p className="card-desc">{card.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-right"></div>
        </div>
      </div>
    </div>
  );
}