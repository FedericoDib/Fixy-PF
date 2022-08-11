const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false, alter: true }).then(() => {
	server.listen(process.env.PORT || 3000, () => {
		console.log('%s listening at 3000'); // eslint-disable-line no-console
	});
});

// server.listen(3000, () => console.log(`App listening on port ${3000} 🚀🔥`)
