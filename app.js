

// importando o express
const express = require("express")
//importando o mongoose
const mongoose = require('mongoose')

//importando o cors
const cors = require('cors')

//importando artigo
require("./models/Artigo")

// colocando o artigo como mongoose
const Artigo = mongoose.model('artigo')

//usar express com app
const app = express()

//usar json
app.use(express.json())


//permissoes para executar com o cors através de url, *** quando usa o * vc habilita todas as urls a fazer requisiçoes
app.use((req, res, next) => {
     //console.log("Acessou o ...")
     res.header("Access-Control-Allow-Origin", "*")
     res.header("Access-Control-Allow-Origin", 'GET,PUT,POST,DELETE')
     app.use(cors())
     next()
})


//verificar sucesso de conexao com o banco mongodb 
mongoose.connect('mongodb://localhost/edu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexao realizada com sucesso")
}).catch((erro) => {
    console.log("ERRO DE CONEXAO")
})

        //ROTAS PARTIR DAQUI !!!
      
//listar dados do banco
app.get("/", (req,res)=> {

   Artigo.find({}).then((artigo) => {
        return res.json(artigo)
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})


//Buscar elemento pelo id
app.get("/artigo/:id", (req,res) => {
    
     Artigo.findOne({id: req.params.id}).then((artigo)=> {
         return res.json(artigo)
     }).catch((erro) =>{
         return res.status(400).json({
             erro:true,
             message: "Nem um artigo foi encontrado!!"
         })

     })

     
})


//cadastrando artigos com titulo e conteudo  e tbm mostrando erro caso venha dar errado
app.post("/artigo", (req,res) => {
  const artigo = Artigo.create(req.body, (err) => {
      if(err) return res.status(400).json({
          erro: true ,
          message: "Erro: Artigo não foi cadastrado"
      })

      return res.status(200).json({
        erro: false ,
        message: "Artigo foi cadastrado"
    })
  })
})

//editar artigos buscando o id pela url
app.put("/artigo/:id",(req,res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id}, req.body, (err)=> {
        if( err) return res.status(400).json({
            erro: true,
            message: "Erro: artigo não foi editado com sucesso"
        })

        return res.json({
            error: false,
            message: "Artigo editado com sucesso!!"
        })
    }) 
})


// apagar artigo pelo id informado na url 
app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err)return res.status(400).json({
            erro: true,
            message: "Artigo não foi apagado!!"
        })

        return res.json({
            erro: false,
            message: "Artigo apagado com sucesso!!!"
        })
    })
})


//alocando a porta 8080 para o servidor 
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080 ")
})