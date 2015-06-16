// Definici�n del modelo de comment con validaci�n

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'comment', {
			texto: {
				type: DataTypes.STRING,
				validate: { notEmpty: { msg: "-> Falta Comentario"}}
			}
		}
	);
}