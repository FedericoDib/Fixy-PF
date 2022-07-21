const { Router } = require("express");
const passport = require("passport");
require("./controllers/googleAuth")(passport);
const { Client, DemoClient, Request, Professional } = require("../db");

const { checkUser } = require("./controllers/checkUser");

const typeWorkRouter = require("./middlewares/typeWork");
const requestRouter = require("./middlewares/request");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

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

router.post("/professional/create", async (req, res) => {
  const {
    googleId,
    name,
    email,
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
    expoToken,
  } = req.body;

  await Professional.create({
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
    googleId,
    name,
    email,
    expoToken,
  });
  res.send("profesional modified");
});

router.post("/client/create", async (req, res) => {
  const {
    expoToken,
    googleId,
    name,
    email,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
  } = req.body;

  await Client.create({
    expoToken,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
    googleId,
    name,
    email,
  });
  res.send("client modified");
});

router.use("/type", typeWorkRouter);
router.use("/request", requestRouter);
//Middleware para validar

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/index");
}

module.exports = router;
