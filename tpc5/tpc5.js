var http = require('http')
var axios = require('axios')

http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos')
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Alunos</h2>')
                res.write('<ul>')
            
                alunos.forEach(a => {
                    res.write('<li>' + a.id + ' - ' + a.nome + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de alunos: ' + error);
            });
        }
        else if(req.url == '/cursos'){
            axios.get('http://localhost:3000/cursos')
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Cursos</h2>')
                res.write('<ul>')
            
                alunos.forEach(a => {
                    res.write('<li>' + a.id + ' - ' + a.designacao + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de cursos: ' + error);
            });
        }
        else if(req.url == '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos')
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
                res.write('<ul>')
            
                alunos.forEach(a => {
                    res.write('<li>' + a.id + ' - ' + a["#text"] + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de instrumentos: ' + error);
            });
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end() 
        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
    
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')
