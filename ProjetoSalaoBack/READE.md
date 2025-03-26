# README

## Descrição do Projeto

Este projeto é uma API para gerenciamento de agendamentos de um salão de beleza. A API permite criar, listar, buscar, atualizar e excluir agendamentos.

## Instalação

Para instalar as dependências do projeto, utilize o comando:

```bash
npm install
```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e defina a variável de ambiente `PORTA`:

```
PORTA=3000
```

## Endpoints

### Listar todos os agendamentos

```
GET /
```

Retorna todos os agendamentos cadastrados.

### Buscar um agendamento específico por ID

```
GET /:id
```

Retorna um agendamento específico pelo ID.

### Criar um novo agendamento

```
POST /
```

Cria um novo agendamento. O corpo da requisição deve conter:

```json
{
    "id": "string",
    "cliente": "string",
    "servico": "string",
    "profissional": "string",
    "data_hora": "string",
    "status": "string"
}
```

### Atualizar um agendamento

```
PUT /:id
```

Atualiza um agendamento existente. O corpo da requisição deve conter os novos dados:

```json
{
    "novoCliente": "string",
    "novoServico": "string",
    "novoProfissional": "string",
    "novaData_hora": "string",
    "novoStatus": "string"
}
```

### Excluir um agendamento

```
DELETE /:id
```

Exclui um agendamento pelo ID.

## Código

```javascript
const express = require("express");
const dotenv = require("dotenv");
const server = express();

dotenv.config();
const port = process.env.PORTA;

const bancoDados = [];

server.use(express.json());

server.get("/", function(req, res) {
        try {
                if (bancoDados.length == 0) {
                        res.status(200).json({ msg: "Não há agendamentos a serem exibidos" });
                }
                res.json(bancoDados);
        } catch (error) {
                res.status(500).json({ msg: "Erro ao listar um novo agendamento", erro: error.message });
        }
});

server.get("/:id", function(req, res) {
        try {
                const id = req.params.id;
                const agendas = bancoDados.find((agenda) => agenda.id == id);
                if (!agendas) {
                        res.status(200).json({ msg: "Esse Agendamento não existe" });
                }
                res.json(agendas);
        } catch (error) {
                res.status(500).json({ msg: "Erro ao listar um novo agendamento", erro: error.message });
        }
});

server.post("/", function(req, res) {
        try {
                const { id, cliente, servico, profissional, data_hora, status } = req.body;
                const novoAgendamento = { id, cliente, servico, profissional, data_hora, status };
                bancoDados.push(novoAgendamento);
                res.status(200).json({ msg: "Agendamento criado com sucesso" });
        } catch (error) {
                res.status(500).json({ msg: "Erro ao criar um novo agendamento", erro: error.message });
        }
});

server.put("/:id", function(req, res) {
        try {
                const id = req.params.id;
                const agendamento = bancoDados.find((agenda) => agenda.id == id);
                if (!agendamento) {
                        return res.status(404).json({ msg: "Não foi possivel encontrar esse agendamento" });
                }
                const { novoCliente, novoServico, novoProfissional, novaData_hora, novoStatus } = req.body;
                if (agendamento) {
                        agendamento.cliente = novoCliente;
                        agendamento.servico = novoServico;
                        agendamento.profissional = novoProfissional;
                        agendamento.data_hora = novaData_hora;
                        agendamento.status = novoStatus;
                }
                res.status(200).json({ msg: "Agendamento modificado com sucesso" });
        } catch (error) {
                res.status(500).json({ msg: "Erro ao modificar um novo agendamento", erro: error.message });
        }
});

server.delete("/:id", function(req, res) {
        try {
                const id = req.params.id;
                const exclusao = bancoDados.findIndex((agenda) => agenda.id == id);
                if (exclusao !== -1) {
                        bancoDados.splice(exclusao, 1);
                        res.status(200).json({ msg: "Esse agendamento foi excluido com sucesso" });
                } else {
                        res.status(404).json({ msg: "Não foi possivel encontrar esse agendamento" });
                }
        } catch (error) {
                res.status(500).json({ msg: "Erro ao excluir um novo agendamento", erro: error.message });
        }
});

server.listen(port, function() {
        console.log("Iniciando sistema");
});
```
