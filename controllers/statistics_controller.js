var models = require('../models/models.js');

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
	
	//PREGUNTAS CON COMENTARIOS
	models.sequelize.query('SELECT count(DISTINCT("QuizId")) AS "count" FROM "comments" AS "comment"').success(function(total){
		statistics["nQuestionsWithComment"] = total[0][0].count;
	}).catch(function(error) {next(error);});
	
	setTimeout(function(){
	   if (statistics["nQuestions"] !== 0) statistics["nCommentsPerQuestion"] = (statistics["nComments"]/statistics["nQuestions"]).toFixed(2);
	   statistics["nQuestionsNoComment"] = statistics["nQuestions"]-statistics["nQuestionsWithComment"];
       res.render('statistics.ejs', { Estadisticas: statistics, errors: [] });
    }, 200);
};