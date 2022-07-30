const { Router } = require('express');
const { Budget, Request, Professional } = require('../../db');

const router = Router();

// CREA EL BUDGET

router.post('/', async (req, res) => {
	const {
		description,
		price,
		estimatedBudget,
		turn,
		requestId,
		professionalId,
		clientId,
	} = req.body;

	await Budget.create({
		description,
		price,
		estimatedBudget,
		turn,
		requestId,
		professionalId,
		clientId,
	});

	res.status(201).send('budget Create');
});

// ENVIA TODOS LOS BUDGETS

router.get('/', async (req, res) => {
	const budget = await Budget.findAll({
		include: [
			{
				model: Request,
				as: 'request',
				// attributes: ["affair", "description"],
			},
			{
				model: Professional,
				as: 'professional',
				// attributes: ["name"],
			},
		],
		// attributes: ["id", "price", "description"],
	});

	res.send(budget);
});

// ENVIA SOLO UN BUDGET

router.get('/', async (req, res) => {
	const budget = await Budget.findByPk(req.query.id);

	res.status(200).send(budget);
});

// MODIFICA UN BUDGET

router.put('/:id', async (req, res) => {
	const { description, price } = req.body;

	await Budget.update(
		{ description, price },
		{
			where: {
				id: req.params.id,
			},
		}
	);

	res.status(200).send('budget modified');
});

// ELIMINA UN BUDGET

router.delete('/:id', async (req, res) => {
	await Budget.destroy({ where: { id: req.params.id } });

	res.status(200).send('budget deleted');
});

module.exports = router;
