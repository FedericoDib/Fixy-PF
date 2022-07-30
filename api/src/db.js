require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const modelClient = require('./models/Client');
const modelProfessional = require('./models/Professional');
const modelRequest = require('./models/Request');
const modelUserDemo = require('./models/UserList');
const modelBudget = require('./models/Budget');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fixyHome`,
	{
		logging: false,
		native: false,
	}
);
const basename = path.basename(__filename);

modelClient(sequelize);
modelProfessional(sequelize);
modelRequest(sequelize);
modelUserDemo(sequelize);
modelBudget(sequelize);
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Client, Professional, Request, Budget } = sequelize.models;

// Aca estan las relaciones

// DE CLIENTE A REQUESTS
Client.hasMany(Request, { as: 'requests', foreignKey: 'clientId' });
Request.belongsTo(Client, {
	foreignKey: 'clientId',
	as: 'client',
});

// DE PROFESIONALES A REQUESTS
Professional.belongsToMany(Request, { through: 'professional_request' });
Request.belongsToMany(Professional, { through: 'professional_request' });

// DE BUDGET A REQUEST
Request.hasMany(Budget, { as: 'budgets', foreignKey: 'requestId' });
Budget.belongsTo(Request, { foreignKey: 'requestId', as: 'request' });

// DE PROFESSIONAL A BUDGET
Professional.hasMany(Budget, { as: 'budgets', foreignKey: 'professionalId' });
Budget.belongsTo(Professional, {
	foreignKey: 'professionalId',
	as: 'professional',
});

// DE BUDGET A CLIENT
Client.hasMany(Budget, { as: 'budgets', foreignKey: 'clientId' });
Budget.belongsTo(Client, { foreignKey: 'clientId', as: 'clients' });

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
	Op,
};
