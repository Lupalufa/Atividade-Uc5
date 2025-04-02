const { pool } = require("../../../config/database")
const axios = require("axios")

class EnderecoModel {
    static async criarEndereco(id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [id, cep, numero, ponto_referencia, logradouro, complemento, bairro, localidade, uf]
        const consulta = `insert into`
    }

    static async listarEndereco(){
        const consulta = `select * from salao_enderecos`
        const resultado = pool.query(consulta)
        return resultado.rows
    }

    static async listarEnderecoCliente(cliente){
        const dados = [cliente]
        const consulta = `
        select cliente.*, endereco.* 
        from salao_enderecos join salao_cliente 
        on salao_cliente.id = salao_enderecos.id_cliente`
        const resultado = pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarEnderecoCidade(cidade){
        const dados = [`%${cidade}%`]
        const consulta = `select * from salao_enderecos where lower(logradouro) like lower($1)`
        const resultado =  pool.query(consulta, dados)
        return resultado.rows
    }

    static async editarEndereco(id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [id, cep, numero, ponto_referencia, logradouro, complemento, bairro, localidade, uf]
        const consulta = `update salao_endereco set cep = $2 , numero = $3 , ponto_referencia = $4 , logradouro = $5 , complemento = $6 , bairro = $7 , localidade = $8 , uf = $9 where id = $1`
    }
}