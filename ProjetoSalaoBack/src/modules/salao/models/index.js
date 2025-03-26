const { pool } = require("../../../config/database")

class SalaoModel {
    static async criar(cliente, servico, data_hora, status){
        const dados = [cliente, servico, data_hora, status]
        const consulta = `insert into agendamento(cliente, servico, data_hora, status)
                            values($1, $2, $3, $4) returning *`
        const novoAgendamento = await pool.query(consulta, dados)
        return novoAgendamento.rows
    }

    static async editar(id, cliente, servico, data_hora, status){
        const dados = [id, cliente, servico, data_hora, status]
        const consulta = `update agendamento set cliente = $2, servico = $3, data_hora = $4, status = $5 where id = $1 returning *`
        const agendamentoAtualizado = await pool.query(consulta, dados)
        return agendamentoAtualizado.rows
    }

    static async listarTodos(){
        const consulta = `select * from agendamento`
        const agendamento = await pool.query(consulta)
        return agendamento.rows
    }

    static async listarPorID(id){
        const dados = [id]
        const consulta = `select * from agendamento where id = $1`
        const listarAgendamento = await pool.query(consulta, dados)
        return listarAgendamento.rows
    }

    static async deletarTodos(){
        const consulta = `delete from agendamento`
        await pool.query(consulta)
    }

    static async deletarPorID(id){
        const dados = [id]
        const consulta = `delete from agendamento where id = $1`
        await pool.query(consulta, dados)
    }
}
module.exports = SalaoModel