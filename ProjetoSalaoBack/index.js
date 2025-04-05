const express = require("express")
const dotenv = require("dotenv")
const server = express()
const routesEnderecos = require("./src/modules/Endereco/routes/index")
const routesClientes = require("./src/modules/Cliente/routes/index")
const routesAgendamentos = require("./src/modules/Agendamento/routes/index")

dotenv.config()
const port = process.env.PORTA


server.use(express.json())

server.use(routesEnderecos)

server.use(routesClientes)

server.use(routesAgendamentos)

// server.use(routesAgendamentos)

server.listen(port, function(req,res){
    console.log(`Iniciando sistema ${port}`)
})
