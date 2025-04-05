const { pool } = require("../../../config/database")

class AgendamentoModel {
    static async criarAgendamento(id_C, servico, forma_pagamento, observacao, confirmacao, data_hora) {
        const dados = [id_C, servico, forma_pagamento, observacao, confirmacao, data_hora]
        const consulta = `insert into salao_agendamento(id_cliente, servico, forma_pagamento, observacoes, confirmacao, data_hora)
                            values($1, $2, $3, $4, $5, $6)`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarAgendamentos() {
        const consulta = `select * from salao_agendamento`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }

    static async listarAgendamentoCliente(id_C) {
        const dados = [id_C]
        const consulta = `select salao_cliente.id, salao_agendamento.* from salao_agendamento join salao_cliente on salao_agendamento.id_cliente = salao_cliente.id where id_cliente = $1 returning *`
        const resultado = await pool.query(dados, consulta)
        return resultado.rows
    }

    static async listarAgendamentoData(data_hora) {
        const dados = [data_hora]
        const consulta = `select * from salao_agendamento where data_hora = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async editarAgendamento(id_C, servico, forma_pagamento, observacao, confirmacao, data_hora) {
        const dados = [id_C, servico, forma_pagamento, observacao, confirmacao, data_hora]
        const consulta = `update salao_agendamento set servico = $2, forma_pagamento = $3, observacoes = $4, confirmacao = $5, data_hora = $6 where id_cliente = $1 returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async deletarAgendamentos(){
        const consulta = `delete from salao_agendamento`
        const resultado = await pool.query(consulta)
    }

    static async deletarAgendamentoCliente(id){
        const dados = [id]
        const consulta = `delete from salao_agendamento where id = $1`
        const resultado = await pool.query(consulta, dados)
    }

}

module.exports = AgendamentoModel