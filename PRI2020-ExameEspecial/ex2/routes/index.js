var express = require('express');
var router = express.Router();
var axios = require('axios')

if(typeof localStorage === "undefined" || localStorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}

/* GET home page. */

router.get('/', function(req, res) {
  res.redirect('/diplomas')
});

router.get('/diplomas', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  axios.get('https://clav-api.dglab.gov.pt/v2/legislacao?apikey=' + t)
    .then(dados => res.render('diplomas', {diplomas: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/diploma/:id', function(req, res, next) {
  var t = localStorage.getItem('myToken')
  axios.get('https://clav-api.dglab.gov.pt/v2/legislacao/' + req.params.id + '?apikey=' + t)
    .then(dados => res.render('diploma', {diploma: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


module.exports = router;
