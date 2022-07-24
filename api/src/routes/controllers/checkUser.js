const { Client, Professional } = require("../../db");

const checkUser = async ({ id, name, email }) => {
  const clientFound = await Client.findOne({ where: { googleId: id } });
  const professionalFound = await Professional.findOne({
    where: { googleId: id },
  });

  //BUSCA EN LA DB DATOS DEL USUARIO, AGREGANDO PROPIEDAD "isRegistered"

  if (!clientFound || !professionalFound) {
    const userFound = {
      isRegistered: false,
      googleId: id,
      expoToken: null,
      email: email,
      name: name,
      phoneNumber: null,
      perfilPic: null,
      province: null,
      city: null,
      address: null,
      reviews: null,
    };
    return userFound;
  } else if (clientFound) {
    console.log("NOSE", clientFound);
    return userFound;
  } else if (professionalFound) {
    const userFound = {
      isRegistered: true,
      expoToken: professionalFound.dataValues.expoToken,
      email: professionalFound.dataValues.email,
      name: professionalFound.dataValues.name,
      phoneNumber: professionalFound.dataValues.phoneNumber,
      perfilPic: professionalFound.dataValues.perfilPic,
      province: professionalFound.dataValues.province,
      city: professionalFound.dataValues.city,
      address: professionalFound.dataValues.address,
      reviews: professionalFound.dataValues.reviews,
    };
    return userFound;
  }
};

module.exports = { checkUser };
