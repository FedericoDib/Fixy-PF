const { Router } = require('express');
const { Client, Professional, Budget, Request } = require('../../db');
const { Expo } = require('expo-server-sdk');

const router = Router();

let expo = new Expo();

router.post('/create', async (req, res) => {
	const {
		isRegistered,
		expoToken,
		googleId,
		name,
		email,
		phoneNumber,
		perfilPic,
		province,
		city,
		address,
		// firstLogin,
		latitude,
		longitude,
	} = req.body;
	console.log(req.body);
	try {
		let user = await Client.create({
			isRegistered,
			expoToken,
			phoneNumber,
			perfilPic,
			province,
			city,
			address,
			googleId,
			name,
			email,
			// firstLogin,
			latitude,
			longitude,
		});
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	const id = req.query.id;
	try {
		if (id) {
			const client = await Client.findOne({ where: { googleId: id } });
			if (client) {
				res.status(200).send(client);
			} else {
				res.status(400).send('no existe ese cliente');
			}
		} else {
			const clients = await Client.findAll();
			res.status(200).send(clients);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.put('/profile', async (req, res) => {
	const { id, phoneNumber, province, city, address } = req.body;
	const client = await Client.findOne({ where: { googleId: id } });
	const professional = await Professional.findOne({
		where: { googleId: id },
	});

	try {
		if (client) {
			client.update({ phoneNumber, province, city, address });
			return res.status(202).send(client);
		} else if (professional) {
			professional.update({ phoneNumber, province, city, address });
			return res.status(202).send(professional);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/budget', async (req, res) => {
	const { id } = req.query;

	try {
		if (!id) {
			res.status(400).send('no hay id');
		}
		const budgets = await Client.findOne({
			where: {
				googleId: id,
			},
			include: [
				{
					model: Budget,
					as: 'budgets',
				},
			],
			attributes: ['name'],
		});
		//console.log(budgets.__proto__);
		if (!budgets) {
			res.status(400).send('no existe este cliente');
		} else {
			if (budgets.budgets.length) {
				res.status(202).send(budgets);
			} else {
				res.status(400).send('no tiene presuspuestos');
			}
		}
	} catch (error) {
		res.status(400).send(error);
	}
});
//Enviar notif al prof, q se elimino el budget
router.put('/budget', async (req, res) => {
	const { clientId, budgetId } = req.body;
	let budget = await Budget.findByPk(budgetId);
	let client = await Client.findOne({ where: { googleId: clientId } });
	const professional = await Professional.findOne({
		where: { googleId: budget.professionalId },
	});
	const reqst = await Request.findOne({ where: { id: budget.requestId } });

	try {
		client.removeBudget(budget);

		//NOTIFICACION AL PROFESIONAL DEL BUDGET RECHAZADO
		const expoPushToken = professional.expoToken;

		let messages = [];
		console.log('sankj', client.name);
		messages.push({
			to: expoPushToken,
			sound: 'default',
			body: `${client.name} ha rechazado tu presupuesto para el problema: ${reqst.affair}`,
			data: { withSome: 'data' },
		});

		let chunks = expo.chunkPushNotifications(messages);
		let tickets = [];
		(async () => {
			// Send the chunks to the Expo push notification service. There are
			// different strategies you could use. A simple one is to send one chunk at a
			// time, which nicely spreads the load out over time:
			for (let chunk of chunks) {
				try {
					let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
					// console.log('tickettttt',ticketChunk);
					tickets.push(...ticketChunk);
					// NOTE: If a ticket contains an error code in ticket.details.error, you
					// must handle it appropriately. The error codes are listed in the Expo
					// documentation:
					// https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
				} catch (error) {
					console.error(error);
				}
			}
		})();

		res.send('exito');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const client = await Client.findOne({
			where: { googleId: req.params.id },
		});
		if (client) {
			res.status(200).send(client);
		} else {
			req.status(400).send('no existe el cliente');
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
