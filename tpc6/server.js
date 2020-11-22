var http = require('http')
var axios = require('axios')
var static = require('./static')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves task info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// POST Confirmation HTML Page Template -------------------------------------
function genPostConfirm( tarefa, d){
    return `
    <html>
        <head>
            <title>POST receipt: ${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Tarefa ${tarefa.id} inserida</h1>
                </header>

                <div class="w3-container">
                    <p><a href="/">Voltar</a></p>
                </div>

                <footer class="w3-container w3-teal">
                    <address>TODO List - PRI2020 em ${d}</address>
                </footer>
            </div>
        </body>
    </html>
    `
}


// Canceled task Confirmation HTML Page Template -------------------------------------
function genCanceledTask( tarefa, d){
    return `
    <html>
        <head>
            <title>Task ${tarefa.id} canceled</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Task ${tarefa.id} canceled</h1>
                </header>

                <div class="w3-container">
                    <p><a href="/">Voltar</a></p>
                </div>

                <footer class="w3-container w3-teal">
                    <address>TODO List - PRI2020 em ${d}</address>
                </footer>
            </div>
        </body>
    </html>
    `
}

// Register task HTML Page Template
function genRegTask(){
    return `
        <form class="w3-container" action="/" method="POST">
            <label class="w3-text-teal"><b>Descrição</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
        
            <label class="w3-text-teal"><b>Responsável</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

            <label class="w3-text-teal"><b>Deadline</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="deadline">
        
            <input class="w3-btn w3-blue-grey" type="submit" value="Criar tarefa"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
        </form>
    `
}

// Pending tasks list HTML Page Template  -----------------------------------------
function genPendingTaskList(tasks){
    var list
    tasks.forEach( t => {
        list += `
            <tr>
                <td>${t.deadline}</td>
                <td>${t.responsavel}</td>
                <td>${t.descricao}</td>
                <td><a href="/${t.id}">Cancelar</a></td>
            </tr>

        `
    })

    return list
}

// Completed/Canceled tasks list HTML Page Template  -----------------------------------------
function genCCTaskList(tasks){
    var list
    tasks.forEach( t => {
        list += `
            <tr>
                <td>${t.deadline}</td>
                <td>${t.responsavel}</td>
                <td>${t.descricao}</td>
                <td>${t.estado}</td>
            </tr>

        `
    })

    return list
}

// Main HTML Page Template  -----------------------------------------
// Takes pending tasks and completed/canceled tasks JSON as input
function genMainPag(pending_tasks, cc_tasks, d){
    var page = `
    <html>
        <head>
            <title>TODO List</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>

        <body>
            <div class="w3-container w3-teal">
                <h2>TODO List</h2>
            </div>
            <div class="w3-container w3-teal">
                <h3>New Task</h3>
            </div>
    `
    page += genRegTask()
    page += `
            <div class="w3-container w3-teal">
                <h3>Pending Tasks</h3>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Deadline</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                </tr>
    `
    page += genPendingTaskList(pending_tasks)
    page += `
            </table>
            <div class="w3-container w3-teal">
                <h3>Completed/Canceled Tasks</h3>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Deadline</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <th>Estado</th>
                </tr>
    `
    page += genCCTaskList(cc_tasks)

    page += `
            </table>
            <footer class="w3-container w3-teal">
                <address>TODO List - PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    ` 
    return page
}


// Server setup

var tarefasServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    // Normal request
    switch(req.method){
        case "GET":
            // GET / --------------------------------------------------------------------
            if(req.url == "/"){
                var pendent_tasks
                // Get pendent tasks
                axios.get("http://localhost:3000/tarefas?_sort=deadline,responsavel&estado=pendente")
                    .then(response => {
                        pendent_tasks = response.data
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas pendentes...")
                        res.end()
                    })
                
                // Get finished/canceled tasks and generate main page
                axios.get("http://localhost:3000/tarefas?_sort=deadline&estado=concluida&estado=cancelada")
                    .then(response => {
                        var cc_tasks = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(genMainPag(pendent_tasks, cc_tasks, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas concluídas/canceladas...")
                        res.end()
                    })
            }
            // GET /tarefas/:id --------------------------------------------------------------------
            // Cancel a task given its ID
            else if(/\/[0-9]+$/.test(req.url)){
                var idTarefa = req.url.split("/")[1]
                var tarefa

                axios.get("http://localhost:3000/tarefas/" + idTarefa)
                    .then(response => {
                        tarefa = response.data
                        console.log(JSON.stringify(tarefa))
                        // Change tarefa 'estado' to 'cancelada'
                        tarefa["estado"] = "cancelada"

                        axios.put("http://localhost:3000/tarefas/" + idTarefa, tarefa)
                            .then( response => {
                                let a = response.data
                                
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(genCanceledTask(a, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível eliminar a tarefa selecionada...")
                                res.end()
                            })
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas concluídas/canceladas...")
                        res.end()
                    })
                
                
                
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/'){
                recuperaInfo(req, resultado => {
                    console.log('POST da tarefa:' + JSON.stringify(resultado))
                    // When creating a new task, make its status 'pendente'
                    resultado["estado"] = "pendente"
                    axios.post('http://localhost:3000/tarefas', resultado)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(genPostConfirm( resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
    }
})

tarefasServer.listen(7779)
console.log('Servidor à escuta na porta 7779...')