var express = require('express');
var router = express.Router();
var axios = require('axios')

if(typeof localStorage === "undefined" || localStorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}

/* GET home page. */

router.get('/', function(req, res) {
  res.redirect('/classes')
});

router.get('/diplomas', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  axios.get('https://clav-api.dglab.gov.pt/v2/legislacao?apikey=' + t)
    .then(dados => res.render('diplomas', {diplomas: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


router.get('/classes', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + t)
    .then(dados => res.render('classes', {classes: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/classe/:id', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  var classe = req.params.id
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ classe + '?token='+ t)
    .then(c => {
      axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ classe + '/descendencia?token=' + t)
        .then(d =>{ 
          axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ classe + '/procRel?token=' + t)
            .then(p => res.render('classe', {classe: c.data, desc: d.data, proc: p.data, ant: req.query.classe, antant: req.query.ant}))
            .catch(e => res.render('error', {error: e}))
    })
        .catch(e => res.render('error', {errorr: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/processo/:id', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id + '/procRel?token=' + t)
    .then(p => {console.log(p.data)
      res.render('processo', {proc: p.data, classe: req.query.classe})
    })
    .catch(e => res.render('error', {error: e}))
});



router.get('/curso/:id', function(req, res, next) {
  axios.get('http://localhost:3000/cursos/' + req.params.id)
    .then(dados => res.render('curso', {curso: dados.data, aluno: req.query.aluno}))
    .catch(e => res.render('error', {error: e}))
});

module.exports = router;
