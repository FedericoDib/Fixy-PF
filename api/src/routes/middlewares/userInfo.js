const { Router } = require("express");
const { checkUser } = require("../controllers/checkUser");

const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const userInfo = await checkUser(req.body);
    res.status(201).send(userInfo);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
