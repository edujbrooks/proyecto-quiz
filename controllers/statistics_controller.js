var models = require('../models/models.js');
//var sequelize = require('sequelize');
// GET /quizes
exports.show = function(req, res) {
	var statistics = {nQuestions: 0, 
					  nComments: 0, 
					  nCommentsPerQuestion: 0, 
					  nQuestionsNoComment: 0, 
					  nQuestionsWithComment: 0,
					  }; //creamos y inicializamos objeto statistics
	
	// TOTAL DE PREGUNTAS
	models.Quiz.count().then(function(total) {
		statistics["nQuestions"] = total;
    }
	).catch(function(error) {next(error);});
	
	//TOTAL DE COMENTARIOS
	models.Comment.count().then(function(total) {
		statistics["nComments"] = total;
    }
	).catch(function(error) {next(error);});
	
	//PREGUNTAS SIN COMENTARIOS
	/*models.Comment.count({distinct: true}).then(function(total) {
		statistics["nQuestionsNoComment"] = total;
    }
	).catch(function(error) {next(error);});	*/
	
	/*models.sequelize.query('SELECT count(*) AS n FROM "Quizzes" WHERE "id" IN (SELECT DISTINCT "QuizId" FROM "Comments")').success(function(total){
		statistics["nQuestionsWithComment"] = total[0].n;
	}).catch(function(error) {next(error);});*/
	
	
	
	
	//PREGUNTA CON COMENTARIOS
	/*models.Quiz.count({where: {name: 'someone2'}}).then(function(total) {
		statistics["nQuestionsWithComment"] = total;
    }
	).catch(function(error) {next(error);});*/	
	
	setTimeout(function(){
	   statistics["nCommentsPerQuestion"] = statistics["nComments"]/statistics["nQuestions"];
       res.render('statistics.ejs', { Estadisticas: statistics, errors: [] });
    }, 200);
};