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
      "https://93ca-2800-810-49c-2385-bdcb-93ce-b33d-f116.ngrok.io/mp/notificacion",
  };

  mercadopago.preferences
    .create(preference)
    .then((r) => res.json(r))
    .catch((e) => console.log(e));
};

const notificacionOrden = async (req, res) => {
  const datos = req.query;

  console.log(datos);

  res.status(200);
};

module.exports = { ordenPago, notificacionOrden };
