const express = require("express")
const dotenv = require("dotenv")
const server = express()
const { pool } = require("./src/config/database")

dotenv.config()
const port = process.env.PORTA


server.use(express.json())

server.get("/", async function(req,res){
    try {
        const consulta = `select * from agendamento`
        const buscando = await pool.query(consulta)
        if(buscando.rows.length == 0){
            return res.status(200).json({msg: "Não há pessoas agendadas"})
        }
        res.status(200).json(buscando.rows)
    } catch (error) {
        res.status(500).json({msg: "Erro ao listar agendamento", erro: error.message}) 
    }
})
// Deve conter ID, Cliente, Serviço, Profissional, Data e hora, Status
// O sistema precisa permitir Criar um novo agendamento de salão de beleza, Listar todos os agendamentos cadastrados, Buscar um agendamento especifico por ID,
// Atualizar as informações de um agendamento, Excluir um agendamento do sistema

server.get("/:id", async function(req,res){
    try {
        const id = req.params.id
        const dados = [id]
        const consulta = `select * from agendamento where id = $1`
        const resultado = await pool.query(consulta, dados)
        if(!resultado.rows.length === 0){
            return res.status(200).json({msg: "Agendamento não encontrado"})
        }
        res.status(200).json(resultado.rows[0])
    }catch(error){
        res.status(500).json({msg: "Erro ao criar um novo agendamento", erro: error.message})
    }
})

server.post("/", async function(req,res){
    try {
        const {cliente, servico, data_hora, status} = req.body
        const novoAgendamento = [ cliente, servico, data_hora, status]
        const consulta = `insert into agendamento( cliente, servico, data_hora, status)
                            values($1, $2, $3, $4) returning *`
        await pool.query(consulta, novoAgendamento)
        res.status(201).json({msg: "Produto criado com sucesso!"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao criar um novo agendamento", erro: error.message})
    }    
})

server.put("/:id", async function(req,res){
    try {
        const id = req.params.id
        const { novoCliente, novoServico, novaData_hora, novoStatus} = req.body
        if (!id) {
            return req.status(404).json({msg: "Não foi possivel encontrar esse agendamento"})
        }
        const parametros = [id]
        const consulta = `select * from agendamento where id = $1`
        const resultado = await pool.query(consulta, parametros)
        if(resultado.rows.length == 0){
            return res.status(200).json({msg: "Não foi possivel encontrar esse agendamento para modificar"})
        }
        const dados = [id, novoCliente, novoServico, novaData_hora, novoStatus]
        const atualizar = `update agendamento set cliente = $2, servico = $3, data_hora = $4, status = $5 where id = $1 returning *`
        await pool.query(atualizar, dados)
        res.status(200).json({msg: "Agendamento atualizado com sucesso"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao modificar um novo agendamento", erro: error.message})
    }
})

server.delete("/:id", async function(req,res){
    try{
    const id = req.params.id
    const paramentro = [id]
    const consulta = `select * from agendamento where id = $1`
    const resultado = await pool.query(consulta, paramentro)
    if(resultado.rows.length == 0){
        return res.status(200).json({msg: "Não foi possivel encontrar o agendamento"})
    }
    const dados = [id]
    const deletar = `delete from agendamento where id = $1`
    await pool.query(deletar, dados)
    res.status(200).json({msg: "Agendamento deletado com sucesso"})
    } catch(error) {
        res.status(500).json({msg: "Erro ao excluir um novo agendamento", erro: error.message})
    }
})

server.listen(port, function(req,res){
    console.log("Iniciando sistema")
})
