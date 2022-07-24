const { Router } = require("express");
const { checkUser } = require("../controllers/checkUser");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const userInfo = await checkUser(req.body);
    res.status(200).send(userInfo);
  } catch (error) {
    res.status(404).send(error);
  }
});
// router.get("/", async (req, res) => {
//   console.log(req.query.id);
//   try {
//     const userInfo = await checkUser(req.query.id);
//     res.status(200).send(userInfo);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

module.exports = router;
