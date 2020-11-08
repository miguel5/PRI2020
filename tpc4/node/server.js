var http = require('http')
var fs = require('fs')

var servidor = http.createServer(function (req, res){
    if(req.url.match(/\/arq[0-9]+$ | \/index$/)){
        var arq_num = req.url.split('/')[1]
        fs.readFile('/home/miguel/MIEI/4ano/PRI/PRI2020/tpc4/arqweb/' + arq_num + '.html', function(err, data){
            if(err){
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write('<p>Ficheiro inexistente.</p>')
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
        })
    }
    else{
        console.log('ERRO: foi pedido um ficheiro não esperado!')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p>Ficheiro inexistente.</p>')
        res.end()
    }
    
    
})

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777...')