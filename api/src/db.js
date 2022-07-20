require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const modelClient = require('./models/Client');
const modelProfessional = require('./models/Professional');
const modelRequest = require('./models/Request');
const modelUserDemo = require('./models/UserList');
const modelBudget = require('./models/Budget');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fixyHome`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);


modelClient(sequelize);
modelProfessional(sequelize);
modelRequest(sequelize);
modelUserDemo(sequelize);
modelBudget(sequelize);
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Client, Professional, Request,Budget} = sequelize.models 

// Aca vendrian las relaciones

Client.hasMany(Request, { as: "requests" });
Request.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

// Professional.hasMany(Request, { as: "requests" });
// Request.belongsTo(Professional, {
//   foreignKey: "professionalId",
//   as: "professional",
// });

Professional.belongsToMany(Request, {through: "professional_request"});
Request.belongsToMany(Professional, {through: "professional_request"});

Request.hasMany(Budget, { as: "budgets" });
Budget.belongsTo(Request, {
  foreignKey: "requestId",
  as: "request",
});

// DemoClient.hasMany(Request, { as: "requests" });
// Request.belongsTo(DemoClient, {
//   foreignKey: "clientId",
//   as: "demoClient",
// });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};