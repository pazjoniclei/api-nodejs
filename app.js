const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conexao = require("./models/conexao");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = express.Router();
router.get('/', (req, res) => res.json({message: 'API funcionando!'}));
app.use('/', router);

//localhost:8080/usuarios
router.get('/usuarios', (req, res) => {
    conexao.findAll().then(function(usuarios){ 
        return res.json(usuarios)
    }).catch(function(erro){
        return res.json({ message: "Erro ao listar usuários. " + erro });
    })  
});

//localhost:8080/usuarios/id
router.get('/usuarios/:id', (req, res) => { 
    conexao.findAll({
        where: {
            id: Number(req.params.id)
        }
    }).then(function(usuario){ 
        return res.json(usuario);
    }).catch(function(erro){
        return res.json({ message: "Erro ao buscar usuário. " + erro });
    })      
})

//localhost:8080/usuarios
router.post('/usuarios', (req, res) => {
    conexao.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        peso: req.body.peso,
        altura: req.body.altura,
        problemas_saude: req.body.problemas_saude,
    }).then(function(){
        return res.json({ message: "Usuário cadastrado com sucesso." });
    }).catch(function(erro){
        return res.json({ message: "Erro ao cadastrar usuário. " + erro });
    })
});

//localhost:8080/usuarios/id
router.patch('/usuarios/:id', (req, res) => {
    conexao.update({ nome: req.body.nome }, {
        where: {
            id: Number(req.params.id)
        }
    }).then(function(){
        return res.json({ message: "Usuário atualizado." });
    }).catch(function(erro){
        return res.json({ message: "Erro ao atualizar usuário. " + erro });
    }) 
})

//localhost:8080/usuarios/id
router.delete('/usuarios/:id', (req, res) => {    
    conexao.destroy({
        where: {
            id: Number(req.params.id)
        }
    }).then(function(){ 
        return res.json({ message: "Usuário deletado." });
    }).catch(function(erro){
        res.send("Erro ao deletar usuário. " + erro)
    })    
})

app.listen(8080);