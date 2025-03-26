const express = require("express")
const dotenv = require("dotenv")
const server = express()
const routesAgendamento = require("./src/modules/salao/routes/index")

dotenv.config()
const port = process.env.PORTA


server.use(express.json())

server.use(routesAgendamento)

server.listen(port, function(req,res){
    console.log("Iniciando sistema")
})
