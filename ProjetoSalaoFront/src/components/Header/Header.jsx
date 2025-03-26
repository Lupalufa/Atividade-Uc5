import React from "react";
import style from "./Header.module.css"

function Header(){
    return (
        <>
          <header className={style.cabeca}>
            <a href="/" className={style.logo}> GlowSys </a>

            <nav className={style.navbar}>
              <a href="#">Inicio</a>
              <a href="#">Sobre</a>
              <a href="#">Serviços</a>
              <a href="#">Galeria</a>
              <a href="#">Contato</a>
            </nav>
          </header>
        </>
    )
};

export default Header