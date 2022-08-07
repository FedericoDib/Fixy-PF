require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const modelClient = require("./models/Client");
const modelProfessional = require("./models/Professional");
const modelRequest = require("./models/Request");
const modelUserDemo = require("./models/UserList");
const modelBudget = require("./models/Budget");
const modelAdmin = require("./models/Admin");
const modelNotif = require('./models/Notification');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(
// 	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fixyHome`,
// 	{
// 		logging: false,
// 		native: false,
// 	}
// );

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fixyHome`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );
const basename = path.basename(__filename);

modelClient(sequelize);
modelProfessional(sequelize);
modelRequest(sequelize);
modelUserDemo(sequelize);
modelBudget(sequelize);
modelAdmin(sequelize);
modelNotif(sequelize);
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Client, Professional, Request, Budget, Notification } = sequelize.models;

// Aca estan las relaciones

// DE CLIENTE A REQUESTS
Client.hasMany(Request, { as: "requests", foreignKey: "clientId" });
Request.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

// DE PROFESIONALES A REQUESTS
Professional.belongsToMany(Request, { through: "professional_request" });
Request.belongsToMany(Professional, { through: "professional_request" });

// DE BUDGET A REQUEST
Request.hasMany(Budget, { as: "budgets", foreignKey: "requestId" });
Budget.belongsTo(Request, { foreignKey: "requestId", as: "request" });

// DE PROFESSIONAL A BUDGET
Professional.hasMany(Budget, { as: "budgets", foreignKey: "professionalId" });
Budget.belongsTo(Professional, {
  foreignKey: "professionalId",
  as: "professional",
});

// DE BUDGET A CLIENT
Client.hasMany(Budget, { as: "budgets", foreignKey: "clientId" });
Budget.belongsTo(Client, { foreignKey: "clientId", as: "clients" });

// DE NOTIFICACIONES A CLIENTE Y PROFESIONAL

Client.hasMany(Notification,{as:"notifications", foreignKey:"clientId"});
Notification.belongsTo(Client,{foreignKey:"clientId", as:"clients"});
Professional.hasMany(Notification,{as:"notifications", foreignKey:"professionalId"});
Notification.belongsTo(Professional,{foreignKey:"professionalId", as:"professionals"});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op,
};
