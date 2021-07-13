const mongoose = require('mongoose')

var casSchema = new mongoose.Schema({
    idAluno: String,
    nome: String,
    curso: String,
    alunos: [{
      tp: String,
      nota: Number
    }],
    projeto: Number,
    exames: {
      normal: Number,
      especial: Number,
      recurso: Number
    }
  }, {collection: 'avalAlunos'});

module.exports = mongoose.model('avalAluno', casSchema)

