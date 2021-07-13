var express = require('express');
var router = express.Router();
const AvalAlunos = require('../controllers/avalAluno')

/* GET home page. */

router.get('/alunos', function(req, res) {
  if(req.query.curso)
    AvalAlunos.consultarByCurso(req.query.curso)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  else
    if(req.query.groupBy === 'curso')
      AvalAlunos.groupByCurso(req.query.groupBy)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
  else
    if(req.query.groupBy == 'projeto')
    AvalAlunos.groupByProjeto(req.query.groupBy)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
  else
    if(req.query.groupBy == 'recurso')
    AvalAlunos.groupByRecurso(req.query.groupBy)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
  else{
    AvalAlunos.listar()
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  }
});


router.get('/alunos/tpc', function(req, res) {
  AvalAlunos.consultarTpcs()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/alunos/:id', function(req, res) {
  AvalAlunos.consultarById(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
