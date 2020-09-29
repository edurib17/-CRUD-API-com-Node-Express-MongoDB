const mongoose = require('mongoose')

//criando o banco com suas propriedades como por exmplo ( required  que tem sua funçao de ser um campo obrigatorio e type mostrando o tipo do campo)
const Artigo = new mongoose.Schema({
    titulo:{
        type: String,
        required:true
    },
    conteudo:{
        type:String,
        required: true
    }
},
{
    timetamps: true

})

//exportando para usar no arquivo app.js
mongoose.model('artigo', Artigo)