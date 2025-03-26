import React from "react";
import style from "./Main.module.css"

function Main({ text, onClick }) {
    return (
        <>
            <main>
                <h3>Seu momento, sua beleza</h3>
                <h1>Nossa excelência</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit molestiae inventore animi perferendis? Neque nobis iure
                    repudiandae? Accusamus ut, animi voluptatum id eaque sequi harum
                    similique! Cumque quo dicta possimus!</p>

                <button className={style.mainButton} onClick={onClick}> {text} </button>

                <div className={style.promocoesAgenda}>
                    <h3>Faça nosso Agendamento</h3>
                    <div className={style.promocoesPorcentagem}>
                        <div>
                            <h3>15%</h3>
                            <p>Para novos clientes no primeiro serviço</p>
                        </div>

                        <div>
                            <h3>5</h3>
                            <p>A cada o 6° é de graça</p>
                        </div>

                        <div>
                            <h3>10%</h3>
                            <p>Para o aniversariante</p>
                        </div>

                    </div>
                </div>

                <div>
                    <div>
                        <p>Atendimento de qualidade</p>
                    </div>

                    <div>
                        <p>Profissionais especializados</p>
                    </div>

                    <div>
                        <p>Experiência de mercado</p>
                    </div>

                    <div>
                        <p>Tratamentos completos</p>
                    </div>

                    <div>
                        <p>Ambiente agradável</p>
                    </div>

                    <div>
                        <p>Estrutura para eventos</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Main