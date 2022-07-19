var LocalStategy = require('passport-local').Strategy;
const passport = require('passport');
// const user = require('..models/Client')
const {DemoClient} = require('../../db');

// passport.use(new LocalStategy({obj},{callback fn}))


// module.exports = function(passport) {
//     passport.use('local-signup',new LocalStategy(
//         {
//             userNamefield:'name',
//             passwordField:'password',
//             passReqToCallback:true
//         }, 
//         async (req, name,password, done) => {
//             console.log('ajsk')
    
//             const user = await DemoClient.create({
//                 name:name,
//                 password:password
//             });
//             done(null,user)
//     }))
// }



passport.use(new LocalStategy('local',
    {
        userNamefield:'email',
        passwordField:'password',
        passReqToCallback:true
    }, 
    async (req, email,password, done) => {
        console.log(req.body)

        const user = await DemoClient.create({
            name:email,
            password:password
        });
        done(null,user)
        }
    )
);

// passport.serializeUser(function (user,done){
//     done(null,user)
// });
// // passport.deserializeUser(function (user,done){
// //     done(null,user)
// // })
// passport.deserializeUser(async function (id,done){
//     const user = await Client.findByPk(id)
//     done(null,user.id)
    
// });