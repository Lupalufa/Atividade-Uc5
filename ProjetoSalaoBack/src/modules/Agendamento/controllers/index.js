const EnderecoModel = require("../../Endereco/models")
const AgendamentoModel = require("../models/index")

class AgendamentoController {
    static async criarAgendamento(req, res) {
        try {
            const { id_C, servico, forma_pagamento, observacao, confirmacao, data_hora } = req.body
            if (!id_C || !servico || !forma_pagamento || !confirmacao || !data_hora) {
                return res.status(400).json({ mensagem: "Todos os campos obrigatorios devem ser preenchidos" })
            }
            const novoAgendamento = await AgendamentoModel.criarAgendamento(id_C, servico, forma_pagamento, observacao, confirmacao, data_hora)
            res.status(201).json({
                mensagem: "Novo Agendamento cadastrado com sucesso",
                agendamento: novoAgendamento
            })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar agendamento!", erro: error.message })
        }
    }

    static async listarAgendamentos(req, res) {
        try {
            const listarAgendamento = await AgendamentoModel.listarAgendamentos()
            if (listarAgendamento.length === 0) {
                return res.status(400).json({ mensagem: "Não há nenhum registro de agendamentos" })
            }
            res.status(200).json(listarAgendamento)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar agendamento!", erro: error.message })
        }
    }

    static async listarAgendamentoCliente(req, res) {
        try {
            const id_C = req.params.id_C
            const listarAgendamentoCliente = await AgendamentoModel.listarAgendamentoCliente(id_C)
            if (listarAgendamentoCliente.length === 0) {
                return res.status(400).json({ mensagem: "Esse agendamento não existe" })
            }
            res.status(200).json(listarAgendamentoCliente)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar o agendamento pelo cliente", erro: error.message })
        }
    }

    static async listarAgendamentoData(req, res) {
        try {
            const data_hora = req.params.data_hora
            const listarAgendamentoDataHora = await AgendamentoModel.listarAgendamentoData(data_hora)
            if (listarAgendamentoDataHora.length === 0) {
                return res.status(400).json({ mensagem: "Não há nenhum agendamento para este horario" })
            }
            res.status(200).json(listarAgendamentoDataHora)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar agendamento por data e hora", erro: error.message })
        }
    }

    static async editarAgendamento(req, res) {
        try {
            const id = req.params.id
            const { servico, forma_pagamento, observacao, confirmacao, data_hora } = req.body
            if (!servico || !forma_pagamento || !confirmacao || !data_hora) {
                return res.status(400).json({ mensagem: "Todos os campos obrigatorios devem ser preenchidos corretamente" })
            }
            const agendamentoAtualizado = await AgendamentoModel.editarAgendamento(id, servico, forma_pagamento, observacao, confirmacao, data_hora)
            if (agendamentoAtualizado.length === 0) {
                return res.status(400).json({ mensagem: "Esse agendamento não existe!" })
            }
            res.status(200).json({
                mensagem: "Agendamento atualizado com sucesso",
                agendamento: agendamentoAtualizado
            })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar agendamento!", erro: error.message })
        }
    }

    static async deletarAgendamentos(req, res) {
        try {
            const excluirAgendamento = await AgendamentoModel.deletarAgendamentos()
            res.status(200).json({mensagem: "Todos os agendamentos foram deletados"})
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar agendamentos!", erro: error.message })
        }
    }

    static async deletarAgendamentoCliente(req, res) {
        try {
            const id = req.params.id
            const excluirAgendamento = await AgendamentoModel.deletarAgendamentoCliente(id)
            res.status(200).json({mensagem: "O campo solicitado foi excluido com sucesso"})
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar o agendamento especifico!", erro: error.message })
        }
    }
}

module.exports = AgendamentoController