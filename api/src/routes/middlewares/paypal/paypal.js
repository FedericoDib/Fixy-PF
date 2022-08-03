const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

const app = express();

app.engine("ejs", engines.ejs);
// app.set("views", "./views");
app.set("view engine", "ejs");
// app.set("views", "../paypal/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index");
});

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AY0PPkWuOsT9_2-bPwFGDiIJEDaeUMlP9DGF14_3TPOxmz6vgnSGym_Kv2JGw-VO46b-oyfp-wDr4yLo",
  client_secret:
    "EIVy637XZrsj0DR_eBjFdORRHGs5jSmQH16HgSYs7IygTP3XQnPQc3LNAIPw8w3pRmgqK1E0xBctf6Ay",
});

app.get("/paypal", (req, res) => {
  console.log("PRICE", req.query.price);
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `https://fixy-backend.herokuapp.com/paypal/success?price=${req.query.price}`,
      cancel_url: "https://fixy-backend.herokuapp.com/paypal/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "VISITA",
              sku: "VISITA",
              price: `${req.query.price}.00`,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: `${req.query.price}.00`,
        },
        description: "VISITA POR SERVICIOS DE MANTENIMIENTO DEL HOGAR.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

app.get("/success", (req, res) => {
  // res.send("Success");
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: `${req.query.price}.00`,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.render(__dirname + "/views/success");
      }
    }
  );
});

app.get("/cancel", (req, res) => {
  res.render(__dirname + "/views/cancel");
});

module.exports = app;
