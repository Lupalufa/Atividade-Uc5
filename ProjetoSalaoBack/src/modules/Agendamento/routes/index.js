const express = require("express")
const AgendamentoController = require("../controllers/index")

router = express.Router()

router.post("/agendamento/", AgendamentoController.criarAgendamento)
router.put("/agendamento/:id", AgendamentoController.editarAgendamento)
router.get("/agendamento/cliente/:id_C", AgendamentoController.listarAgendamentoCliente)
router.get("/agendamentos/dataHora/:data_hora", AgendamentoController.listarAgendamentoData)
router.get("/agendamentos", AgendamentoController.listarAgendamentos)
router.delete("/agendamentos", AgendamentoController.deletarAgendamentos)
router.delete("/agendamento/:id", AgendamentoController.deletarAgendamentoCliente)

module.exports = router
