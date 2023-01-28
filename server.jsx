const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });

    status: "success";
  } catch (error) {
    console.log(error);
    status: "failure";
  }
  res.json({ error, status });
});
