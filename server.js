const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const Product = require("./models/Product");
const app = express();
const dbConnect=require('./models/dbConfig')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

const ESEWA_SECRET_KEY = "8gBm/:&EnhH.1/q("; // Test key from docs
const PRODUCT_CODE="EPAYTEST"
dbConnect();

// Show all products
app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("home", { products });
});

// Show payment form
app.post("/buy", async (req, res) => {
  const { _id } = req.body;

  const product = await Product.findById(_id);
  if (!product) return res.status(404).send("Product not found");

  const amount = product.price;
  const tax_amount = 0;
  const service_charge = 0;
  const delivery_charge = 0;
  const total_amount = amount + tax_amount + service_charge + delivery_charge;

  const transaction_uuid = uuidv4();
  const stringToSign = `${total_amount},${transaction_uuid},${PRODUCT_CODE}`;
  const signature = crypto
    .createHmac("sha256", ESEWA_SECRET_KEY)
    .update(stringToSign)
    .digest("base64");

  console.log("✅ Signature String:", stringToSign);
  console.log("🔐 Signature:", signature);

  res.render("paymentForm", {
    product,
    amount,
    tax_amount,
    service_charge,
    delivery_charge,
    total_amount,
    transaction_uuid,
    product_code: PRODUCT_CODE,
    signature,
  });
});
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
