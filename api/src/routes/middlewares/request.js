const { Router, request } = require('express');
const { Professional, Request, Client, Budget } = require('../../db');
const { Expo } = require('expo-server-sdk');

const router = Router();

const db = require('../../db.hardcode.json');

let expo = new Expo();
//
router.post('/', async (req, res) => {
	const {
		clientId,
		affair,
		date,
		description,
		address,
		status,
		availableTime,
	} = req.body;

	try {
		let newRequest = await Request.create({
			clientId,
			affair,
			date,
			description,
			status,
			address,
			availableTime,
		});

		res.status(201).send(newRequest);
	} catch (error) {
		res.status(400).send('faltan datos');
	}
});

// SE NOTIFICA AL PROF Q SE ACEPTO UN PRESUPUESTO
router.put('/:id', async (req, res) => {
	try {
		const budget = await Budget.findOne({ where: { id: req.params.id } });
		const professional = await Professional.findOne({
			where: { googleId: budget.professionalId },
		});
		console.log('dshajk', professional);
		const client = await Client.findOne({
			where: { googleId: budget.clientId },
		});
		const reqst = await Request.findOne({ where: { id: budget.requestId } });
		await Request.update(
			{ status: 'active' },
			{ where: { id: budget.requestId } }
		);

		//NOTIFICACION AL PROFESIONAL DEL BUDGET ACEPTADO
		const expoPushToken = professional.expoToken;

		let messages = [];

		messages.push({
			to: expoPushToken,
			sound: 'default',
			body: `${client.name} ha aceptado tu presupuesto para el problema: ${reqst.affair}`,
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

		res.status(202).send('ok');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.put('/', async (req, res) => {
	const { googleId, idRequest } = req.body;
	try {
		const request = await Request.findOne({ where: { id: idRequest } });
		const professional = await Professional.findOne({
			where: { googleId },
		});

		await request.addProfessional(professional);

		// NOTIFICATIONS
		const expoPushToken = professional.expoToken;

		let messages = [];

		messages.push({
			to: expoPushToken,
			sound: 'default',
			body: 'Tenes una nueva solicitud de presupuesto',
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

		//----------------------//
		res.status(2002).send('Solicitud creada con exito');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	const { id } = req.query;
	try {
		let request;
		if (id) {
			request = await Request.findOne({ where: { id } });
			if (request) {
				res.status(200).send(request);
			} else {
				res.status(400).send('no existe la request');
			}
		} else {
			request = await Request.findAll();
			res.send(request);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/professional', async (req, res) => {
	const { id } = req.query;

	try {
		const requests = await Professional.findOne({
			where: {
				googleId: id,
			},
			include: [
				{
					model: Request,
					attributes: [
						'affair',
						'description',
						'date',
						'address',
						'clientId',
						'status',
						'id',
						'availableTime',
					],
				},
			],
			attributes: ['name'],
		});
		if (!request) {
			res.status(400).send('no existe ese profesional');
		} else {
			res.status(200).send(requests.requests);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// MUESTRA LOS CLIENTES ASOCIADOS A LA REQUEST

router.get('/client', async (req, res) => {
	const { id } = req.query;
	try {
		const requests = await Client.findAll({
			where: {
				googleId: id,
			},
			include: [
				{
					model: Request,
					as: 'requests',
				},
			],
			attributes: ['name'],
		});
		if (request) {
			res.status(200).send(requests[0].requests);
		} else {
			res.status(400).send('no existe el cliente');
		}
	} catch (error) {}
});

module.exports = router;
