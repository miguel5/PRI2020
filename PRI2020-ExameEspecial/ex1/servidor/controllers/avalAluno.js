// Controlador para o modelo Tarefa

var AvalAluno = require('../models/avalAluno')

// Devolve a lista de alunos
module.exports.listar = () => {
    return AvalAluno
        .find()
        .select('idAluno nome curso')
        .sort('nome')
        .exec()
}

module.exports.consultarById = id => {
    return AvalAluno
        .findOne({idAluno: id})
        .exec()
}

module.exports.consultarByCurso = c => {
    return AvalAluno
    .find({curso: c})
        .sort('nome')
        .exec()
}

module.exports.consultarTpcs = () => {
    return AvalAluno
    .aggregate([
        {$project: {
            _id: 0,
            idAluno: 1,
            nome: 1,
            curso: 1,
            tpcs: { $cond: { if: { $isArray: "$tpc" }, then: { $size: "$tpc" }, else: "NA"} }
            }}
    ])
    .sort('nome')
}

module.exports.groupByCurso = c => {
    return AvalAluno
    .aggregate([
        {$group: {
            curso: c,
            aluno: { $push: { nome: "$nome", idAluno: "$idAluno" } }
            }}
    ])
}

module.exports.groupByProjeto = c => {
    return AvalAluno
    .aggregate([
        {$group: {
            curso: c,
            aluno: { $push: { nome: "$nome", idAluno: "$idAluno" } }
            }}
    ])
}

module.exports.groupByRecurso = c => {
    return AvalAluno
    .aggregate([
        {$group: {
            curso: c,
            aluno: { $push: { nome: "$nome", idAluno: "$idAluno" } }
            }}
    ])
}


/*
module.exports.listarAno = a => {
    return Casamento
        .find({date: { "$regex":a }})
        .select('_id title date')
        .exec()
}


module.exports.listarByAno = () => {
    return Casamento
        .aggregate([
            {$group: {
                _id: "$date",
                casamentos: { $push: { title: "$title", id: "$_id" } }
                }}
        ])
}

module.exports.listarNoivos = () => {
    return Casamento
        .aggregate([
            {$project:{
                _id:1,
                noivo:{$arrayElemAt:[{$split:[  {$arrayElemAt:[{$split:["$title", ": "]}, 1 ]},  " c.c"]}, 0 ]}
            }
            }
        ]);
}

*/