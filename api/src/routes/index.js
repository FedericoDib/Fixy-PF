const { Router } = require('express');
const passport = require('passport');
require('./controllers/localAuth');
require('./controllers/googleAuth')(passport);
const {Client,DemoClient} = require('../db')
// const {} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

//GOOGLE REGISTER/LOGIN

router.get ('/google', passport.authenticate('google',{scope : ['email','profile'] }));

router.get ('/google/callback',
    passport.authenticate('google',
    {successRedirect: '/profile',failureRedirect: '/index',failureMessage: true }), (req,res) =>{
        res.redirect('/profile')
    });

// LOCAL REGISTER/LOGIN

router.get('/signup', (req,res,next) => {

});

router.post('/signup', passport.authenticate('local',{
    successRedirect:'/profile',
    // failureRedirect:'/index',
    passReqToCallback: true
}));

// router.post('/signup', async (req, res) =>{
//     const{email} = req.body
//     console.log(req.body.name)
//     const user = await DemoClient.create({
//         name:req.body.name
//         // username: req.body.email,
//         // password: req.body.password,
//         // name: req.body.name,
//         // lastName: req.body.lastName,
//         // province: req.body.province,
//         // city:req.body.city,
//         // adress:req.body.adress
//     });
//     res.send(user)
// })

router.get('/signin', (req,res,next) => {

});

router.post('/signin', (req,res,next) => {

});







router.get ('/index',(req,res) =>{
    // console.log(req.body)
    res.send("HOME")
});

router.get ('/profile',checkAuthenticated,(req,res) =>{
    res.send("hola")
});



//Middleware para validar

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/index')
  }

module.exports = router;
