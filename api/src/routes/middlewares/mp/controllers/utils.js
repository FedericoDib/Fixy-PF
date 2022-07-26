// import mercadopago from "mercadopago";
const mercadopago = require("mercadopago");

const ordenPago = async (req, res) => {
  mercadopago.configure({
    access_token:
      "TEST-7322652318571002-072301-983f12c1b4d9fc27a1609c6d756e5995-1165794423",
  });

  var preference = {
    items: [
      {
        title: "VISITA",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 3000,
      },
    ],
    notification_url:
      "https://4fd0-2800-810-49c-2385-1d60-50ab-c460-1742.ngrok.io/mp/notificacion",
  };

  mercadopago.preferences
    .create(preference)
    .then((r) => {
      let response = r;
      //console.log(response.body.sandbox_init_point);
      res.send(response.body.sandbox_init_point);
    })
    .catch((e) => console.log(e));
};

const notificacionOrden = async (req, res) => {
  const datos = req.query;
  console.log("DATOS", datos);
  const datillos = datos;
  console.log("DATILLOS", datillos);

  res.status(200);
};

module.exports = { ordenPago, notificacionOrden };
