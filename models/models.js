var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la tabla de definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//exportar definición de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if (count === 0) {
			Quiz.create({ // la tabla se inicializa solo si está vacia
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos actualizada')});
		};
	});
});