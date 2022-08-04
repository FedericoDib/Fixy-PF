const { Router } = require("express");
const { Professional, Request, Client, Budget } = require("../../db");

const router = Router();

router.post("/create", async (req, res) => {
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
        isRegistered,
        latitude,
        longitude,
    } = req.body;
    try {
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
            isRegistered,
            latitude,
            longitude,
        });
        res.status(201).send(newProfessional);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", async (req, res) => {
    const { profession } = req.query;
    try {
        let professionals;
        if (profession) {
            if (profession === "Unknown") {
                professionals = await Professional.findAll();
                res.send(professionals);
            } else {
                professionals = await Professional.findAll({
                    where: { profession },
                });
                if (professionals.length) {
                    res.send(professionals);
                } else {
                    res.status(400).send("No hay profesionales");
                }
            }
        } else {
            professionals = await Professional.findAll();

            res.send(professionals);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/budget", async (req, res) => {
    const { id } = req.query;

    try {
        if (!id) {
            res.status(400).send("no hay id");
        } else {
            const budgets = await Professional.findOne({
                where: {
                    googleId: id,
                },
                include: [
                    {
                        model: Budget,
                        as: "budgets",
                    },
                ],
                attributes: ["name"],
            });
            if (budgets) {
                if (budgets.budgets.length) {
                    res.status(200).send(budgets);
                } else {
                    res.status(400).send("no tiene presupuestos");
                }
            } else {
                res.status(400).send("no existe ese profesional");
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const professional = await Professional.findOne({
            where: { googleId: req.params.id },
        });
        if (professional) {
            res.status(200).send(professional);
        } else {
            res.status(400).send("no existe ese professional");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
