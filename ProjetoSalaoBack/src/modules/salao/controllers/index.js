const SalaoModel = require("../models/index")

class SalaoController {
    static async criar(req, res) {
        try {
            const { cliente, servico, data_hora, status } = req.body
            const novoAgendamento = await SalaoModel.criar(cliente, servico, data_hora, status)
            res.status(201).json({
                msg: "aluno criado com sucesso",
                agendamento: novoAgendamento
            })
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar criar um novo agendamento", erro: error.message })
        }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id
            const { cliente, servico, data_hora, status } = req.body
            if( !cliente || !servico || !data_hora || !status){
                return res.status(400).json({msg: "Todos os campos devem ser obrigatorios"})
            }
            const agendamentoEditado = await SalaoModel.editar(id, cliente, servico, data_hora, status)
            if(agendamentoEditado.length === 0){
                return res.status(400).json({msg: "Não foi encontrado nenhum agendamento"})
            }
            res.status(200).json({msg: "Agendamento Editado com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar editar o agendamento", erro: error.message })
        }
    }

    static async listarTodos(req, res) {
        try {
            const agendamento = await SalaoModel.listarTodos()
            if(agendamento.length === 0){
                return res.status(400).json({msg: "Nenhum agendamento foi encontrado"})
            }
            res.status(200).json(agendamento)
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar listar os agendamentos", erro: error.message })
        }
    }

    static async listarPorID(req, res) {
        try {
            const id = req.params.id
            const listar = await SalaoModel.listarPorID(id)
            if(listar.length === 0){
                return res.status(400).json({msg: "Esse agendamento especifico não existe"})
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar listar o agendamento", erro: error.message })
        }
    }

    static async deletarTodos(req, res) {
        try {
            const deletar = await SalaoModel.deletarTodos()
            res.status(200).json({msg: "Todos os agendamentos foram deletados com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar deletar os agendamentos", erro: error.message })
        }
    }

    static async deletarPorID(req, res) {
        try {
            const id = req.params.id
            const listar = await SalaoModel.listarPorID(id)
            if(listar.length === 0){
                return res.status(400).json({msg: "Esse agendamento não existe, procure passar o identificador correto para executar o delete"})
            }
            await SalaoModel.deletarPorID(id)
            res.status(200).json({msg: "Agendamento deletado com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Houve algum erro ao tentar deletar o agendamento", erro: error.message })
        }
    }
}

module.exports = SalaoController