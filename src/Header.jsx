import { useState, useEffect } from 'react';
import './Header.css'; 
import logo from './assets/logo_cliente.png'
function Header({ onOpenCart, onOpenProfile }) {
  const [scrolled, setScrolled] = useState(false); // scrolled 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <header className={scrolled ? "header scrolled" : "header"}>
    
      <img src={logo} alt="Logo do restaurante" />
      
      <div className='logo'></div>
      <nav className='navbar'>
        <h1 className='logo'></h1>
        <a href="#home">Home</a>
        <a href="#sobre">Sobre</a>
        <a href="#cardapio">Cardápio</a>
        <a href="#unidades">Unidades</a>
         <a href="#Contatos">Contatos</a>
         <button type="button" className="navbar-cart" aria-label="Carrinho de compras" onClick={onOpenCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
         <button type="button" className="navbar-profile" aria-label="Perfil" onClick={onOpenProfile}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Header;