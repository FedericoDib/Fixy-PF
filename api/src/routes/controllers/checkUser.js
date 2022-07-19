const {Client} = require('../../db')


const checkUser = async (googleId,name, email) => {

    const clientFound = await Client.findOne({where:{googleId: googleId}});
    const professionalFound = await Client.findOne({where:{googleId: googleId}})


    if (!clientFound) {
        return {registerComplete: false, googleId: googleId, name: name, email: email}
    } else if (!professionalFound) {
        return {registerComplete: false, googleId: googleId, name: name, email: email}
    }else if (clientFound.city === '-') {
        return {registerComplete: false, googleId: clientFound.googleId }
    } else if (professionalFound.city === '-'){ 
        return {registerComplete: false, googleId: clientFound.googleId }
    } else if (clientFound.city !== '-') {
        return {registerComplete: true, googleId: clientFound.googleId }
    } else if (professionalFound.city !== '-'){ 
        return {registerComplete: true, googleId: clientFound.googleId }
    

    }
}

module.exports = {checkUser}

