var GoogleStategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const {UserList} = require('../../db');

module.exports = function(passport) {
    
    
    passport.use(new GoogleStategy({
    // Credenciales de 0Auth de la aplicacion de CloudGoogle   
        
        clientID:'302940809798-26aghvvbtfmlqho8rh1vp92utqrbkfsl.apps.googleusercontent.com',
        clientSecret:"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",
        callbackURL:"http://localhost:3000/google/callback",
        passReqToCallback:true 
    
     }, async (request,accesToken, refreshToken,profile, done) =>{
        
        //Busca el User en la DB, si existe loguea, sino lo crea y loguea

        
        const userFound = await UserList.findOne({where:{googleId: profile.id}})
            if (!userFound){
                const user = await UserList.create({
                    googleId:profile.id,
                    email: profile.emails[0].value,
                    name:profile.displayName
                })   
                if(user) return done(null, user);
            }else{
                return done(null, userFound)
            };

        })
    )
};

passport.serializeUser(function (profile, done){
    done(null,profile)
});
passport.deserializeUser(function (profile,done){
        done(null,profile)
})