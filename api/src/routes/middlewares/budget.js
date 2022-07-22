const { Router } = require("express");
const { Budget } = require("../../db");

const router = Router();

// CREA EL BUDGET

router.post("/", async (req, res) => {
  const { requestId, professionalId, description, price } = req.body;

  await Budget.create({ requestId, professionalId, description, price });

  res.status(201).send("budget Create");
});

// ENVIA TODOS LOS BUDGETS

router.get("/", async (req, res) => {
  const budgets = await Budget.findAll();

  res.status(200).send(budgets);
});

// ENVIA SOLO UN BUDGET

router.get("/:id", async (req, res) => {
  const budget = await Budget.findByPk(req.params.id);

  res.status(200).send(budget);
});

// MODIFICA UN BUDGET

router.put("/:id", async (req, res) => {
  const { requestId, professionalId, description, price } = req.body;

  await Budget.update(
    { requestId, professionalId, description, price },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).send("budget modified");
});

// ELIMINA UN BUDGET

router.delete("/:id", async (req, res) => {
  await Budget.destroy({ where: { id: req.params.id } });

  res.status(200).send("budget deleted");
});

module.exports = router;
