const { Router } = require('express');
const { Professional } = require('../../db');

const db = require('../../db.hardcode.json');

const router = Router();

router.post('/create', async (req, res) => {
	const {
		googleId,
		name,
		email,
		perfilPic,
		enrollment,
		profession,
		province,
		phoneNumber,
		city,
		address,
		availableTimes,
		expoToken,
    isRegistered
	} = req.body;

	let newProfessional = await Professional.create({
		googleId,
		name,
		email,
		perfilPic,
		enrollment,
		profession,
		province,
		phoneNumber,
		city,
		address,
		availableTimes,
		expoToken,
    isRegistered
	});
	res.send(newProfessional);

});

router.get('/', (req, res) => {
	const { profession } = req.query;

	if (profession === 'Unknown') {
		res.send(db.professional);
	} else {
		res.send(db.professional.filter((p) => p.profession === profession));
	}
});

router.get('/profil', async (req, res) => {
	const id = req.query.id;
	console.log(id);
	const profesional = await Professional.findOne({ where: { googleId: id } });
	res.send(profesional);
});

router.put('/', async (req, res) => {
	const id = req.query.id;
	await Professional.update(req.body, {
		where: { googleId: id },
	});
	res.json({ succes: 'se ha modificado' });
});

module.exports = router;
