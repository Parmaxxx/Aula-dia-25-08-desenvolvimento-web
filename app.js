const express = require("express")
const app = express()
const Sequelize = require("sequelize")
const sequelize = new Sequelize("projetoweb","root","",{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("conexão realizada com sucesso!")   
}).catch(function(erro){
    console.log("Falha ao conectar "+ erro)
})

const Agendamentos = sequelize.define("Agendamentos",{
    nome:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    bairro:{
        type: Sequelize.STRING
    },
    cep:{
        type: Sequelize.STRING
    },
    cidade:{
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    },
    observacao:{
        type: Sequelize.TEXT
    }
})

//Agendamentos.sync({force: true})// para nao dar drop toda vez que executar

app.get("/",function(req,res){
    res.send("tela inicial")
})

app.get("/cadastrar/:nome/:endereco/:bairro/:cep/:cidade/:estado/:observacao", function(req,res){
    Agendamentos.create({
        nome: req.params.nome,
        endereco: req.params.endereco,
        bairro: req.params.bairro,
        cep: req.params.cep,
        cidade: req.params.cidade,
        estado: req.params.estado,
        observacao: req.params.observacao
    })
    res.redirect("/")//redireciona apos cadastrar
})

app.listen(8081, function(){
    console.log("Servidor web carregado!")
})