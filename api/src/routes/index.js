const { Router } = require("express");
const passport = require("passport");
require("./controllers/googleAuth")(passport);

const { checkUser } = require("./controllers/checkUser");

const professionalRouter = require("./middlewares/professional");
const clientRouter = require("./middlewares/client");
const typeWorkRouter = require("./middlewares/typeWork");
const requestRouter = require("./middlewares/request");
const budgetRouter = require("./middlewares/budget");
const userInfo = require("./middlewares/userInfo");
const mpRouter = require("./middlewares/mp/mp");

const router = Router();

// ----------------- RUTA LOGIN -----------------------

//GOOGLE REGISTER/LOGIN

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/checkUser",
    failureRedirect: "/index",
    failureMessage: true,
    passReqToCallback: true,
  }),
  (req, res) => {
    res.redirect("/checkUser");
  }
);

// Chequea si el usuario completo el resto de sus datos de registro

router.get("/userList", checkAuthenticated, async (req, res) => {});

router.get("/checkUser", checkAuthenticated, async (req, res) => {
  const { googleId, name, email } = req.user;

  const userRegistered = await checkUser(googleId, name, email);

  res.send(userRegistered);
});

// Ruta para un logueo Fallido

router.get("/index", (req, res) => {
  res.send("Login Failed");
});

//Middleware para validar

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/index");
}

// ----------------------- FIN DE RUTA LOGIN ----------------------------

router.use("/professional", professionalRouter);
router.use("/client", clientRouter);
router.use("/type", typeWorkRouter);
router.use("/request", requestRouter);
router.use("/budget", budgetRouter);
router.use("/userInfo", userInfo);
router.use("/mp", mpRouter);

module.exports = router;
