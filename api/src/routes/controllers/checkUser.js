const {Client} = require('../../db')


const checkUser = async (googleId) => {

    const clientFound = await Client.findOne({where:{googleId}});
    const professionalFound = await Client.findOne({where:{googleId}});

    //BUSCA EN LA DB DATOS DEL USUARIO, AGREGANDO PROPIEDAD "isRegistered"
    
    if (!clientFound || !professionalFound) {
        const userFound = {
            isRegistered: false,
            expoToken: null,
            email:null,
            name:null,
            phoneNumber:null,
            perfilPic:null,
            province:null,
            city:null,
            address:null,
            reviews:null
        }

        return userFound
    
    }
    else if (clientFound) {
        console.log(clientFound);
        const userFound = {
            isRegistered: true,
            expoToken: clientFound.dataValues.expoToken,
            email:clientFound.dataValues.email,
            name:clientFound.dataValues.name,
            phoneNumber:clientFound.dataValues.phoneNumber,
            perfilPic:clientFound.dataValues.perfilPic,
            province:clientFound.dataValues.province,
            city:clientFound.dataValues.city,
            address:clientFound.dataValues.address,
            reviews:clientFound.dataValues.reviews
        }
        return userFound;
    
    
    
    } 
    else if (professionalFound){
        const userFound = {
            isRegistered: true,
            expoToken: professionalFound.dataValues.expoToken,
            email:professionalFound.dataValues.email,
            name:professionalFound.dataValues.name,
            phoneNumber:professionalFound.dataValues.phoneNumber,
            perfilPic:professionalFound.dataValues.perfilPic,
            province:professionalFound.dataValues.province,
            city:professionalFound.dataValues.city,
            address:professionalFound.dataValues.address,
            reviews:professionalFound.dataValues.reviews
        }
        return userFound
    };
}

module.exports = {checkUser};

