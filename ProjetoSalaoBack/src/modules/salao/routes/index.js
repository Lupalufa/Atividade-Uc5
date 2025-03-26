const express = require("express")
const SalaoController = require("../controllers/index")

const router = express.Router()

router.get("/agendamentos", SalaoController.listarTodos)

router.get("/agendamento/:id", SalaoController.listarPorID)

router.post("/agendamentos", SalaoController.criar)

router.put("/agendamento/:id", SalaoController.editar)

router.delete("/agendamentos", SalaoController.deletarTodos)

router.delete("/agendamento/:id", SalaoController.deletarPorID)

module.exports = router


