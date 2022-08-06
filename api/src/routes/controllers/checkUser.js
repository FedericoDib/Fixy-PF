const { Client, Professional } = require('../../db');

const checkUser = async ({ id, name, email }) => {
	console.log('SOY EL ID', id);
	const clientFound = await Client.findOne({
		where: { googleId: 'c' + id },
	});
	const professionalFound = await Professional.findOne({
		where: { googleId: 'p' + id },
	});

	//BUSCA EN LA DB DATOS DEL USUARIO, AGREGANDO PROPIEDAD "isRegistered"
	if (clientFound) {
		return clientFound;
	} else if (professionalFound) {
		return professionalFound;
	} else {
		if (id) {
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
				active: true,
			};
			return userFound;
		} else {
			return {};
		}
	}
	// if (!clientFound || !professionalFound) {
	// } else if (clientFound) {
	//   console.log("NOSE", clientFound);
	//   return clientFound;
	// } else if (professionalFound) {
	//   const userFound = {
	//     isRegistered: true,
	//     expoToken: professionalFound.dataValues.expoToken,
	//     email: professionalFound.dataValues.email,
	//     name: professionalFound.dataValues.name,
	//     phoneNumber: professionalFound.dataValues.phoneNumber,
	//     perfilPic: professionalFound.dataValues.perfilPic,
	//     province: professionalFound.dataValues.province,
	//     city: professionalFound.dataValues.city,
	//     address: professionalFound.dataValues.address,
	//     reviews: professionalFound.dataValues.reviews,
	//   };
	//   return userFound;
	// }
};

module.exports = { checkUser };
